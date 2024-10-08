// recommendService.js
require("../models/associations");
const {
  RecommendationCluster,
  UserRatedAnime,
  UserClusterPreference,
  Anime,
  Genre,
  Tag,
} = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function getRecommendations(userId) {
  // 1. 선호작을 생성합니다.
  const preferredAnimes = await generateRecommendations(userId);

  // 1-1. 선호작이 없을 경우 빈 배열 반환 및 UserClusterPreference 생성을 방지합니다.
  if (!preferredAnimes || preferredAnimes.length === 0) {
    return [];
  }

  // 2. 장르와 태그 빈도를 계산합니다.
  const { genreFrequencies, tagFrequencies } =
    await calculateGenreTagFrequencies(preferredAnimes);

  // 2-1. 빈도수가 없을 경우 저장하지 않도록 추가로 검사합니다.
  if (
    Object.keys(genreFrequencies).length === 0 ||
    Object.keys(tagFrequencies).length === 0
  ) {
    return [];
  }

  // 3. UserClusterPreference에 저장합니다.
  await saveUserClusterPreferences(userId, genreFrequencies, tagFrequencies);

  // 4. 추천 애니메이션을 가져옵니다.
  const recommendedAnimes = await fetchRecommendedAnimes(userId);

  return recommendedAnimes;
}

async function generateRecommendations(userId) {
  // 1. 사용자가 평가한 작품 중 rating이 null이 아닌 것만 가져옵니다.
  const userRatings = await UserRatedAnime.findAll({
    where: {
      user_id: userId,
      rating: { [Op.ne]: null },
    },
    include: [
      {
        model: Anime,
        include: [
          {
            model: Genre,
            through: { attributes: [] },
          },
          {
            model: Tag,
            through: { attributes: ["tag_score"] },
          },
        ],
      },
    ],
  });

  if (!userRatings || userRatings.length === 0) {
    return [];
  }

  // 2. 별점을 내림차순으로 정렬합니다.
  const sortedRatings = userRatings.sort((a, b) => b.rating - a.rating);

  // 3. 상위 20%의 인덱스를 계산합니다.
  const top20PercentIndex = Math.ceil(userRatings.length * 0.2);

  // 4. 최소 한 개의 작품은 선호작으로 포함되도록 조정합니다.
  const adjustedTopIndex = Math.max(top20PercentIndex, 1);

  // 5. 상위 20% 작품을 선호작으로 선택합니다.
  const preferredAnimes = sortedRatings.slice(0, adjustedTopIndex);

  return preferredAnimes;
}

async function calculateGenreTagFrequencies(preferredAnimes) {
  const genreFrequencies = {};
  const tagFrequencies = {};

  for (const entry of preferredAnimes) {
    const anime = entry.Anime;

    if (!anime) continue;

    // 1. 장르 빈도수 계산
    if (anime.Genres && Array.isArray(anime.Genres)) {
      for (const genre of anime.Genres) {
        const genreId = genre.genre_id;
        genreFrequencies[genreId] = (genreFrequencies[genreId] || 0) + 1;
      }
    }

    // 2. 태그 빈도수 계산
    if (anime.Tags && Array.isArray(anime.Tags)) {
      for (const tag of anime.Tags) {
        // 2-1. AniTag 모델을 통해 tag_score 접근
        const tagId = tag.tag_id;
        const tagScore = tag.AniTag.tag_score;

        // 2-2. tag_score가 70 이상인 태그만 포함
        if (tagScore >= 70) {
          tagFrequencies[tagId] = (tagFrequencies[tagId] || 0) + 1;
        }
      }
    }
  }

  return { genreFrequencies, tagFrequencies };
}

async function saveUserClusterPreferences(
  userId,
  genreFrequencies,
  tagFrequencies
) {
  // 1. 장르와 태그의 최대 빈도수 계산
  const maxGenreFrequency = Math.max(...Object.values(genreFrequencies));
  const maxTagFrequency = Math.max(...Object.values(tagFrequencies));

  const userPreferences = [];

  // 2. 모든 장르와 태그 조합 생성
  for (const genreId in genreFrequencies) {
    for (const tagId in tagFrequencies) {
      // 2-1. 장르와 태그의 정규화된 점수 계산
      const genreScore = genreFrequencies[genreId] / maxGenreFrequency;
      const tagScore = tagFrequencies[tagId] / maxTagFrequency;

      // 2-2. 두 점수를 더해 백분율로 환산
      const preferenceScore = ((genreScore + tagScore) / 2) * 100;

      userPreferences.push({
        user_id: userId,
        genre_id: genreId,
        tag_id: tagId,
        preference_score: preferenceScore,
      });
    }
  }

  // 3. preference_score를 기준으로 내림차순 정렬
  userPreferences.sort((a, b) => b.preference_score - a.preference_score);

  // 4. 상위 33%, 중위 34%, 하위 33%로 분류
  const top33PercentIndex = Math.ceil(userPreferences.length * 0.33);
  const bottom33PercentIndex = Math.floor(userPreferences.length * 0.67);

  userPreferences.forEach((preference, index) => {
    if (index < top33PercentIndex) {
      preference.preference_rank = "상";
    } else if (index >= bottom33PercentIndex) {
      preference.preference_rank = "하";
    } else {
      preference.preference_rank = "중";
    }
  });

  // 5. 기존 데이터 삭제 후 새로운 데이터 삽입
  await UserClusterPreference.destroy({ where: { user_id: userId } });
  await UserClusterPreference.bulkCreate(userPreferences);
}

async function fetchRecommendedAnimes(userId) {
  // 1. UserClusterPreference에서 사용자 선호 조합 3개 랜덤 선택
  const userPreferences = await UserClusterPreference.findAll({
    where: { user_id: userId },
    order: Sequelize.literal("RAND()"),
    limit: 3,
  });

  const recommendedAnimeIds = [];

  for (let preference of userPreferences) {
    const { genre, tag } = preference;

    // 2. RecommendationCluster에서 해당 장르+태그의 애니메이션 가져오기
    const recommendations = await RecommendationCluster.findAll({
      where: { genre_id: preference.genre_id, tag_id: preference.tag_id },
      attributes: ["anime_id"],
    });

    recommendedAnimeIds.push(...recommendations.map((rec) => rec.anime_id));
  }

  // 3. 중복 제거
  const uniqueAnimeIds = [...new Set(recommendedAnimeIds)];

  // 4. 사용자가 이미 평가한 애니메이션 제외
  const ratedAnimes = await UserRatedAnime.findAll({
    where: { user_id: userId },
    attributes: ["anime_id"],
  });
  const ratedAnimeIds = ratedAnimes.map((ra) => ra.anime_id);

  const finalAnimeIds = uniqueAnimeIds.filter(
    (id) => !ratedAnimeIds.includes(id)
  );

  // 5. 애니메이션 정보 가져오기
  const animes = await Anime.findAll({
    where: { anime_id: finalAnimeIds },
    attributes: ["anime_id", "anime_title", "thumbnail_url"],
  });

  return animes;
}

module.exports = { getRecommendations };

// 태그 카테고리 데이터를 별도의 파일로 분리

export interface TagCategory {
    name: string;
    tags: string[];
  }
  
  export const tagCategories: TagCategory[] = [
    {
      name: "판타지",
      tags: ["신화", "회춘", "동물 귀", "던전", "타임루프", "괴수", "신체 변형", "시간 조작", "키메라", "몸 바꾸기", "변신", "엘프", "기억상실", "몬스터 소년", "마녀", "기억 조작", "몬스터 소녀", "로봇", "환생"],
    },
    {
      name: "인물",
      tags: ["남성 주인공", "여성 주인공", "소년", "소녀", "귀여운 남자아이들", "귀여운 여자아이들", "아동", "양상불 캐스트"],
    },
    {
      name: "캐릭터",
      tags: ["안티히어로", "슈퍼히어로", "츤데레", "쿨데레", "얀데레", "중2병", "다중인격", "전파계", "히키코모리","갸루","톰보이" ,"서큐버스", "메가네", "늑대인간", "좀비", "뱀파이어", "코스프레", "안드로이드","악녀", "요정", "마법소녀", "마스코트", "닌자", "아이돌", "블론디", "쇼타", "로리", "여장남자","불량배","아가씨","집사", "메이드", "왕", "여왕", "공주", "메카닉", "트랩", "표선", "무사", "사무라이"],
    },
    {
      name: "관계",
      tags: ["가족 생활", "비정한 가족", "삼각관계", "하렘", "역하렘", "러브코미디", "금지된 사랑", "순정", "백합", "야오이", "브로맨스"],
    },
    {
      name: "배경",
      tags: ["학교", "직장", "군대", "병원", "가상 도시", "현실 도시", "시골", "바다", "우주", "지하", "섬"],
    },
    {
      name: "진행/액션",
      tags: ["배틀로얄", "대테러", "격투", "카드배틀", "체스", "탐정", "범죄", "미스터리", "스릴러", "공포", "심리", "배신", "복수", "정치", "전쟁", "테러"],
    },
  ];
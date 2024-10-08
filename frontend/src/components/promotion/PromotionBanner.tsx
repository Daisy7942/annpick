import React, { useState, useEffect, useCallback } from "react";

// Slide 인터페이스 정의: 각 슬라이드의 구조를 정의합니다.
interface Slide {
  imageUrl: string;
  link: string;
  title: string;
}

const PromotionBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // 슬라이드 데이터 배열
  const slides: Slide[] = [
    {
      imageUrl: "/images/Banner.png",
      link: "/promo1",
      title: "프로모션 1",
    },
    {
      imageUrl: "/images/banner-img-run.png",
      link: "/anime/3391",
      title: "프로모션 2",
    },
    {
      imageUrl: "/images/banner-img-ayakashi.png",
      link: "/anime/318",
      title: "프로모션 3",
    },
    {
      imageUrl: "/images/banner-img-horimiya.png",
      link: "/anime/2915",
      title: "프로모션 4",
    },
  ];

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // 자동 슬라이딩을 위한 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoSliding) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoSliding, nextSlide]);

  // 특정 슬라이드로 이동하는 함수
  const changeSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoSliding(false);
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoSliding(false);
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  // 링크 클릭 시 동작하는 함수
  const handleLinkClick = (link: string) => {
    // 자동 슬라이딩 멈춤
    setIsAutoSliding(false);

    // 링크로 이동
    window.location.href = link;
    // 5초 후 자동 슬라이딩 재개
    setTimeout(() => setIsAutoSliding(true), 500);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 슬라이드 이미지 및 버튼 */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* 슬라이드 이미지 */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* 이미지 위에 그라데이션 효과 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
          {/* '바로가기' 버튼 */}
          {index === currentSlide &&
            slide.title !== "프로모션 1" && ( // index가 currentSlide일 때만 렌더링, "프로모션 1"은 제외
              <div
                className={`absolute 
      bottom-[20%] left-1/2 -translate-x-1/2 translate-y-1/2
      sm:bottom-[20%] sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0
      md:bottom-[15%] md:left-[20%] md:translate-x-0
      lg:bottom-[15%] lg:left-[10.5%]
      z-20`}
              >
                <button
                  onClick={() => handleLinkClick(slide.link)}
                  className={`
        relative group
        w-24 h-8
        sm:w-32 sm:h-10
        md:w-40 md:h-12
        lg:w-48 lg:h-14
      `}
                >
                  <img
                    src="/images/banner_Btn.svg"
                    alt="바로가기"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              </div>
            )}
        </div>
      ))}
      {/* 이전 슬라이드 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-1/2 transform -translate-y-1/2 bg-transparent transition-all duration-300 rounded-full p-2 group"
      >
        <img
          src="/images/banner_swipe_dk_prev-button.svg"
          alt="이전"
          className="w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[4rem] lg:h-[4rem] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[2px_2px_3px_rgba(0,0,0,0.3)]"
        />
      </button>
      {/* 다음 슬라이드 버튼 */}
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 md:right-12 lg:right-16 top-1/2 transform -translate-y-1/2 bg-transparent transition-all duration-300 rounded-full p-2 group"
      >
        <img
          src="/images/banner_swipe_dk_next-button.svg"
          alt="다음"
          className="w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[4rem] lg:h-[4rem] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[2px_2px_3px_rgba(0,0,0,0.3)]"
        />
      </button>
      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionBanner;

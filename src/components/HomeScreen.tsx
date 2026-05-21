import React from "react";
import { MealMockData } from "../types";
import { formatKoreanDate } from "../utils/dateUtils";

interface HomeScreenProps {
  today: Date;
  isWeekend: boolean;
  activeMealDate: Date;
  lunchMeal: MealMockData | undefined;
  dinnerMeal: MealMockData | undefined;
  onNavigateToSchedule: (date: Date) => void;
}

export default function HomeScreen({
  today,
  isWeekend,
  activeMealDate,
  lunchMeal,
  dinnerMeal,
  onNavigateToSchedule,
}: HomeScreenProps) {
  // 대표 메인 음식 (기본: 중식 타이틀, 없을 시 석식 타이틀)
  const heroTitle = lunchMeal?.title || dinnerMeal?.title || "맛있는 급식";
  const heroKcal = lunchMeal?.totalCalories || dinnerMeal?.totalCalories || 0;
  const isAltDate = isWeekend; // 다음 급식일(월요일) 정보로 대체해서 보여주는가?

  return (
    <div id="home_screen_root" className="animate-fade-in space-y-8">
      {/* 주말 친절 안내 메시지 배지 */}
      {isAltDate && (
        <div className="bg-secondary-container/30 border border-secondary-container rounded-2xl p-4 flex items-start gap-3 mt-2">
          <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <div className="text-sm text-on-secondary-container">
            <p className="font-bold">오늘은 즐거운 주말입니다! 🎉</p>
            <p className="opacity-90 mt-0.5">
              월요일 급식을 미리 점검해 보세요. 아래 정보는 다가오는 <strong>다음 급식일 ({formatKoreanDate(activeMealDate)})</strong> 기준입니다.
            </p>
          </div>
        </div>
      )}

      {/* Hero Card */}
      <section id="hero_card" className="relative h-[380px] xs:h-[420px] w-full rounded-[32px] overflow-hidden shadow-lg group transition-transform duration-500 hover:scale-[1.01]">
        {/* 대표 메인 이미지 */}
        <img
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover select-none"
          src={
            lunchMeal?.title.includes("마라탕")
              ? "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop&q=80"
              : lunchMeal?.title.includes("함박")
              ? "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80"
              : lunchMeal?.title.includes("닭갈비")
              ? "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop&q=80"
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuBAhaVM4UNLR2iI8rtYQIEgkibdqZL9N_-6MT2_gBXXQGEc7ykBS3bE3bgeik2WUEwJ7gc7ScYqDNsGs7Dy1iBB9a_YmCJQQaHhrztq882CXHXvr6A4PikvPgp4YhQvzWMPykL8aWrsCKHy4UqQXVCSVbBl1uAbUVB1c1UskxNtnuMTgz3QLXsmh3ik4bfYEUwt82exOQ18YwpASGzOVJZUuQh5hO9154-mqnmF7KJV3rhfN80kCdCT1GUwefBgycPUQT4AMPU1Kp4"
          }
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
        
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          {isAltDate ? (
            <span className="inline-block px-4 py-1.5 bg-secondary text-on-secondary text-[12px] font-bold rounded-full w-fit shadow-md">
              다음 급식일 식단
            </span>
          ) : (
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-[12px] font-bold rounded-full w-fit shadow-md">
              오늘의 추천 급식
            </span>
          )}
        </div>

        <button className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white active:scale-90 transition-transform cursor-pointer z-10 hover:bg-white/35">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            favorite
          </span>
        </button>

        <div className="absolute bottom-8 left-8 right-8 z-10">
          <p className="text-white/80 text-[14px] font-medium mb-1 drop-shadow-sm">
            {formatKoreanDate(activeMealDate)}
          </p>
          <h2 className="text-white text-[28px] xs:text-[32px] font-bold leading-tight mb-3 drop-shadow-md">
            {heroTitle}
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[14px] font-bold shadow-sm">
              {heroKcal} kcal
            </span>
          </div>
        </div>
      </section>

      {/* Summary Title */}
      <div id="meal_summary_title" className="mt-10 mb-6 flex items-center justify-between">
        <h3 className="text-[22px] font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            lunch_dining
          </span>
          {isAltDate ? "다음 급식일 식단 상세" : "오늘의 급식 요약"}
        </h3>
        <button
          onClick={() => onNavigateToSchedule(activeMealDate)}
          className="text-primary font-bold text-sm flex items-center gap-0.5 hover:underline cursor-pointer"
        >
          전체보기
          <span className="material-symbols-outlined text-xs">chevron_right</span>
        </button>
      </div>

      {/* Meal Cards Grid */}
      <div id="meal_summary_cards" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lunch Card */}
        <article className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(79,111,0,0.08)] flex flex-col justify-between gap-5 border border-surface-container-high transition-transform duration-300 hover:scale-[1.01]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <h4 className="text-[20px] font-bold text-primary">중식</h4>
              </div>
              <span className="text-on-surface-variant font-medium text-[16px]">
                {lunchMeal ? `${lunchMeal.totalCalories} kcal` : "급식 준비중"}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-[17px] xs:text-[18px] font-medium text-on-surface leading-relaxed">
                {lunchMeal ? lunchMeal.dishes.join(", ") : "식단 정보가 정의되지 않았습니다."}
              </p>
            </div>
          </div>
          {lunchMeal && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-container-high/60 mt-2">
              {lunchMeal.allergens.map((allergen, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-surface-container text-on-surface-variant text-[12px] font-semibold rounded-full border border-outline-variant/30"
                >
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Dinner Card */}
        <article className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(79,111,0,0.08)] flex flex-col justify-between gap-5 border border-surface-container-high transition-transform duration-300 hover:scale-[1.01]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-secondary rounded-full"></div>
                <h4 className="text-[20px] font-bold text-secondary">석식</h4>
              </div>
              <span className="text-on-surface-variant font-medium text-[16px]">
                {dinnerMeal ? `${dinnerMeal.totalCalories} kcal` : "급식 없음"}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-[17px] xs:text-[18px] font-medium text-on-surface leading-relaxed">
                {dinnerMeal ? dinnerMeal.dishes.join(", ") : "석식 운영일이 아니거나 정보가 없습니다."}
              </p>
            </div>
          </div>
          {dinnerMeal && dinnerMeal.allergens.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-container-high/60 mt-2">
              {dinnerMeal.allergens.map((allergen, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-surface-container text-on-surface-variant text-[12px] font-semibold rounded-full border border-outline-variant/30"
                >
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>

      {/* Weekly Insight Chip (Extra) */}
      <div id="weekly_insight" className="mt-8 p-6 bg-tertiary-fixed rounded-[24px] flex items-center gap-4 border border-outline-variant/20 shadow-sm">
        <div className="w-12 h-12 bg-on-tertiary-fixed rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
          <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            calculate
          </span>
        </div>
        <div>
          <p className="text-on-tertiary-fixed font-bold text-[16px]">오늘의 식단 영양 성분 평가</p>
          <p className="text-on-tertiary-fixed/80 text-[14px] font-medium mt-0.5 leading-snug">
            성장기 씨마스고등학교 학생들에게 충분한 {isAltDate ? "탄수화물과 비타민군이" : "필수 고품격 단백질과 미네랄이"} 골고루 포함된 안심 먹거리입니다.
          </p>
        </div>
      </div>
    </div>
  );
}

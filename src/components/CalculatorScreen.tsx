import React, { useState, useEffect } from "react";
import { MealMockData, MealItem } from "../types";
import { getDetailedDishesForMeal } from "../data/mockMeals";

interface CalculatorScreenProps {
  todayMeal: MealMockData | undefined;
}

export default function CalculatorScreen({ todayMeal }: CalculatorScreenProps) {
  // 전체 요리 리스트 상태 관리
  const [dishItems, setDishItems] = useState<MealItem[]>([]);
  // 선택된 요리 ID 집합 상태 관리
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  // 선택 필터 상태
  const [activeFilter, setActiveFilter] = useState<"all" | "bob" | "guk" | "banchan" | "dessert">("all");
  // 저장 결과 Toast 메시지 상태
  const [showToast, setShowToast] = useState(false);

  // 식단 변경 시 초기화
  useEffect(() => {
    if (todayMeal) {
      const detailed = getDetailedDishesForMeal(todayMeal);
      setDishItems(detailed);
      // 초기값: 모든 급식 반찬 기본 선택 설정
      setSelectedIds(new Set(detailed.map((item) => item.id)));
    } else {
      setDishItems([]);
      setSelectedIds(new Set());
    }
  }, [todayMeal]);

  // 체크박스 클릭 핸들러
  const handleToggleItem = (id: string) => {
    const nextSet = new Set(selectedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
    }
    setSelectedIds(nextSet);
  };

  // 계산 결과 갱신
  let totalKcal = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;

  dishItems.forEach((item) => {
    if (selectedIds.has(item.id)) {
      totalKcal += item.kcal;
      totalCarbs += item.carbs;
      totalProtein += item.protein;
      totalFat += item.fat;
    }
  });

  // 필터별 정렬 목록 구하기
  const filteredDishes = dishItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // 계산 보고서 임시 저장 핸들러
  const handleSaveResult = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div id="calculator_screen_root" className="animate-fade-in space-y-6 max-w-2xl mx-auto pb-4">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3.5 rounded-full shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="text-sm font-bold">건강 계산서 저장 완료! 마이 푸드 기록에 임시 등록되었습니다.</span>
        </div>
      )}

      {/* Nutrition Summary Card */}
      <section className="bg-white rounded-[24px] p-6 shadow-[0px_4px_16px_rgba(79,111,0,0.06)] border border-surface-container">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-primary font-bold text-sm mb-1 block">오늘의 선택 영양 실시간 계산</span>
            <h2 className="text-[32px] font-extrabold text-on-surface leading-none">
              {totalKcal} <span className="text-lg font-bold text-on-surface-variant">kcal</span>
            </h2>
            {todayMeal && (
              <p className="text-xs text-on-surface-variant font-medium mt-1.5 opacity-80">
                급식 기준: {todayMeal.title}
              </p>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              calculate
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-surface-container-high/60 pt-4">
          {/* Danbaek */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>단백질</span>
              <span>{totalProtein}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalProtein / 45) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Tan */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>탄수화물</span>
              <span>{totalCarbs}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalCarbs / 150) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Fat */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>지방</span>
              <span>{totalFat}g</span>
            </div>
            <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-tertiary-container rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalFat / 35) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilter("all")}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "all" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setActiveFilter("bob")}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "bob" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          밥류
        </button>
        <button
          onClick={() => setActiveFilter("guk")}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "guk" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          국/찌개
        </button>
        <button
          onClick={() => setActiveFilter("banchan")}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "banchan" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          반찬
        </button>
        <button
          onClick={() => setActiveFilter("dessert")}
          className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
            activeFilter === "dessert" ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          디저트
        </button>
      </div>

      {/* Menu Selection List */}
      <div id="calculator_list" className="space-y-4">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((item) => {
            const isSelected = selectedIds.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleToggleItem(item.id)}
                className={`bg-white rounded-[24px] p-5 flex items-center justify-between border shadow-sm cursor-pointer transition-all duration-200 select-none hover:scale-[1.005] ${
                  isSelected ? "border-primary border-2" : "border-surface-container"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover"
                      src={item.imageUrl}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{item.name}</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.kcal} kcal
                      {item.carbs > 0 && ` • 탄수화물 ${item.carbs}g`}
                      {item.protein > 0 && ` • 단백질 ${item.protein}g`}
                    </p>
                  </div>
                </div>
                {isSelected ? (
                  <div className="bg-primary text-white p-1 rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 600" }}>
                      check
                    </span>
                  </div>
                ) : (
                  <div className="w-7 h-7 border-2 border-outline-variant rounded-full cursor-pointer hover:border-primary"></div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-on-surface-variant opacity-70">
            <span className="material-symbols-outlined text-4xl block mb-2">dinner_dining</span>
            <p className="text-sm font-bold">해당 카테고리에 제공된 음식 구성품이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleSaveResult}
        className="w-full py-5 bg-primary text-on-primary rounded-full font-bold text-lg shadow-lg active:scale-95 transition-transform duration-200 mt-4 cursor-pointer hover:bg-primary/95"
      >
        계산 결과 저장하기
      </button>
    </div>
  );
}

import React from "react";
import { MealMockData } from "../types";
import { getWeekDates, getWeekOfMonth, getKoreanDayOfWeek, formatDateKey } from "../utils/dateUtils";

interface ScheduleScreenProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  weekDates: Date[];
  meals: MealMockData[];
}

export default function ScheduleScreen({
  selectedDate,
  onSelectDate,
  weekDates,
  meals,
}: ScheduleScreenProps) {
  const currentWeekLabel = getWeekOfMonth(selectedDate);
  const selectedDateKey = formatDateKey(selectedDate);

  // 선택형 요일 식단 가져오기
  const selectedLunch = meals.find((m) => m.dateKey === selectedDateKey && m.mealType === "lunch");
  const selectedDinner = meals.find((m) => m.dateKey === selectedDateKey && m.mealType === "dinner");

  // 단백질 임의 달성률 계산 (마스터 데이터 비주얼 시뮬레이터 수치 유지)
  const lunchProteinPct = selectedLunch ? Math.min(Math.round((selectedLunch.nutrition.protein / 35) * 100), 100) : 0;
  const dinnerProteinPct = selectedDinner ? Math.min(Math.round((selectedDinner.nutrition.protein / 30) * 100), 100) : 0;

  return (
    <div id="schedule_screen_root" className="animate-fade-in space-y-6">
      {/* Title Section */}
      <section className="pb-1">
        <h2 className="text-[24px] font-bold text-primary mb-1">주간 식단</h2>
        <p className="text-[16px] text-on-surface-variant font-medium">씨마스 {currentWeekLabel}</p>
      </section>

      {/* Date Picker Selector */}
      <section className="flex justify-between items-center mb-8 bg-surface-container-low p-4 rounded-[24px] border border-surface-container-high/60 shadow-sm">
        {weekDates.map((dateObj, idx) => {
          const isSelected = formatDateKey(dateObj) === selectedDateKey;
          const dayName = getKoreanDayOfWeek(dateObj);
          const dayNum = dateObj.getDate();

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(dateObj)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 ease-out active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary px-4 py-2.5 rounded-[18px] shadow-md transform scale-105"
                  : "p-2 rounded-xl text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className={`text-[12px] font-bold ${isSelected ? "text-white/90" : "text-on-surface-variant"}`}>
                {dayName}
              </span>
              <span className="text-[18px] font-extrabold leading-none">
                {dayNum}
              </span>
            </button>
          );
        })}
      </section>

      {/* Lunch (중식) Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_16px_rgba(79,111,0,0.06)] border border-surface-container relative overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full text-xs font-bold mb-2 shadow-sm">
              중식
            </span>
            <h3 className="text-[22px] font-bold text-primary">
              {selectedLunch ? `${selectedLunch.totalCalories} kcal` : "대체 급식 제공 또는 급식일이 아닙니다."}
            </h3>
          </div>
          {selectedLunch && (
            <div className="flex flex-wrap gap-1.5 justify-end max-w-[150px]">
              {selectedLunch.allergens.slice(0, 2).map((allergen, index) => (
                <span key={index} className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full text-[11px] font-semibold border border-outline-variant/20">
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {selectedLunch ? (
          <p className="text-[17px] font-medium text-on-surface leading-relaxed mb-6">
            {selectedLunch.dishes.join(", ")}
          </p>
        ) : (
          <p className="text-[16px] text-on-surface-variant mb-6">식단 내역이 비었습니다.</p>
        )}

        {selectedLunch && (
          <div className="space-y-2 pt-3 border-t border-surface-container/10">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>단백질 하루 성인 달성률</span>
              <span>{lunchProteinPct}%</span>
            </div>
            <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-1000"
                style={{ width: `${lunchProteinPct}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="absolute -right-4 -top-4 opacity-[0.04] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 0" }}>
            restaurant_menu
          </span>
        </div>
      </div>

      {/* Dinner (석식) Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_16px_rgba(79,111,0,0.06)] border border-surface-container relative overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed-variant px-3.5 py-1 rounded-full text-xs font-bold mb-2 shadow-sm">
              석식
            </span>
            <h3 className="text-[22px] font-bold text-primary">
              {selectedDinner ? `${selectedDinner.totalCalories} kcal` : "석식 운영 정보가 제공되지 않습니다."}
            </h3>
          </div>
          {selectedDinner && (
            <div className="flex flex-wrap gap-1.5 justify-end max-w-[150px]">
              {selectedDinner.allergens.slice(0, 2).map((allergen, index) => (
                <span key={index} className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full text-[11px] font-semibold border border-outline-variant/20">
                  {allergen}
                </span>
              ))}
            </div>
          )}
        </div>

        {selectedDinner ? (
          <p className="text-[17px] font-medium text-on-surface leading-relaxed mb-6">
            {selectedDinner.dishes.join(", ")}
          </p>
        ) : (
          <p className="text-[16px] text-on-surface-variant mb-6">석식 내역이 비었습니다.</p>
        )}

        {selectedDinner && (
          <div className="space-y-2 pt-3 border-t border-surface-container/10">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant">
              <span>단백질 하루 성인 달성률</span>
              <span>{dinnerProteinPct}%</span>
            </div>
            <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-primary-fixed-dim h-full rounded-full transition-all duration-1000"
                style={{ width: `${dinnerProteinPct}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

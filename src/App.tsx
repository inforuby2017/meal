import React, { useState, useMemo } from "react";
import { getTodayKST, getWeekDates, getDefaultSelectedDate, formatDateKey } from "./utils/dateUtils";
import { generateMealsForWeek } from "./data/mockMeals";
import HomeScreen from "./components/HomeScreen";
import ScheduleScreen from "./components/ScheduleScreen";
import CalculatorScreen from "./components/CalculatorScreen";
import ProfileScreen from "./components/ProfileScreen";

export default function App() {
  // 1. 한국 표준시(KST) 오늘 날짜 구하기
  const today = useMemo(() => getTodayKST(), []);
  
  // 2. 주말 필터 조기 연동 (오늘이 토요일(6), 일요일(0)인가?)
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  // 3. 홈 화면에 보여줄 급식 기준 날짜 결정 (주말이면 다음 최전방 월요일 급식)
  const activeMealDate = useMemo(() => getDefaultSelectedDate(today), [today]);

  // 4. 식단표용 활성화 선택 날짜 (기본은 KST 오늘 또는 주말시 월요일)
  const [selectedDate, setSelectedDate] = useState<Date>(activeMealDate);

  // 5. 선택된 날짜 기준 주의 월~금 범위 구하기 (식단표 주 picker용)
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  // 6. 월~금 범위에 매핑되는 5일치 급식 Mock 데이터 생성
  const meals = useMemo(() => generateMealsForWeek(weekDates), [weekDates]);

  // 7. 하단 탭 내비게이션 상태 ("home" | "schedule" | "calculator" | "profile")
  const [activeTab, setActiveTab] = useState<"home" | "schedule" | "calculator" | "profile">("home");

  // 8. 현재 활성화된 날짜의 중식/석식 데이터 발굴
  const activeDateKey = formatDateKey(activeMealDate);
  const homeLunchMeal = meals.find((m) => m.dateKey === activeDateKey && m.mealType === "lunch");
  const homeDinnerMeal = meals.find((m) => m.dateKey === activeDateKey && m.mealType === "dinner");

  // 식단표에서 다른 날짜 클릭하여 홈 화면이나 계산기 변경 시 유기적인 데이터 싱크
  const handleNavigateToSchedule = (dateObj: Date) => {
    setSelectedDate(dateObj);
    setActiveTab("schedule");
  };

  // 9. 현재 렌더링할 탭 뷰 분기 처리
  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            today={today}
            isWeekend={isWeekend}
            activeMealDate={activeMealDate}
            lunchMeal={homeLunchMeal}
            dinnerMeal={homeDinnerMeal}
            onNavigateToSchedule={handleNavigateToSchedule}
          />
        );
      case "schedule":
        return (
          <ScheduleScreen
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            weekDates={weekDates}
            meals={meals}
          />
        );
      case "calculator": {
        // 계산기 기본 선택: 선택 날짜의 중식 데이터 전달 (주말이면 다음 월요일 중식 전달)
        const targetCalcMeal = meals.find(
          (m) => m.dateKey === formatDateKey(selectedDate) && m.mealType === "lunch"
        ) || homeLunchMeal;
        return <CalculatorScreen todayMeal={targetCalcMeal} />;
      }
      case "profile":
        return <ProfileScreen />;
      default:
        return <div className="text-center py-10">화면을 불러오지 못했습니다.</div>;
    }
  };

  return (
    <div id="school_meal_app" className="bg-background text-on-surface min-h-screen pb-36 font-sans">
      {/* TopAppBar Fixed */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-margin-mobile py-4 bg-background/90 backdrop-blur-md border-b border-surface-container-high/60 shadow-sm">
        <div 
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 active:scale-95 select-none"
        >
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            restaurant
          </span>
          <h1 className="font-bold text-[20px] leading-[28px] text-primary tracking-tight">
            씨마스고등학교 급식
          </h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-all duration-200 active:scale-95 cursor-pointer text-on-surface-variant relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-ping"></span>
        </button>
      </header>

      {/* Main Container View with perfect top padding to clear the TopAppBar */}
      <main className="mt-20 px-margin-mobile pt-4 max-w-2xl mx-auto">
        {renderActiveView()}
      </main>

      {/* Bottom Navigation Web Bar (Float/Stick UI Concept from mockups) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container rounded-t-[24px] shadow-[0px_-4px_20px_rgba(79,111,0,0.06)] border-t border-surface-container-high/85">
        
        {/* Home Button */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center px-5 py-2 transition-transform duration-300 ease-out active:scale-90 cursor-pointer ${
            activeTab === "home"
              ? "bg-primary text-on-primary rounded-full shadow-md"
              : "text-on-secondary-container hover:bg-primary-container/10 rounded-full"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: ` 'FILL' ${activeTab === 'home' ? 1 : 0} ` }}>
            home
          </span>
          <span className="text-[14px] font-bold mt-0.5">홈</span>
        </button>

        {/* Schedule Button */}
        <button
          onClick={() => setActiveTab("schedule")}
          className={`flex flex-col items-center justify-center px-5 py-2 transition-transform duration-300 ease-out active:scale-90 cursor-pointer ${
            activeTab === "schedule"
              ? "bg-primary text-on-primary rounded-full shadow-md"
              : "text-on-secondary-container hover:bg-primary-container/10 rounded-full"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: ` 'FILL' ${activeTab === 'schedule' ? 1 : 0} ` }}>
            calendar_month
          </span>
          <span className="text-[14px] font-bold mt-0.5">식단표</span>
        </button>

        {/* Calculator Button */}
        <button
          onClick={() => setActiveTab("calculator")}
          className={`flex flex-col items-center justify-center px-5 py-2 transition-transform duration-300 ease-out active:scale-90 cursor-pointer ${
            activeTab === "calculator"
              ? "bg-primary text-on-primary rounded-full shadow-md"
              : "text-on-secondary-container hover:bg-primary-container/10 rounded-full"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: ` 'FILL' ${activeTab === 'calculator' ? 1 : 0} ` }}>
            calculate
          </span>
          <span className="text-[14px] font-bold mt-0.5">영양계산</span>
        </button>

        {/* Profile Button */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center px-5 py-2 transition-transform duration-300 ease-out active:scale-90 cursor-pointer ${
            activeTab === "profile"
              ? "bg-primary text-on-primary rounded-full shadow-md"
              : "text-on-secondary-container hover:bg-primary-container/10 rounded-full"
          }`}
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: ` 'FILL' ${activeTab === 'profile' ? 1 : 0} ` }}>
            person
          </span>
          <span className="text-[14px] font-bold mt-0.5">프로필</span>
        </button>
      </nav>
    </div>
  );
}

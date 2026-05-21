import React, { useState } from "react";

export default function ProfileScreen() {
  // 알레르기 관리 상태 관리
  const [allergens, setAllergens] = useState<string[]>(["우유", "땅콩"]);
  const [newAllergen, setNewAllergen] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [alertAllergy, setAlertAllergy] = useState(true);
  const [dailyNotify, setDailyNotify] = useState(true);

  // 알레르기 추가
  const handleAddAllergen = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
      setAllergens([...allergens, newAllergen.trim()]);
      setNewAllergen("");
      setShowAddInput(false);
    }
  };

  // 알레르기 삭제
  const handleRemoveAllergen = (val: string) => {
    setAllergens(allergens.filter((item) => item !== val));
  };

  return (
    <div id="profile_screen_root" className="animate-fade-in space-y-6 pb-6">
      {/* Profile Card with beautiful gradient */}
      <section className="mt-4 bg-gradient-to-br from-[#d2ea7a] to-[#b9d164] rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(79,111,0,0.08)] relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-20 h-20 rounded-full border-4 border-white/35 overflow-hidden shadow-md flex-shrink-0 bg-white/40">
            <img
              alt="김학생 프로필"
              className="w-full h-full object-cover select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBId-1qkwtR288f5zmctLidjj5mM38-9fKxl3w9-cVZesfm24YIGA_EdSqEFLg0SPM2EMuWinww_P3TJNqwVXcwCjQey4OJiG9aXKXldqL0HcgTiITXC-Yg1NIfPyVZnG6MHWSk_LKpgwhX4xPl4Fslq5kLZxzfKp1h3Fo-vdVccfGrQ-PD0RdPfe-aJle3BzojldSCSJB8VyvNE-diDXiOvRmsXG4p_8fql1Y4HjpwYFnnJOfB9oWCFeflL4QDghfezHjnxPayvFY"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[24px] font-bold text-on-secondary-fixed">김학생</h2>
              <button className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full active:scale-90 transition-transform cursor-pointer">
                <span className="material-symbols-outlined text-on-secondary-fixed text-lg" style={{ fontVariationSettings: "'wght' 500" }}>
                  edit
                </span>
              </button>
            </div>
            <p className="text-[15px] font-medium text-on-secondary-fixed-variant opacity-90">
              씨마스고등학교 • 2학년 3반 15번
            </p>
          </div>
        </div>
      </section>

      {/* Settings List */}
      <div className="space-y-4">
        {/* Allergy Notification Card */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm flex flex-col gap-4 border border-surface-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[26px]">
                warning
              </span>
              <span className="text-[18px] font-bold text-on-surface">알레르기 경고 알림</span>
            </div>
            
            {/* Toggle switch Button */}
            <button
              onClick={() => setAlertAllergy(!alertAllergy)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                alertAllergy ? "bg-primary" : "bg-surface-container-high"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  alertAllergy ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {alertAllergy && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {allergens.map((item, idx) => (
                  <span
                    key={idx}
                    className="group px-4 py-1.5 bg-surface-container hover:bg-red-50 text-on-surface-variant font-medium text-[13px] rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                    onClick={() => handleRemoveAllergen(item)}
                    title="클릭하여 지우기"
                  >
                    {item}
                    <span className="material-symbols-outlined text-[13px] text-outline opacity-60 group-hover:text-red-500">
                      close
                    </span>
                  </span>
                ))}
                
                {!showAddInput && (
                  <button
                    onClick={() => setShowAddInput(true)}
                    className="w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded-full text-primary active:scale-90 transition-transform cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 600" }}>
                      add
                    </span>
                  </button>
                )}
              </div>

              {showAddInput && (
                <form onSubmit={handleAddAllergen} className="flex gap-2 items-center animate-fade-in">
                  <input
                    type="text"
                    value={newAllergen}
                    onChange={(e) => setNewAllergen(e.target.value)}
                    placeholder="알레르기 식품 입력 (예: 땅콩, 복숭아)"
                    className="flex-1 bg-surface-container-low border border-outline-variant/40 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-primary text-on-surface"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-primary/95"
                  >
                    추가
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddInput(false);
                      setNewAllergen("");
                    }}
                    className="text-on-surface-variant text-xs hover:underline cursor-pointer"
                  >
                    취소
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Daily Meal Notification Card */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm flex items-center justify-between border border-surface-container">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[26px]">
              schedule
            </span>
            <div>
              <span className="text-[17px] font-bold text-on-surface block">일일 식단 알림</span>
              <span className="text-[13px] font-semibold text-on-surface-variant">매일 아침 8시 카카오 알림톡 제공</span>
            </div>
          </div>
          
          <button
            onClick={() => setDailyNotify(!dailyNotify)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              dailyNotify ? "bg-primary" : "bg-surface-container-high"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                dailyNotify ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Navigation list block */}
        <div className="bg-white rounded-[24px] shadow-sm overflow-hidden border border-surface-container">
          <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high/40 transition-colors active:scale-[0.99] cursor-pointer text-left">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
                support_agent
              </span>
              <span className="text-[16px] font-bold text-on-surface">고객센터 / 영양사 조리 상담문의</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
          </button>
          <div className="h-[1px] bg-slate-100 mx-5"></div>
          <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container-high/40 transition-colors active:scale-[0.99] cursor-pointer text-left">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
                description
              </span>
              <span className="text-[16px] font-bold text-on-surface">씨마스 급식 이용약관</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
          </button>
          <div className="h-[1px] bg-slate-100 mx-5"></div>
          <button className="w-full flex items-center justify-between p-5 hover:bg-error-container/20 transition-colors active:scale-[0.99] cursor-pointer text-left">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-[22px]">
                logout
              </span>
              <span className="text-[16px] font-bold text-error">로그아웃</span>
            </div>
            <span className="material-symbols-outlined text-error/40">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Footer copyright section */}
      <footer className="mt-12 mb-8 text-center px-6">
        <p className="text-[13px] font-bold text-on-surface-variant">© 2026 씨마스고등학교 급식</p>
        <p className="text-[11px] font-semibold text-outline mt-1 leading-snug">
          언제나 맛있는 정성으로, 배움에 건강함을 채웁니다.
        </p>
      </footer>
    </div>
  );
}

/**
 * 한국 시간대(Asia/Seoul) 기준 날짜 처리 유틸리티 함수
 */

/**
 * 한국 시간 기준 오늘 날짜를 반환 (시/분/초는 유지 또는 필요에 따라 처리)
 */
export function getTodayKST(): Date {
  const now = new Date();
  // UTC 시간 가져오기
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // 한국 시간대 (UTC + 9) Offset
  const kstOffset = 9 * 60 * 60000;
  return new Date(utc + kstOffset);
}

/**
 * "5월 15일 금요일" 형식으로 변환
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 ${dayName}`;
}

/**
 * "YYYYMMDD" 형식으로 변환 (NEIS API 연동 등 호환)
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/**
 * 해당 날짜가 포함된 주의 월요일부터 금요일까지 Date 객체 배열 반환
 */
export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay();
  // 일요일을 7로 취급하여 월요일을 주의 첫날(1)로 고정
  const dayOfWeek = currentDay === 0 ? 7 : currentDay;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  const dates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const nextDate = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
}

/**
 * 해당 날짜가 몇 월 몇 주차인지 계산
 * (단순히 달의 주차를 계산하는 방식으로 구현)
 */
export function getWeekOfMonth(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = Math.ceil(day / 7);
  return `${month}월 ${week}주차`;
}

/**
 * 기본 선택 날짜 구하기
 * - 평일이면 오늘 반환
 * - 토요일이면 전날인 금요일 반환
 * - 일요일이면 다음날인 월요일 반환
 */
export function getDefaultSelectedDate(today: Date): Date {
  const day = today.getDay();
  if (day >= 1 && day <= 5) {
    return today;
  }
  const result = new Date(today);
  if (day === 6) { // 토요일 -> 다음 월요일 (+2일)
    result.setDate(today.getDate() + 2);
  } else if (day === 0) { // 일요일 -> 다음 월요일 (+1일)
    result.setDate(today.getDate() + 1);
  }
  return result;
}

/**
 * 요일 한 글자 정보 매칭
 */
export function getKoreanDayOfWeek(date: Date): string {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return dayNames[date.getDay()];
}

import { MealMockData, MealItem } from "../types";
import { formatDateKey } from "../utils/dateUtils";

// 고화질 푸드 이미지 에셋 가용 리스트
const MEAL_IMAGE_URLS = {
  porkCutlet: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAhaVM4UNLR2iI8rtYQIEgkibdqZL9N_-6MT2_gBXXQGEc7ykBS3bE3bgeik2WUEwJ7gc7ScYqDNsGs7Dy1iBB9a_YmCJQQaHhrztq882CXHXvr6A4PikvPgp4YhQvzWMPykL8aWrsCKHy4UqQXVCSVbBl1uAbUVB1c1UskxNtnuMTgz3QLXsmh3ik4bfYEUwt82exOQ18YwpASGzOVJZUuQh5hO9154-mqnmF7KJV3rhfN80kCdCT1GUwefBgycPUQT4AMPU1Kp4",
  rice: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUNEW_ram1J3iTNY3vyC5iUsdkM0MIDvO_UVejcR2pBHVYVZcw7uVS1lapF794jQKyhsIYJuvlqhoiDzt_mVgHfshU5rGSAol2UuH6GAUQbQ1gVkehboWvQKA2MR3mEjADDRWvsm6UqweKRFWUlXb8w7FtSCspC-__CtImN6iF6qLANwMBCJlOc4YkL3Y6rhFQcVxaL0cmZS_81ucVjtu5Jt2oCcSAZD_nLsZuwhAQY8DjgWcwiy_9ZnWL4kVJ8hFHkP7-zBTgTqE",
  kimchiStew: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCUGfgU3Cb4-vBvrD9MeFMsDgIF6hdMtoJUAOF059sfnQb0AZgy23ZliIONVNO73I-ZJdBsOUh_bXRM5hFz7gNdBVqO7AXYKD1svmA6aqFrXwCo2bQrmYyhok5qsmgooLL900Sxf2aJIb9GQ0QuPxbAMiD6IrjX5_l4-xzl3Hh7mbUWyGuN-lc3C2yu24JtltTXSXxPRikXlCJ2kX4GpVYxQd8b1egFlQiib7Z0CoiR_4SbLVsFiShANFmIaO6trZ3bAP80mIpUKM",
  spinach: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2mf6c2ZnniqyNYsT2MwtqkT6UhCP_vx0u0NyF2WKBwurBrmfzBZQRXASWMa-2z348qf3J-qFQrCm08DQtZxvl0b15WHewEfdA0YDQYjNinzYGMScLn8nI6yLLIshaf66GOLBwUDYT99nZEGlGTTQlN3uKj3-eAk0n72OzA0Nyyitd5r4LnDI6TsF8GA026Ed0JyMo_6-j7gS27SM5-u83UxovTEQ3-ScJTSyIguBtBbXfwg2GuEjsENc9LGLKOSMUe9AiC5OPjz4",
  mackerel: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS7IhgG311gQLITiELmfEwohwyF-yaDv2lxY3UwWNr9vAPqvXsg97PkHWUI6SqPxgkSBoSKajG-hlKF0Ic0xZJcCENXgx1JIxa8m--PX44OOGVY8SH9m8HKmPDrcZ2m4Z26LJX9cPwb9rCraBKrZE-srl-Q-Tyy9i6xAHVVtEhwlIowjoyQ2N3sWRIW5diDeqmfkUSqJSxbxa3sQtaewjQyUYQF1NK19GWPZW1zRAiM-uG1YA_L-32vv24IUzmmca9qEoyjeIXF_I",
  hamSteak: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80",
  tunaRice: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop&q=80", // delicious bowl
  bulgogi: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300&auto=format&fit=crop&q=80",
  jajangmyeon: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80",
  pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
  maratang: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=300&auto=format&fit=crop&q=80"
};

/**
 * 특정 주의 월~금 날짜 리스트를 입력받아 동적으로 식단 Mock 데이터를 생성합니다.
 */
export function generateMealsForWeek(weekDates: Date[]): MealMockData[] {
  const dayLabels = ["월", "화", "수", "목", "금"];
  const meals: MealMockData[] = [];

  weekDates.forEach((date, index) => {
    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const dateKey = formatDateKey(date);
    const dayName = dayLabels[index] || "월";

    // 요일별 독특하고 맛있는 식단과 상세 반찬들 (영양 가치 및 알레르기) 정의
    if (dayName === "월") {
      // 월요일 식단
      meals.push({
        id: `meal-${dateKey}-lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "lunch",
        title: "치즈돈까스 정식",
        dishes: ["친환경현미밥", "쇠고기미역국", "치즈돈까스", "숙주미나리무침", "배추김치"],
        totalCalories: 845,
        nutrition: { calories: 845, protein: 32, carbs: 110, fat: 25 },
        allergens: ["대두", "밀", "쇠고기", "돼지고기", "우유"]
      });

      meals.push({
        id: `meal-${dateKey}-dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "dinner",
        title: "참치마요덮밥 정식",
        dishes: ["참치마요덮밥", "유부장국", "매콤떡볶이", "깍두기", "요구르트"],
        totalCalories: 720,
        nutrition: { calories: 720, protein: 20, carbs: 88, fat: 14 },
        allergens: ["난류", "우유", "대두", "밀"]
      });
    } else if (dayName === "화") {
      // 화요일 식단
      meals.push({
        id: `meal-${dateKey}-lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "lunch",
        title: "찹쌀꿔바로우 & 마라탕",
        dishes: ["친환경오곡밥", "얼큰사골마라탕", "찹쌀꿔바로우", "단무지무침", "알타리김치"],
        totalCalories: 880,
        nutrition: { calories: 880, protein: 28, carbs: 115, fat: 26 },
        allergens: ["땅콩", "대두", "밀", "돼지고기"]
      });

      meals.push({
        id: `meal-${dateKey}-dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "dinner",
        title: "치킨마요덮밥 & 오꼬노미",
        dishes: ["치킨마요덮밥", "맑은우동국", "오꼬노미야끼", "깍두기", "감귤쥬스"],
        totalCalories: 710,
        nutrition: { calories: 710, protein: 22, carbs: 92, fat: 16 },
        allergens: ["난류", "대두", "밀", "닭고기"]
      });
    } else if (dayName === "수") {
      // 수요일 식단
      meals.push({
        id: `meal-${dateKey}-lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "lunch",
        title: "수제함박스테이크 정식",
        dishes: ["혼합잡곡밥", "돈육김치찌개", "수제함박스테이크", "숙주미나리무침", "깍두기", "콘드레싱"],
        totalCalories: 850,
        nutrition: { calories: 850, protein: 34, carbs: 105, fat: 26 },
        allergens: ["돼지고기", "쇠고기", "대두", "밀"]
      });

      meals.push({
        id: `meal-${dateKey}-dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "dinner",
        title: "미니우동 & 참치마요덮밥",
        dishes: ["참치마요덮밥", "미니우동", "단무지무침", "배추김치", "요구르트"],
        totalCalories: 720,
        nutrition: { calories: 720, protein: 21, carbs: 88, fat: 14 },
        allergens: ["난류", "우유", "대두", "밀"]
      });
    } else if (dayName === "목") {
      // 목요일 식단
      meals.push({
        id: `meal-${dateKey}-lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "lunch",
        title: "안동찜닭 영양 정식",
        dishes: ["보리밥", "맑은콩나물국", "안동찜닭", "쫄깃김말이튀김", "깍두기", "바나나"],
        totalCalories: 810,
        nutrition: { calories: 810, protein: 30, carbs: 102, fat: 18 },
        allergens: ["대두", "밀", "닭고기"]
      });

      meals.push({
        id: `meal-${dateKey}-dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "dinner",
        title: "볼로네제 스파게티 세트",
        dishes: ["스파게티", "마늘구이빵", "마카로니콘샐러드", "수제모듬피클", "사과쥬스"],
        totalCalories: 740,
        nutrition: { calories: 740, protein: 23, carbs: 108, fat: 19 },
        allergens: ["우유", "대두", "밀", "토마토", "돼지고기"]
      });
    } else if (dayName === "금") {
      // 금요일 식단
      meals.push({
        id: `meal-${dateKey}-lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "lunch",
        title: "춘천닭갈비 철판 정식",
        dishes: ["발아현미밥", "달콤팽이버섯호박국", "춘천닭갈비무침", "메밀전병", "배추김치"],
        totalCalories: 825,
        nutrition: { calories: 825, protein: 33, carbs: 100, fat: 20 },
        allergens: ["대두", "밀", "닭고기", "메밀"]
      });

      meals.push({
        id: `meal-${dateKey}-dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dateKey,
        dayOfWeek: dayName,
        mealType: "dinner",
        title: "차돌육개장 & 생선구이",
        dishes: ["친환경백미밥", "얼큰차돌육개장", "임연수구이", "시금치두부무침", "깍두기"],
        totalCalories: 710,
        nutrition: { calories: 710, protein: 25, carbs: 85, fat: 15 },
        allergens: ["대두", "밀", "쇠고기", "생선"]
      });
    }
  });

  return meals;
}

/**
 * 계산기용 요리 디테일 아이템 리스트 (각 카테고리별 푸드 리스트)
 * 사용자가 요일과 급식 타입을 바꿀 때 영양성분을 정밀 계산할 수 있게 보조합니다.
 */
export function getDetailedDishesForMeal(meal: MealMockData): MealItem[] {
  // 실제 식단에 포함된 요리 리스트와 매칭되는 상세 칼로리 및 성분 정보 반환
  const defaultItems: Record<string, Omit<MealItem, "id">> = {
    // 밥류
    "친환경현미밥": { name: "친환경현미밥", kcal: 300, carbs: 60, protein: 6, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "친환경오곡밥": { name: "친환경오곡밥", kcal: 310, carbs: 62, protein: 7, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "혼합잡곡밥": { name: "혼합잡곡밥", kcal: 300, carbs: 61, protein: 6, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "보리밥": { name: "보리밥", kcal: 290, carbs: 59, protein: 5, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "발아현미밥": { name: "발아현미밥", kcal: 300, carbs: 60, protein: 6, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "참치마요덮밥": { name: "참치마요덮밥", kcal: 510, carbs: 75, protein: 12, fat: 15, category: "bob", imageUrl: MEAL_IMAGE_URLS.tunaRice },
    "치킨마요덮밥": { name: "치킨마요덮밥", kcal: 530, carbs: 78, protein: 14, fat: 16, category: "bob", imageUrl: MEAL_IMAGE_URLS.tunaRice },
    "친환경백미밥": { name: "친환경백미밥", kcal: 300, carbs: 63, protein: 5, fat: 1, category: "bob", imageUrl: MEAL_IMAGE_URLS.rice },
    "스파게티": { name: "볼로네제 스파게티", kcal: 450, carbs: 80, protein: 15, fat: 10, category: "bob", imageUrl: MEAL_IMAGE_URLS.pasta },

    // 국류
    "쇠고기미역국": { name: "쇠고기미역국", kcal: 110, carbs: 6, protein: 10, fat: 5, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "유부장국": { name: "유부장국", kcal: 60, carbs: 5, protein: 3, fat: 3, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "얼큰사골마라탕": { name: "얼큰사골마라탕", kcal: 320, carbs: 15, protein: 12, fat: 20, category: "guk", imageUrl: MEAL_IMAGE_URLS.maratang },
    "맑은우동국": { name: "맑은우동국", kcal: 70, carbs: 8, protein: 3, fat: 2, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "미니우동": { name: "미니우동", kcal: 180, carbs: 32, protein: 5, fat: 2, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "돈육김치찌개": { name: "돈육김치찌개", kcal: 250, carbs: 10, protein: 18, fat: 12, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "맑은콩나물국": { name: "맑은콩나물국", kcal: 40, carbs: 4, protein: 2, fat: 1, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "달콤팽이버섯호박국": { name: "팽이버섯애호박국", kcal: 50, carbs: 6, protein: 2, fat: 1, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },
    "얼큰차돌육개장": { name: "얼큰차돌육개장", kcal: 220, carbs: 8, protein: 14, fat: 14, category: "guk", imageUrl: MEAL_IMAGE_URLS.kimchiStew },

    // 반찬류
    "치즈돈까스": { name: "바삭치즈돈까스", kcal: 350, carbs: 30, protein: 14, fat: 18, category: "banchan", imageUrl: MEAL_IMAGE_URLS.porkCutlet },
    "숙주미나리무침": { name: "숙주미나리무침", kcal: 45, carbs: 5, protein: 2, fat: 1, category: "banchan", imageUrl: MEAL_IMAGE_URLS.spinach },
    "매콤떡볶이": { name: "매콤떡볶이", kcal: 210, carbs: 40, protein: 4, fat: 2, category: "banchan", imageUrl: MEAL_IMAGE_URLS.pasta },
    "찹쌀꿔바로우": { name: "찹쌀꿔바로우", kcal: 320, carbs: 35, protein: 12, fat: 14, category: "banchan", imageUrl: MEAL_IMAGE_URLS.porkCutlet },
    "단무지무침": { name: "단무지무침", kcal: 20, carbs: 4, protein: 0, fat: 0, category: "banchan", imageUrl: MEAL_IMAGE_URLS.spinach },
    "오꼬노미야끼": { name: "해물오꼬노미야끼", kcal: 180, carbs: 20, protein: 6, fat: 8, category: "banchan", imageUrl: MEAL_IMAGE_URLS.hamSteak },
    "수제함박스테이크": { name: "수제함박스테이크", kcal: 310, carbs: 15, protein: 18, fat: 16, category: "banchan", imageUrl: MEAL_IMAGE_URLS.hamSteak },
    "콘드레싱": { name: "콘치즈샐러드", kcal: 150, carbs: 12, protein: 3, fat: 10, category: "banchan", imageUrl: MEAL_IMAGE_URLS.spinach },
    "안동찜닭": { name: "순살안동찜닭", kcal: 280, carbs: 18, protein: 22, fat: 11, category: "banchan", imageUrl: MEAL_IMAGE_URLS.bulgogi },
    "쫄깃김말이튀김": { name: "바삭김말이튀김", kcal: 120, carbs: 18, protein: 1, fat: 5, category: "banchan", imageUrl: MEAL_IMAGE_URLS.porkCutlet },
    "마늘구이빵": { name: "향긋마요마늘빵", kcal: 140, carbs: 18, protein: 2, fat: 6, category: "banchan", imageUrl: MEAL_IMAGE_URLS.hamSteak },
    "마카로니콘샐러드": { name: "콘마카로니샐러드", kcal: 130, carbs: 14, protein: 2, fat: 8, category: "banchan", imageUrl: MEAL_IMAGE_URLS.spinach },
    "춘천닭갈비무침": { name: "매콤춘천닭갈비", kcal: 260, carbs: 10, protein: 20, fat: 12, category: "banchan", imageUrl: MEAL_IMAGE_URLS.bulgogi },
    "메밀전병": { name: "김치메밀전병", kcal: 150, carbs: 22, protein: 4, fat: 5, category: "banchan", imageUrl: MEAL_IMAGE_URLS.porkCutlet },
    "임연수구이": { name: "노릇임연수구이", kcal: 190, carbs: 0, protein: 22, fat: 10, category: "banchan", imageUrl: MEAL_IMAGE_URLS.mackerel },
    "시금치두부무침": { name: "담백시금치두부무침", kcal: 65, carbs: 4, protein: 5, fat: 3, category: "banchan", imageUrl: MEAL_IMAGE_URLS.spinach },

    // 디저트 및 김치
    "배추김치": { name: "아삭배추김치", kcal: 30, carbs: 5, protein: 1, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach },
    "깍두기": { name: "시원깍두기", kcal: 25, carbs: 4, protein: 1, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach },
    "요구르트": { name: "상큼요구르트", kcal: 50, carbs: 12, protein: 0, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach },
    "감귤쥬스": { name: "생감귤쥬스", kcal: 60, carbs: 14, protein: 0, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach },
    "바나나": { name: "유기농바나나", kcal: 90, carbs: 22, protein: 1, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach },
    "사과쥬스": { name: "투명사과쥬스", kcal: 60, carbs: 14, protein: 0, fat: 0, category: "dessert", imageUrl: MEAL_IMAGE_URLS.spinach }
  };

  const detailedList: MealItem[] = [];

  meal.dishes.forEach((dish, idx) => {
    const found = defaultItems[dish];
    if (found) {
      detailedList.push({
        ...found,
        id: `${meal.id}-item-${idx}`
      });
    } else {
      // 매칭 안 되는 음식을 위해 동적인 fallback 아이템 자동 생성
      detailedList.push({
        id: `${meal.id}-item-${idx}`,
        name: dish,
        kcal: 120,
        carbs: 15,
        protein: 8,
        fat: 3,
        category: idx === 0 ? "bob" : idx === 1 ? "guk" : (dish.includes("김치") || dish.includes("음료") || dish.includes("요구") || dish.includes("과일")) ? "dessert" : "banchan",
        imageUrl: dish.includes("김치") || dish.includes("나물") ? MEAL_IMAGE_URLS.spinach : dish.includes("국") || dish.includes("찌개") ? MEAL_IMAGE_URLS.kimchiStew : MEAL_IMAGE_URLS.mackerel
      });
    }
  });

  // 영양 성분이 비어 보이지 않게 최소한 4개 이상으로 채우기
  if (detailedList.length < 4) {
    const mockMackerel: MealItem = {
      id: `${meal.id}-item-extra-mackerel`,
      name: "노릇 영양 고등어구이",
      kcal: 250,
      carbs: 0,
      protein: 24,
      fat: 14,
      category: "banchan",
      imageUrl: MEAL_IMAGE_URLS.mackerel
    };
    detailedList.push(mockMackerel);
  }

  return detailedList;
}

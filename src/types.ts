export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealItem {
  id: string;
  name: string;
  kcal: number;
  carbs: number;
  protein: number;
  fat: number;
  category: "bob" | "guk" | "banchan" | "dessert";
  imageUrl: string;
}

export interface MealMockData {
  id: string;
  schoolName: string;
  date: string; // "YYYY-MM-DD" style representation or standard
  dateKey: string; // "YYYYMMDD"
  dayOfWeek: string; // "월", "화" 등
  mealType: "lunch" | "dinner";
  title: string;
  dishes: string[]; // array of dish names
  totalCalories: number;
  nutrition: NutritionInfo;
  allergens: string[];
}

export interface MealFoodItem {
  food_item_identifier: string;
  quantity: string;
  unit: string;
}

export interface Meal {
  meal_date: string;
  meal_food_items: MealFoodItem[];
}

export interface User {
  email: string;
  name: string | null;
  profile_pic: string;
  username: string;
}

export interface Warrior {
  users: User;
  meals: Meal[];
}

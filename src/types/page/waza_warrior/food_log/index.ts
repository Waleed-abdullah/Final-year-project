import { NutritionixNutrientsEndpoint } from '@/types/diet';
import { Decimal } from '@prisma/client/runtime/library';

export interface FoodItem {
  nutrients?: NutritionixNutrientsEndpoint;
  meal_id: string;
  food_item_identifier: string;
  quantity: Decimal;
  created_at: Date;
  updated_at: Date;
  unit: string;
}

export interface MealType {
  meal_type_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Meal {
  meal_id: string;
  warrior_id: string;
  meal_type_id: string;
  meal_date: Date;
  created_at: Date;
  updated_at: Date;
  meal_food_items: FoodItem[];
  meal_types: MealType;
}

export interface MealsByType {
  Breakfast: Meal;
  Lunch: Meal;
  Dinner: Meal;
  Snack: Meal;
}

export interface SelectedFoods {
  Breakfast: Meal;
  Lunch: Meal;
  Dinner: Meal;
  Snack: Meal;
}

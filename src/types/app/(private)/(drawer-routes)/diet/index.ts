export interface CommonFoodItem {
  food_name: string;
  serving_unit: string;
  tag_name: string;
  serving_qty: number;
  common_type: null | number;
  tag_id: string;
  photo: {
    thumb: string;
    highres?: string | null;
    is_user_uploaded?: boolean;
  };
  locale: string;
}

export interface CommonResponse {
  common: CommonFoodItem[];
}

export interface BrandedFoodItem {
  food_name: string;
  serving_unit: string;
  nix_brand_id: string;
  brand_name_item_name: string;
  serving_qty: number;
  nf_calories: number;
  photo: {
    thumb: string;
    highres?: string | null;
    is_user_uploaded?: boolean;
  };
  brand_name: string;
  region: number;
  brand_type: number;
  nix_item_id: string;
  locale: string;
}

export interface BrandedResponse {
  branded: BrandedFoodItem[];
}

export interface NutritionixInstantEndpoint {
  common: CommonFoodItem[];
  branded: BrandedFoodItem[];
}

export interface NutritionixNutrientsEndpoint {
  foods: {
    food_name: string;
    brand_name: string;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    nf_calories: number;
    nf_total_fat: number;
    nf_saturated_fat: number;
    nf_cholesterol: number;
    nf_sodium: number;
    nf_total_carbohydrate: number;
    nf_dietary_fiber: number;
    nf_sugars: number;
    nf_protein: number;
    nf_potassium: number;
    nf_p: number;
    full_nutrients: {
      attr_id: number;
      value: number;
    }[];
    nix_brand_name: string;
    nix_brand_id: string;
    nix_item_name: string;
    nix_item_id: string;
    metadata: {
      is_raw_food: boolean;
    };
    source: number;
    ndb_no: number;
    tags: {
      item: string;
      measure: null | string;
      quantity: number;
      tag_id: number;
    }[];
    alt_measures: {
      serving_weight: number;
      measure: string;
      seq: number;
      qty: number;
    }[];
    lat: null;
    lng: null;
    meal_type: number;
    photo: {
      thumb: string;
      highres: string;
      is_user_uploaded: boolean;
    };
    sub_recipe: null;
  }[];
  branded: BrandedFoodItem[];
}

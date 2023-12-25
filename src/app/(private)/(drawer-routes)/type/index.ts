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

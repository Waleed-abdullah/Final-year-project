'use client';
import React, { useState, useEffect } from 'react';
import {
  BrandedFoodItem,
  CommonFoodItem,
  NutritionixInstantEndpoint,
  NutritionixNutrientsEndpoint,
} from '../../../../types/app/(private)/(drawer-routes)/diet';
import { MealsByType } from '@/src/types/page/waza_warrior/food_log';
import {
  fetchNutrients,
  fetchSavedMeals,
  fetchSuggestions,
} from '../services/meals_services';

export default function DietPage() {
  const [query, setQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<
    Map<string, { item: CommonFoodItem | BrandedFoodItem; count: number }>
  >(new Map());
  const [savedMeals, setSavedMeals] = useState<MealsByType>({});

  const [suggestions, setSuggestions] =
    useState<NutritionixInstantEndpoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mealType, setMealType] = useState('Breakfast');
  const [mealDate, setMealDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    const warriorId = '37914f58-6fe8-46dd-a20b-06f3a1cd0e8e'; // replace with actual warrior ID

    const fetchData = async () => {
      const meals: MealsByType = await fetchSavedMeals(
        warriorId,
        new Date(mealDate),
      );

      for (const mealType of Object.keys(meals)) {
        for (const meal of meals[mealType]) {
          for (const item of meal.meal_food_items) {
            const foodItemQuery = `${item.quantity} ${item.unit} ${item.food_item_identifier}`;
            // Fetch nutrient details for each food item
            const nutrientDetails = await fetchNutrients(foodItemQuery);
            // Merge the nutrient details with the food item
            item.nutrients = nutrientDetails;
          }
        }
      }

      setSavedMeals(meals);
      console.log(meals);
    };

    fetchData();
  }, [mealDate]);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (query.length < 3) return;
      setIsLoading(true);
      const suggestions: NutritionixInstantEndpoint =
        await fetchSuggestions(query);
      setSuggestions(suggestions);
      setIsLoading(false);
    }, 500); // 500ms debounce time

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };
  const handleFoodSelect = (food: CommonFoodItem | BrandedFoodItem) => {
    setSelectedFoods((prevSelectedFoods) => {
      const foodId = 'nix_brand_id' in food ? food.nix_brand_id : food.tag_id;
      const existingFood = prevSelectedFoods.get(foodId);

      if (existingFood) {
        return new Map(prevSelectedFoods).set(foodId, {
          item: food,
          count: existingFood.count + 1,
        });
      } else {
        return new Map(prevSelectedFoods).set(foodId, { item: food, count: 1 });
      }
    });
  };
  const handleMealTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setMealType(event.target.value);
  };
  const handleMealDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealDate(event.target.value);
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={handleQueryChange}
        placeholder='Search for food items'
      />
      {isLoading && <div>Loading...</div>}
      {!isLoading && suggestions && suggestions.common?.length > 0 && (
        <ul className='max-h-60 overflow-y-auto'>
          <p>Common</p>
          {suggestions.common.map((item, index) => (
            <li
              key={index}
              onClick={() => handleFoodSelect(item)}
              className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
            >
              <img
                src={item.photo.thumb}
                alt={item.food_name}
                className='w-10 h-10 mr-2'
              />
              {item.food_name}
            </li>
          ))}
          <p>Branded</p>
          {suggestions.branded.map((item, index) => (
            <li
              key={index}
              onClick={() => handleFoodSelect(item)}
              className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
            >
              <img
                src={item.photo.thumb}
                alt={item.food_name}
                className='w-10 h-10 mr-2'
              />
              {item.food_name}
              {item.nf_calories}
            </li>
          ))}
        </ul>
      )}
      {selectedFoods.size > 0 && (
        <div className='mt-4'>
          <h3 className='font-bold'>Selected Foods:</h3>
          <ul>
            {Array.from(selectedFoods.values()).map(
              ({ item, count }, index) => (
                <li key={index} className='p-2 border-b border-gray-300'>
                  {item.food_name} - {count} x {item.serving_qty}{' '}
                  {item.serving_unit}
                </li>
              ),
            )}
          </ul>
        </div>
      )}
      {/* Meal Type Selector */}
      <select
        value={mealType}
        onChange={handleMealTypeChange}
        className='p-2 border border-gray-300 rounded mt-2'
      >
        <option value='Breakfast'>Breakfast</option>
        <option value='Lunch'>Lunch</option>
        <option value='Dinner'>Dinner</option>
        <option value='Snack'>Snack</option>
      </select>

      {/* Date Picker */}
      <input
        type='date'
        value={mealDate}
        onChange={handleMealDateChange}
        className='p-2 border border-gray-300 rounded mt-2'
      />
      {savedMeals &&
        Object.entries(savedMeals).map(
          ([mealType, meals]) =>
            meals.length && (
              <div key={mealType}>
                <h3>{mealType}</h3>
                {meals.map((meal) => (
                  <div key={meal.meal_id}>
                    <p>
                      Meal Date:{' '}
                      {new Date(meal.meal_date).toISOString().split('T')[0]}
                    </p>
                    <ul>
                      {meal.meal_food_items.map((item, index) => {
                        // const nutrientInfo = await fetchNutrientDetails(
                        //   `${item.quantity} ${item.unit} ${item.food_item_identifier}`,
                        // );
                        return (
                          <li key={index}>
                            {item.food_item_identifier} -{' '}
                            {item.quantity.toString()} {item.unit}
                            {/* Display nutrient information */}
                            {/* You can display detailed nutrient information here */}
                            {item.nutrients && (
                              <span>
                                Calories: {item.nutrients.foods[0].nf_calories}
                              </span>
                            )}
                            {/* Add other nutrient details */}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ),
        )}
    </div>
  );
}

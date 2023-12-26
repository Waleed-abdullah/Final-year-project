'use client';
import React, { useState, useEffect } from 'react';
import {
  BrandedFoodItem,
  CommonFoodItem,
  NutritionixInstantEndpoint,
} from '../type';
import { MealsByType } from '@/src/types/page/waza_warrior/food_log';

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

  const fetchSavedMeals = async (warrior_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/waza_warrior/food_log/getMealsByDate?warrior_id=${warrior_id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: new Date().toISOString().split('T')[0],
          }),
        },
      );
      const data = await response.json();
      setSavedMeals(data);
      console.log('=====================saved meals=====================');
      console.log(data);
      console.log('==================================================');
    } catch (error) {
      console.error('Error fetching saved meals:', error);
    }
  };

  // Function to fetch nutrient details
  const fetchNutrientDetails = async (query: string) => {
    try {
      const nutrientResponse = await fetch(
        'https://trackapi.nutritionix.com/v2/natural/nutrients/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': `${process.env.NUTRITIONIX_APP_ID}`,
            'x-app-key': `${process.env.NUTRITIONIX_API_KEY}`,
            'x-remote-user-id': '0',
          },
          body: JSON.stringify({ query }),
        },
      );
      return await nutrientResponse.json();
    } catch (error) {
      console.error('Error fetching nutrient details:', error);
      return null;
    }
  };
  useEffect(() => {
    fetchSavedMeals('37914f58-6fe8-46dd-a20b-06f3a1cd0e8e');
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) return;

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://trackapi.nutritionix.com/v2/search/instant/?query=${query}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': `${process.env.NUTRITIONIX_APP_ID}`,
              'x-app-key': `${process.env.NUTRITIONIX_API_KEY}`,
              'x-remote-user-id': '0',
            },
          },
        );

        const data: NutritionixInstantEndpoint = await response.json();
        setSuggestions(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }

      setIsLoading(false);
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 500); // 500ms debounce time

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleInputChange = (event: any) => {
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
        onChange={handleInputChange}
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
        Object.entries(savedMeals).map(([mealType, meals]) => (
          <div key={mealType}>
            <h3>{mealType}</h3>
            {meals.map((meal) => (
              <div key={meal.meal_id}>
                <p>Meal Date: {meal.meal_date.toString()}</p>
                <ul>
                  {meal.meal_food_items.map((item, index) => {
                    // const nutrientInfo = await fetchNutrientDetails(
                    //   `${item.quantity} ${item.unit} ${item.food_item_identifier}`,
                    // );
                    return (
                      <li key={index}>
                        {item.food_item_identifier} - {item.quantity.toString()}{' '}
                        {item.unit}
                        {/* Display nutrient information */}
                        <div>
                          {/* You can display detailed nutrient information here */}
                          {/* Calories: {nutrientInfo?.foods[0].nf_calories} */}
                          {/* Add other nutrient details */}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

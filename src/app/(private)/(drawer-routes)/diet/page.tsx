'use client';
import React, { useState, useEffect } from 'react';
import {
  BrandedFoodItem,
  CommonFoodItem,
  NutritionixInstantEndpoint,
} from '../type';

export default function DietPage() {
  const [query, setQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<
    Map<string, { item: CommonFoodItem | BrandedFoodItem; count: number }>
  >(new Map());

  const [suggestions, setSuggestions] =
    useState<NutritionixInstantEndpoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mealType, setMealType] = useState('Breakfast');
  const [mealDate, setMealDate] = useState(
    new Date().toISOString().split('T')[0],
  );

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
    </div>
  );
}

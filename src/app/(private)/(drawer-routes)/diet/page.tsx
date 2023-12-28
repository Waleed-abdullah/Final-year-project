'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  BrandedFoodItem,
  CommonFoodItem,
  NutritionixInstantEndpoint,
  NutritionixNutrientsEndpoint,
} from '../../../../types/app/(private)/(drawer-routes)/diet';
import { FoodItem, MealsByType } from '@/src/types/page/waza_warrior/food_log';
import {
  fetchNutrients,
  fetchSavedMeals,
  fetchSuggestions,
} from '../services/meals_services';

import Calender from '@/assets/Dashboard/calender.svg';
import Dropdown from '@/assets/Diet/dropdown.svg';
import Delete from '@/assets/Diet/delete.svg';
import Search from '@/assets/Diet/search.svg';
import Add from '@/assets/Diet/add.svg';
import { it } from 'node:test';

export default function DietPage() {
  const [query, setQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<
    Map<string, { item: CommonFoodItem | BrandedFoodItem; count: number }>
  >(new Map());
  const [suggestions, setSuggestions] =
    useState<NutritionixInstantEndpoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [savedMeals, setSavedMeals] = useState<MealsByType | null>(null);
  const [mealType, setMealType] = useState<
    'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  >('Breakfast');
  const [mealDate, setMealDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [totalMealTypeCalories, setTotalMealTypeCalories] = useState({
    Breakfast: 0,
    Lunch: 0,
    Dinner: 0,
    Snack: 0,
  });
  // Helper functions for processing data
  // ... [previous code remains unchanged]

  const processMeals = useCallback(async (meals: MealsByType) => {
    const mealTypeCalories = {
      Breakfast: 0,
      Lunch: 0,
      Dinner: 0,
      Snack: 0,
    };

    // Collect all food items across meal types
    const allFoodItems = [];
    for (const mealsArray of Object.values(meals)) {
      for (const meal of mealsArray) {
        allFoodItems.push(
          ...meal.meal_food_items.map((item: FoodItem) => {
            return `${item.quantity} ${item.unit} ${item.food_item_identifier}`;
          }),
        );
      }
    }

    // Create a unique query string for all items
    const queryString = allFoodItems.join('; ');
    try {
      // Fetch nutritional details for all items in one API call
      const allItemNutrients: NutritionixNutrientsEndpoint =
        await fetchNutrients(queryString);
      // Iterate through the meals to assign the nutrient details
      for (const [mealType, mealsArray] of Object.entries(meals)) {
        for (const meal of mealsArray) {
          for (const item of meal.meal_food_items) {
            const nutrientDetails = allItemNutrients.foods.find(
              (food) =>
                food.food_name === item.food_item_identifier &&
                food.serving_qty == item.quantity,
            );

            if (nutrientDetails) {
              item.nutrients = { foods: [] };
              item.nutrients.foods[0] = nutrientDetails;
              mealTypeCalories[mealType as keyof typeof mealTypeCalories] +=
                nutrientDetails.nf_calories;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching nutrients for items:', error);
    }

    return { meals, mealTypeCalories };
  }, []);

  useEffect(() => {
    const warriorId = '37914f58-6fe8-46dd-a20b-06f3a1cd0e8e'; // Replace with actual warrior ID

    const fetchData = async () => {
      try {
        const meals: MealsByType = await fetchSavedMeals(
          warriorId,
          new Date(mealDate),
        );

        const { meals: processedMeals, mealTypeCalories } =
          await processMeals(meals);
        setSavedMeals(processedMeals);
        console.log(processedMeals);
        setTotalMealTypeCalories(mealTypeCalories);
      } catch (error) {
        console.error('Error fetching saved meals:', error);
      }
    };
    fetchData();
  }, [mealDate, processMeals]);

  const debounceSearch = useCallback((query: string) => {
    setTimeout(async () => {
      if (query.length < 3) return;
      setIsLoading(true);
      const suggestions: NutritionixInstantEndpoint =
        await fetchSuggestions(query);
      setSuggestions(suggestions);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    debounceSearch(query);
  }, [query, debounceSearch]);
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
    setMealType(
      event.target.value as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
    );
  };
  const handleMealDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealDate(event.target.value);
  };
  const mealTypeColors = {
    Breakfast: 'bg-sky-400',
    Lunch: 'bg-yellow-400',
    Dinner: 'bg-red-400',
    Snack: 'bg-gray-600',
  };
  return (
    // <div>
    //   <input
    //     type='text'
    //     value={query}
    //     onChange={handleQueryChange}
    //     placeholder='Search for food items'
    //   />
    //   {isLoading && <div>Loading...</div>}
    //   {!isLoading && suggestions && suggestions.common?.length > 0 && (
    //     <ul className='max-h-60 overflow-y-auto'>
    //       <p>Common</p>
    //       {suggestions.common.map((item, index) => (
    //         <li
    //           key={index}
    //           onClick={() => handleFoodSelect(item)}
    //           className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
    //         >
    //           <img
    //             src={item.photo.thumb}
    //             alt={item.food_name}
    //             className='w-10 h-10 mr-2'
    //           />
    //           {item.food_name}
    //         </li>
    //       ))}
    //       <p>Branded</p>
    //       {suggestions.branded.map((item, index) => (
    //         <li
    //           key={index}
    //           onClick={() => handleFoodSelect(item)}
    //           className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
    //         >
    //           <img
    //             src={item.photo.thumb}
    //             alt={item.food_name}
    //             className='w-10 h-10 mr-2'
    //           />
    //           {item.food_name}
    //           {item.nf_calories}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    //   {selectedFoods.size > 0 && (
    //     <div className='mt-4'>
    //       <h3 className='font-bold'>Selected Foods:</h3>
    //       <ul>
    //         {Array.from(selectedFoods.values()).map(
    //           ({ item, count }, index) => (
    //             <li key={index} className='p-2 border-b border-gray-300'>
    //               {item.food_name} - {count} x {item.serving_qty}{' '}
    //               {item.serving_unit}
    //             </li>
    //           ),
    //         )}
    //       </ul>
    //     </div>
    //   )}
    //   {/* Meal Type Selector */}
    //   <select
    //     value={mealType}
    //     onChange={handleMealTypeChange}
    //     className='p-2 border border-gray-300 rounded mt-2'
    //   >
    //     <option value='Breakfast'>Breakfast</option>
    //     <option value='Lunch'>Lunch</option>
    //     <option value='Dinner'>Dinner</option>
    //     <option value='Snack'>Snack</option>
    //   </select>

    //   {/* Date Picker */}

    <div className='p-4'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>My Diet</p>
        <div className='flex flex-row gap-4'>
          <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
            <Image src={Calender} width={24} height={24} alt='calendar' />
            <input
              type='date'
              name='mealDate'
              value={mealDate}
              onChange={handleMealDateChange}
              className='text-sm font-medium bg-transparent focus:outline-none'
            />
          </label>
          <div className='border-2 rounded-3xl py-1 px-3 border-black/10 flex flex-row gap-2 items-center'>
            <Image src={Dropdown} width={20} height={20} alt='profile-pic' />
            <p className='text-sm font-medium'>Waleed Abdullah</p>
            <Image
              src={'https://robohash.org/asdasd'}
              width={40}
              height={40}
              alt='profile-pic'
            />
          </div>
        </div>
      </header>
      <main>
        <p className='text-2xl font-semibold mb-4'>Log Diet</p>
        <div className='flex flex-row gap-3 justify-between flex-wrap'>
          <div className='min-w-max grow'>
            <div className='bg-white  py-14 rounded-lg shadow flex justify-center items-center flex-wrap flex-1 '>
              Charts
            </div>
            <div className='bg-white  p-4 rounded-lg shadow flex flex-col items-start flex-wrap flex-1 mt-4'>
              <div className='border p-4 rounded-lg flex flex-row border-black/10 w-full'>
                <Image src={Search} width={24} height={24} alt='calender' />
                <input
                  type='text'
                  placeholder='Search for food items'
                  className='flex-grow ml-2 focus:outline-none'
                />
              </div>
              <div className='flex flex-row justify-start gap-3 mt-4'>
                <div
                  className={`px-4 py-1  rounded-xl ${
                    mealType === 'Breakfast' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Breakfast')}
                >
                  <p className='text-white font-semibold'>Breakfast</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl ${
                    mealType === 'Lunch' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Lunch')}
                >
                  <p className='text-white font-semibold'>Lunch</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl ${
                    mealType === 'Dinner' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Dinner')}
                >
                  <p className='text-white font-semibold'>Dinner</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl ${
                    mealType === 'Snack' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Snack')}
                >
                  <p className='text-white font-semibold'>Snack</p>
                </div>
              </div>
              <div className='py-3 px-4 rounded-3xl bg-yellow-400 flex flex-row mt-4 gap-2'>
                <Image src={Add} width={24} height={24} alt='calender' />
                <p className='text-white font-semibold'>Add Food</p>
              </div>
            </div>
          </div>
          <div className='grow min-w-max'>
            <div className='bg-white  p-4 rounded-lg shadow flex flex-col flex-wrap flex-1'>
              <p className='text-lg font-semibold text-gray-400'>
                {`Today's Log`}
              </p>
              <div className='border-black/10 border mt-3' />

              {savedMeals &&
                Object.keys(savedMeals).map((mealType, idx) => (
                  <div key={idx}>
                    <div className='flex flex-row justify-start mt-5 items-center gap-2'>
                      <div
                        className={`px-4 py-1  rounded-xl ${
                          mealTypeColors[
                            mealType as keyof typeof totalMealTypeCalories
                          ] || 'bg-gray-200'
                        }`}
                      >
                        <p className='text-white font-semibold'>{mealType}</p>
                      </div>
                      <p className='text-sm font-bold   text-lg'>
                        {
                          totalMealTypeCalories[
                            mealType as keyof typeof totalMealTypeCalories
                          ]
                        }
                        <span className='font-normal text-sm '>kcal</span>
                      </p>
                    </div>
                    <div className='border-black/10 border mt-5' />
                    {savedMeals[
                      mealType as keyof typeof totalMealTypeCalories
                    ]?.map((meal) =>
                      meal.meal_food_items.map((item) => {
                        return (
                          <div
                            className='flex flex-row justify-between items-center p-2 border border-black/10 mt-5 rounded-lg'
                            key={item.food_item_identifier}
                          >
                            <div className='flex flex-row items-center gap-1 w-4/12 min-w-max'>
                              {item.nutrients && (
                                <Image
                                  src={item.nutrients.foods[0].photo.thumb}
                                  width={24}
                                  height={24}
                                  alt='calender'
                                />
                              )}
                              <p className='text-sm font-bold   text-lg'>
                                {item.food_item_identifier}
                              </p>
                            </div>
                            <div className='flex flex-row items-center gap-1 w-3/12 min-w-max'>
                              <div className='rounded-lg bg-gray-200  py-1 px-2'>
                                Qty
                              </div>
                              <p className='text-sm font-bold   text-lg'>
                                {item.quantity.toString()}
                              </p>
                            </div>
                            <p className='text-sm font-bold   text-lg w-3/12 min-w-max'>
                              {item.nutrients
                                ? item.nutrients.foods[0].nf_calories
                                : 0}
                              <span className='font-normal text-sm '>kcal</span>
                            </p>
                            <Image
                              src={Delete}
                              width={20}
                              height={20}
                              alt='profile-pic'
                            />
                          </div>
                        );
                      }),
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

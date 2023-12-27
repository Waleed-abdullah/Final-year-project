'use client';
import React, { useState, useEffect, useRef } from 'react';
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

import Calender from '@/assets//Dashboard/calender.svg';
import Dropdown from '@/assets/Diet/dropdown.svg';
import Delete from '@/assets/Diet/delete.svg';
import Search from '@/assets/Diet/search.svg';
import Add from '@/assets/Diet/add.svg';
import Image from 'next/image';

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
            const nutrientDetails = await fetchNutrients(foodItemQuery);
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
                <div className='px-4 py-1 bg-sky-400 rounded-xl '>
                  <p className='text-white font-semibold'>Breakfast</p>
                </div>
                <div className='px-4 py-1 bg-gray-400 rounded-xl '>
                  <p className='text-white font-semibold'>Lunch</p>
                </div>
                <div className='px-4 py-1 bg-gray-400 rounded-xl '>
                  <p className='text-white font-semibold'>Dinner</p>
                </div>
                <div className='px-4 py-1 bg-gray-400 rounded-xl '>
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
              {/* {Break fast} */}
              <div className='flex flex-row justify-start mt-5 items-center gap-2'>
                <div className='px-4 py-1 bg-sky-400 rounded-xl '>
                  <p className='text-white font-semibold'>Breakfast</p>
                </div>
                <p className='text-sm font-bold   text-lg'>
                  465<span className='font-normal text-sm '>kcal</span>
                </p>
              </div>

              {savedMeals['Breakfast']?.map((meal) =>
                meal.meal_food_items.map((item) => (
                  <div
                    className='flex flex-row justify-between items-center p-2 border border-black/10 mt-5 rounded-lg'
                    key={item.food_item_identifier}
                  >
                    <div className='flex flex-row items-center gap-1'>
                      <Image
                        src={
                          item.nutrients?.foods[0].photo.thumb ||
                          'robohash.org/asdasd'
                        }
                        width={24}
                        height={24}
                        alt='calender'
                      />
                      <p className='text-sm font-bold   text-lg'>
                        {item.food_item_identifier}
                      </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='rounded-lg bg-gray-200  py-1 px-2'>
                        Qty
                      </div>
                      <p className='text-sm font-bold   text-lg'>
                        {item.quantity.toString()}
                      </p>
                    </div>
                    <p className='text-sm font-bold   text-lg'>
                      {item.nutrients?.foods[0].nf_calories}
                      <span className='font-normal text-sm '>kcal</span>
                    </p>
                    <Image
                      src={Delete}
                      width={20}
                      height={20}
                      alt='profile-pic'
                    />
                  </div>
                )),
              )}

              <div className='border-black/10 border mt-5' />
              {/* Lunch */}
              <div className='flex flex-row justify-start mt-5 items-center gap-2'>
                <div className='px-4 py-1 bg-yellow-400 rounded-xl '>
                  <p className='text-white font-semibold'>Lunch</p>
                </div>
                <p className='text-sm font-bold   text-lg'>
                  0<span className='font-normal text-sm '>kcal</span>
                </p>
              </div>
              {savedMeals['Lunch']?.map((meal) =>
                meal.meal_food_items.map((item) => (
                  <div
                    className='flex flex-row justify-between items-center p-2 border border-black/10 mt-5 rounded-lg'
                    key={item.food_item_identifier}
                  >
                    <div className='flex flex-row items-center gap-1'>
                      <Image
                        src={
                          item.nutrients?.foods[0].photo.thumb ||
                          'robohash.org/asdasd'
                        }
                        width={24}
                        height={24}
                        alt='calender'
                      />
                      <p className='text-sm font-bold   text-lg'>
                        {item.food_item_identifier}
                      </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='rounded-lg bg-gray-200  py-1 px-2'>
                        Qty
                      </div>
                      <p className='text-sm font-bold   text-lg'>
                        {item.quantity.toString()}
                      </p>
                    </div>
                    <p className='text-sm font-bold   text-lg'>
                      {item.nutrients?.foods[0].nf_calories}
                      <span className='font-normal text-sm '>kcal</span>
                    </p>
                    <Image
                      src={Delete}
                      width={20}
                      height={20}
                      alt='profile-pic'
                    />
                  </div>
                )),
              )}

              <div className='border-black/10 border mt-5' />
              {/* Dinner */}
              <div className='flex flex-row justify-start mt-5 items-center gap-2'>
                <div className='px-4 py-1 bg-red-500 rounded-xl '>
                  <p className='text-white font-semibold'>Dinner</p>
                </div>
                <p className='text-sm font-bold   text-lg'>
                  465<span className='font-normal text-sm '>kcal</span>
                </p>
              </div>
              {savedMeals['Dinner']?.map((meal) =>
                meal.meal_food_items.map((item) => (
                  <div
                    className='flex flex-row justify-between items-center p-2 border border-black/10 mt-5 rounded-lg'
                    key={item.food_item_identifier}
                  >
                    <div className='flex flex-row items-center gap-1'>
                      <Image
                        src={
                          item.nutrients?.foods[0].photo.thumb ||
                          'robohash.org/asdasd'
                        }
                        width={24}
                        height={24}
                        alt='calender'
                      />
                      <p className='text-sm font-bold   text-lg'>
                        {item.food_item_identifier}
                      </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='rounded-lg bg-gray-200  py-1 px-2'>
                        Qty
                      </div>
                      <p className='text-sm font-bold   text-lg'>
                        {item.quantity.toString()}
                      </p>
                    </div>
                    <p className='text-sm font-bold   text-lg'>
                      {item.nutrients?.foods[0].nf_calories}
                      <span className='font-normal text-sm '>kcal</span>
                    </p>
                    <Image
                      src={Delete}
                      width={20}
                      height={20}
                      alt='profile-pic'
                    />
                  </div>
                )),
              )}
              {/* Snacks */}
              <div className='flex flex-row justify-start mt-5 items-center gap-2'>
                <div className='px-4 py-1 bg-gray-800 rounded-xl '>
                  <p className='text-white font-semibold'>Snacks</p>
                </div>
                <p className='text-sm font-bold   text-lg'>
                  465<span className='font-normal text-sm '>kcal</span>
                </p>
              </div>
              {savedMeals['Snacks']?.map((meal) =>
                meal.meal_food_items.map((item) => (
                  <div
                    className='flex flex-row justify-between items-center p-2 border border-black/10 mt-5 rounded-lg'
                    key={item.food_item_identifier}
                  >
                    <div className='flex flex-row items-center gap-1'>
                      <Image
                        src={
                          item.nutrients?.foods[0].photo.thumb ||
                          'robohash.org/asdasd'
                        }
                        width={24}
                        height={24}
                        alt='calender'
                      />
                      <p className='text-sm font-bold   text-lg'>
                        {item.food_item_identifier}
                      </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                      <div className='rounded-lg bg-gray-200  py-1 px-2'>
                        Qty
                      </div>
                      <p className='text-sm font-bold   text-lg'>
                        {item.quantity.toString()}
                      </p>
                    </div>
                    <p className='text-sm font-bold   text-lg'>
                      {item.nutrients?.foods[0].nf_calories}
                      <span className='font-normal text-sm '>kcal</span>
                    </p>
                    <Image
                      src={Delete}
                      width={20}
                      height={20}
                      alt='profile-pic'
                    />
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

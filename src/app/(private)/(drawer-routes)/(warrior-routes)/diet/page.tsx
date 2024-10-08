'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  BrandedFoodItem,
  CommonFoodItem,
  NutritionixInstantEndpoint,
  NutritionixNutrientsEndpoint,
} from '@/types/diet';
import { FoodItem, MealsByType } from '@/types/page/waza_warrior/food_log';
import {
  createMeal,
  fetchNutrients,
  fetchSavedMeals,
  fetchSuggestions,
} from '@/lib/nutritionService/meals_services';

import Delete from '@/assets/Diet/delete.svg';
import Search from '@/assets/Diet/search.svg';
import Add from '@/assets/Diet/add.svg';
import Fire from '@/assets/Dashboard/fire.svg';
import Minus from '@/assets/Dashboard/minus.svg';
import Tick from '@/assets/Dashboard/tick.svg';
import Cross from '@/assets/Dashboard/cross.svg';

import CalendarInput from '@/components/CalenderInput';
import DoughnutChart from '@/components/DoughnutChart/DoughnutChart';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useLeaderBoard } from '@/stores/leaderboard-store';
import { updateUserPoints } from '@/lib/leaderboard';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';

export default function DietPage() {
  const [query, setQuery] = useState('');
  const { warriorID, caloricGoal } = useWarriorAndDate();
  const { leaderBoard, setLeaderBoard } = useLeaderBoard()((state) => state);

  // TODO: replace this bad solution with a better one
  const [rerender, setRerender] = useState(false);

  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });
  const chartData = useMemo(
    () => ({
      labels: ['Protein', 'Carbs', 'Fats'],
      datasets: [
        {
          data: [macros.protein, macros.carbs, macros.fats],
          backgroundColor: ['#22c55e', '#6b7280', '#ef4444'],
          borderWidth: 1,
        },
      ],
    }),
    [macros],
  );
  const [selectedFoods, setSelectedFoods] = useState<
    Map<string, { item: CommonFoodItem | BrandedFoodItem; count: number }>
  >(new Map());
  const [suggestions, setSuggestions] =
    useState<NutritionixInstantEndpoint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mealType, setMealType] = useState<
    'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
  >('Breakfast');

  const [savedMeals, setSavedMeals] = useState<MealsByType | null>(null);

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
    for (const meal of Object.values(meals)) {
      allFoodItems.push(
        ...meal.meal_food_items.map((item: FoodItem) => {
          return `${item.quantity} ${item.unit} ${item.food_item_identifier}`;
        }),
      );
    }

    // Create a unique query string for all items
    const queryString = allFoodItems.join(';');
    try {
      // Fetch nutritional details for all items in one API call
      const allItemNutrients: NutritionixNutrientsEndpoint =
        await fetchNutrients(queryString);
      const totals = allItemNutrients.foods.reduce(
        (
          acc: {
            calories: number;
            protein: number;
            carbs: number;
            fats: number;
          },
          food: {
            nf_calories: number;
            nf_protein: number;
            nf_total_carbohydrate: number;
            nf_total_fat: number;
          },
        ) => {
          acc.calories += food.nf_calories;
          acc.protein += food.nf_protein * 4;
          acc.carbs += food.nf_total_carbohydrate * 4;
          acc.fats += food.nf_total_fat * 9;
          return acc;
        },
        { protein: 0, carbs: 0, fats: 0, calories: 0 },
      );

      setMacros(totals);
      let j = 0;
      for (const [mealType, meal] of Object.entries(meals)) {
        for (const item of meal.meal_food_items) {
          const nutrientDetails = allItemNutrients.foods[j++];
          if (nutrientDetails) {
            item.nutrients = { foods: [] };
            item.nutrients.foods[0] = nutrientDetails;
            mealTypeCalories[mealType as keyof typeof mealTypeCalories] +=
              nutrientDetails.nf_calories;
          }
        }
      }
    } catch (error) {
      console.error('Error fetching nutrients for items:', error);
    }

    return { meals, mealTypeCalories };
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (!warriorID) return;
        const meals: MealsByType = await fetchSavedMeals(
          warriorID,
          new Date(mealDate),
        );

        const { meals: processedMeals, mealTypeCalories } =
          await processMeals(meals);
        setSavedMeals(processedMeals);
        setTotalMealTypeCalories(mealTypeCalories);
      } catch (error) {
        console.error('Error fetching saved meals:', error);
      }
    };
    fetchMeals();
  }, [warriorID, mealDate, processMeals, rerender]);

  // put in utility functions
  const debounceSearch = useCallback((query: string) => {
    setSuggestions(null);
    setTimeout(async () => {
      if (query.length < 3) return;
      setIsLoading(true);
      const suggestions: NutritionixInstantEndpoint =
        await fetchSuggestions(query);
      setSuggestions(suggestions);
      setIsLoading(false);
    }, 100);
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

  const handleMealDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealDate(event.target.value);
  };

  const handleAddFood = async () => {
    if (!warriorID) return;
    await createMeal(warriorID, mealType, mealDate, selectedFoods);
    updateUserPoints(warriorID, leaderBoard!, setLeaderBoard, 5);
    setRerender((prev) => !prev);
  };

  const mealTypeColors = {
    Breakfast: 'bg-sky-400',
    Lunch: 'bg-yellow-400',
    Dinner: 'bg-red-400',
    Snack: 'bg-gray-600',
  };
  return (
    <div className='p-4'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>My Diet</p>
        <div className='flex flex-row gap-4 '>
          <CalendarInput
            date={mealDate}
            handleDateChange={handleMealDateChange}
          />
        </div>
      </header>
      <main>
        <p className='text-2xl font-semibold mb-4'>Log Diet</p>
        <div className='flex flex-row gap-3 justify-between flex-wrap '>
          <div className='min-w-max basis-5/12 grow flex flex-col'>
            <div className='bg-white grow py-14 rounded-lg shadow flex justify-center items-center flex-wrap flex-1 '>
              <div className='w-64 relative'>
                <DoughnutChart data={chartData} />
                <div className='absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center '>
                  <p className='font-bold text-3xl'>
                    {macros.calories.toFixed(0)}{' '}
                  </p>
                  <p className='bg-yellow-400 py-1 px-5 rounded-3xl  text-md'>
                    <span className='font-bold'>/ {caloricGoal ?? 1500}</span>{' '}
                    kcal
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-2 justify-between min-w-fit mt-5'>
                <div className='flex flex-row bg-black rounded-3xl p-2 gap-1'>
                  <Image src={Fire} width={20} height={20} alt='fire' />
                  <p className='text-sm font-semibold text-yellow-500'>
                    Calories Burned
                  </p>
                  <p className='text-white text-sm font-semibold '>{`${0}kcal`}</p>
                </div>
                <div className='flex flex-row gap-1'>
                  <div className='flex flex-row bg-green-500 rounded-3xl p-2 gap-1'>
                    <Image src={Minus} width={20} height={20} alt='minus' />
                    <p className='text-sm font-semibold text-white'>Protiens</p>
                  </div>
                  <p className='text-black text-sm font-semibold flex items-center'>
                    {`${macros.protein.toFixed(2)}kcal`}
                  </p>
                </div>
                <div className='flex flex-row gap-1'>
                  <div className='flex flex-row bg-gray-500 rounded-3xl p-2 gap-1'>
                    <Image src={Tick} width={20} height={20} alt='tick' />
                    <p className='text-sm font-semibold text-white'>Carbs</p>
                  </div>
                  <p className='text-black text-sm font-semibold flex items-center'>
                    {`${macros.carbs.toFixed(2)}kcal`}
                  </p>
                </div>
                <div className='flex flex-row gap-1'>
                  <div className='flex flex-row bg-red-500 rounded-3xl p-2 gap-1'>
                    <Image src={Cross} width={20} height={20} alt='cross' />
                    <p className='text-sm font-semibold text-white'>Fats</p>
                  </div>
                  <p className='text-black text-sm font-semibold flex items-center'>
                    {`${macros.fats.toFixed(2)}kcal`}
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-white max-w-[500px] w-full   p-4 rounded-lg shadow flex flex-col items-start flex-wrap flex-1 mt-4'>
              <div className='border p-4 rounded-lg flex flex-row border-black/10 w-full'>
                <Image src={Search} width={24} height={24} alt='calender' />
                <input
                  type='text'
                  placeholder='Search for food items'
                  className='flex-grow w-full ml-2 focus:outline-none'
                  value={query}
                  onChange={handleQueryChange}
                />
              </div>
              {suggestions && suggestions.branded && (
                <div className='p-4 rounded-2xl bg-black wfull cursor-pointer mt-4 max-h-72 overflow-y-scroll  scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-100'>
                  {suggestions.branded.map((suggestion, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleFoodSelect(suggestion)}
                      className='flex flex-row justify-between items-center py-2 px-4 border-2 my-3 border-white hover:border-yellow-400 rounded-lg text-white'
                    >
                      <div className='flex flex-row items-center gap-1 w-4/12 '>
                        <Image
                          src={suggestion.photo.thumb}
                          width={30}
                          height={30}
                          alt='photo'
                          className='rounded-lg'
                        />
                        <p className='text-sm font-bold'>
                          {suggestion.food_name}
                        </p>
                      </div>
                      <div className='flex flex-row justify-between  w-7/12 '>
                        <div className='flex flex-col'>
                          <p className='text-sm font-bold text-yellow-400'>
                            {'Calories'}
                          </p>
                          <p className='text-sm font-bold text-white'>
                            {suggestion.nf_calories}kcal
                          </p>
                        </div>
                        <div className='flex flex-col'>
                          <p className='text-sm font-bold text-green-400'>
                            {'Quantity'}
                          </p>
                          <p className='text-sm font-bold text-white-400'>
                            {`${suggestion.serving_qty} ${suggestion.serving_unit}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedFoods.size > 0 && (
                <div className='mt-4'>
                  <h3 className='font-bold'>Selected Foods:</h3>
                  <ul>
                    {Array.from(selectedFoods.values()).map(
                      ({ item, count }, index) => (
                        <li
                          key={index}
                          className='p-2 border-b border-gray-300'
                        >
                          {item.food_name} - {count} x {item.serving_qty}{' '}
                          {item.serving_unit}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              <div className='flex flex-row justify-start gap-3 mt-4'>
                <div
                  className={`px-4 py-1  rounded-xl cursor-pointer ${
                    mealType === 'Breakfast' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Breakfast')}
                >
                  <p className='text-white font-semibold'>Breakfast</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl cursor-pointer ${
                    mealType === 'Lunch' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Lunch')}
                >
                  <p className='text-white font-semibold'>Lunch</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl cursor-pointer ${
                    mealType === 'Dinner' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Dinner')}
                >
                  <p className='text-white font-semibold'>Dinner</p>
                </div>
                <div
                  className={`px-4 py-1  rounded-xl cursor-pointer ${
                    mealType === 'Snack' ? 'bg-sky-400' : 'bg-gray-400'
                  }`}
                  onClick={() => setMealType('Snack')}
                >
                  <p className='text-white font-semibold'>Snack</p>
                </div>
              </div>
              <div
                className='py-3 px-4 rounded-3xl bg-yellow-400 flex flex-row mt-4 gap-2 cursor-pointer'
                onClick={handleAddFood}
              >
                <Image src={Add} width={24} height={24} alt='calender' />
                <p className='text-white font-semibold'>Add Food</p>
              </div>
            </div>
          </div>
          <div className='basis-5/12 grow min-w-max max-h-[900px]  overflow-y-scroll  scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-100'>
            <div className='bg-white  p-4 rounded-lg shadow flex flex-col flex-wrap max-w-[483px] flex-1'>
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
                        <p className='text-white text-ellipsis  font-semibold'>
                          {mealType}
                        </p>
                      </div>
                      <p className='sm:text-sm text-ellipsis font-bold text-lg'>
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
                    ].meal_food_items.map((item) => {
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
                            <p className='sm:text-sm font-bold max-w-[200px] text-ellipsis   text-lg'>
                              {item.food_item_identifier}
                            </p>
                          </div>
                          <div className='flex flex-row items-center gap-1 w-3/12 min-w-max'>
                            <div className='rounded-lg bg-gray-200  py-1 px-2'>
                              Qty
                            </div>
                            <p className='sm:text-sm font-bold   text-lg'>
                              {item.quantity.toString()}
                            </p>
                          </div>
                          <p className='sm:text-sm font-bold   text-lg w-3/12 min-w-max'>
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
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

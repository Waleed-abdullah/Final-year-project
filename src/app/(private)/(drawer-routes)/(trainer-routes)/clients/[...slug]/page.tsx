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
import { Session } from '@/types/workout';

export default function ClientDetails({
  params,
}: {
  params: { slug: string[] };
}) {
  const [warriorID, caloricGoal] = params.slug;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  //Workout
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async (warrior_id: string, date: string) => {
      const res = await fetch('/api/waza_warrior/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          warrior_id,
          date,
        }),
      });
      const session = await res.json();
      setSession(session);
      console.log(session);
    };
    if (warriorID.length) fetchSession(warriorID, date);
  }, [warriorID, date]);
  //Diet

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
  const [savedMeals, setSavedMeals] = useState<MealsByType | null>(null);

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
          new Date(date),
        );
        if (!Object.keys(meals).length) {
          setMacros({ protein: 0, carbs: 0, fats: 0, calories: 0 });
          return;
        }
        const { meals: processedMeals, mealTypeCalories } =
          await processMeals(meals);
        setSavedMeals(processedMeals);
        setTotalMealTypeCalories(mealTypeCalories);
      } catch (error) {
        console.error('Error fetching saved meals:', error);
      }
    };
    fetchMeals();
  }, [warriorID, date, processMeals]);

  const handleMealDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
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
          <CalendarInput date={date} handleDateChange={handleMealDateChange} />
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
          </div>
          <div className='bg-white grow py-7 px-4 rounded-lg shadow flex  flex-wrap flex-1 flex-col flex-start gap-4'>
            <p className='font-bold'>Push Workout</p>
            <div className='flex flex-col gap-2'>
              {session &&
                session.exercise.map((exercise, idx) => (
                  <div className='flex border-b-2 border-black-900 py-2 justify-between'>
                    <div className='flex '>
                      <p className='bg-yellow-500 rounded-full py-1 px-2 font-bold text-xs '>
                        {idx}
                      </p>
                      <p className='ml-2'>{exercise.title}</p>
                    </div>
                    <div>
                      <p>
                        {exercise.exercise_log
                          .map(
                            (log) => `${log.weight}kg x ${log.achieved_reps}`,
                          )
                          .join('|')}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

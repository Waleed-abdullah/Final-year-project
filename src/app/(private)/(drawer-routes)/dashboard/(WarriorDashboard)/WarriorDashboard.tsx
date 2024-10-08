'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import DoughnutChart from '@/components/DoughnutChart/DoughnutChart';
import Fire from '@/assets/Dashboard/fire.svg';
import Minus from '@/assets/Dashboard/minus.svg';
import Tick from '@/assets/Dashboard/tick.svg';
import Cross from '@/assets/Dashboard/cross.svg';
import Barbell from '@/assets/Dashboard/Union.svg';
import Plate from '@/assets/Dashboard/plate.svg';
import Link from 'next/link';
import { FoodItem, MealsByType } from '@/types/page/waza_warrior/food_log';
import {
  fetchNutrients,
  fetchSavedMeals,
} from '@/lib/nutritionService/meals_services';
import { NutritionixNutrientsEndpoint } from '@/types/diet';
import './WarriorDashboard.css';
import CalendarInput from '@/components/CalenderInput';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';

export default function WarriorDashboard() {
  const { warriorID, caloricGoal, userName } = useWarriorAndDate();

  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchMacros = async () => {
      try {
        if (!warriorID) return;
        const fetchedData: MealsByType = await fetchSavedMeals(
          warriorID!,
          new Date(date),
        );
        const allFoodItems = [];
        for (const meal of Object.values(fetchedData)) {
          allFoodItems.push(
            ...meal.meal_food_items.map((item: FoodItem) => {
              return `${item.quantity} ${item.unit} ${item.food_item_identifier}`;
            }),
          );
        }

        const query: string = allFoodItems.join(';');

        if (!query.length) return;
        const nutrients: NutritionixNutrientsEndpoint =
          await fetchNutrients(query);

        //TODO: Move this to a separate libarary function to refactor the code
        const totals = nutrients.foods.reduce(
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
      } catch (error) {
        console.error('Error fetching macro data:', error);
      }
    };

    fetchMacros();
  }, [warriorID, date]);
  const chartData = useMemo(
    () => ({
      labels: ['Protein', 'Carbs', 'Fats'],
      datasets: [
        {
          data: [macros.protein * 4, macros.carbs * 4, macros.fats * 4],
          backgroundColor: ['#22c55e', '#6b7280', '#ef4444'],
          borderWidth: 1,
        },
      ],
    }),
    [macros],
  );
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className='p-4'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>Dashboard</p>
        <CalendarInput date={date} handleDateChange={handleDateChange} />
      </header>

      <main>
        <h2 className='text-lg font-semibold mb-4'>Welcome Back {userName}!</h2>
        <div className='flex flex-row gap-3 justify-between flex-wrap'>
          <div className='bg-white  p-4 rounded-lg shadow flex justify-center items-center flex-wrap flex-1 '>
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
                  <p className='text-sm font-semibold text-white'>Protien</p>
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

          <div className='flex flex-col gap-2 justify-between flex-1 min-w-fit'>
            <Link
              href={'workouts'}
              className='bg-black  p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1
            cursor-pointer'
            >
              <Image
                src={Barbell}
                style={{ marginRight: '30px' }}
                width={100}
                height={42.48}
                alt='calender'
              />
              <p className='text-xl text-white font-semibold'>Log Workout</p>
            </Link>
            <Link
              href={'diet'}
              className='bg-white p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1'
            >
              <Image
                src={Plate}
                style={{ marginRight: '32px' }}
                width={100}
                height={56}
                alt='calender'
              />
              <p className='text-xl  font-semibold'>Log Diet</p>
            </Link>
          </div>
          <div className='w-full flex flex-row justify-between mt-4 gap-4 flex-wrap'>
            <div
              aria-label='Workout of the day'
              className='bg-white px-10 py-20 rounded-lg gap-2 shadow flex justify-center items-center min-w-fit flex-1'
            >
              <p className='text-xl  font-semibold cursor-default'>
                Placeholder
              </p>
            </div>
            <div
              aria-label='Market place'
              className='bg-white  rounded-lg gap-2 px-10 py-20 shadow flex justify-center items-center min-w-fit flex-1 cursor-pointer'
            >
              <p className='text-xl  font-semibold'>Trainer Marketplace</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

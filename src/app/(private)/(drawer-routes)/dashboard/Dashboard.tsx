'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Calender from '@/assets//Dashboard/calender.svg';
import DoughnutChart from '@/components/DoughnutChart/DoughnutChart';
import Fire from '@/assets/Dashboard/fire.svg';
import Minus from '@/assets/Dashboard/minus.svg';
import Tick from '@/assets/Dashboard/tick.svg';
import Cross from '@/assets/Dashboard/cross.svg';
import Barbell from '@/assets/Dashboard/barbell.svg';
import Plate from '@/assets/Dashboard/plate.svg';
import Link from 'next/link';
import { Warrior } from '@/src/types/app/(private)/(drawer-routes)/dashboard';
import { Meal, MealsByType } from '@/src/types/page/waza_warrior/food_log';
import { fetchNutrients, fetchSavedMeals } from '../services/meals_services';

export function Dashboard() {
  const [warrior, setWarrior] = useState<Warrior | null>(null);
  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.data) return;

    if (session.data.user.isNewUser) {
      router.push('/complete-user');
    }

    if (session.data.user.user_type === 'Waza Trainer') {
      router.push(`/api/auth/signin`);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/waza_warrior/?user_id=${session.data.user.user_id}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const fetchedData: Warrior = await res.json();
        setWarrior(fetchedData);
      } catch (error) {
        console.error('Error fetching warrior data:', error);
      }
    };

    fetchData();
  }, [session, router]);

  useEffect(() => {
    const fetchMacros = async () => {
      try {
        if (!warrior) return;
        const fetchedData: MealsByType = await fetchSavedMeals(
          warrior.warrior_id!,
          new Date(date),
        );
        const allFoodItems = Object.values(fetchedData).flatMap((mealType) =>
          mealType.flatMap((meal: Meal) => meal.meal_food_items),
        );

        const query: string = allFoodItems
          .map(
            (item) =>
              `${item.quantity} ${item.unit} ${item.food_item_identifier}`,
          )
          .join(', ');

        if (!query.length) return;
        const nutrients = await fetchNutrients(query);

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
            acc.protein += food.nf_protein;
            acc.carbs += food.nf_total_carbohydrate;
            acc.fats += food.nf_total_fat;
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
  }, [warrior, date]);
  const chartData = useMemo(
    () => ({
      labels: ['Calories', 'Protein', 'Carbs', 'Fats'],
      datasets: [
        {
          data: [macros.calories, macros.protein, macros.carbs, macros.fats],
          backgroundColor: ['#eab308', '#22c55e', '#6b7280', '#ef4444'],
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
        <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
          <Image src={Calender} width={24} height={24} alt='calendar' />
          <input
            type='date'
            name='date'
            value={date}
            onChange={handleDateChange}
            className='text-sm font-medium bg-transparent focus:outline-none'
          />
        </label>
      </header>

      <main>
        <h2 className='text-lg font-semibold mb-4'>Welcome Back Waleed!</h2>
        <div className='flex flex-row gap-3 justify-between flex-wrap'>
          <div className='bg-white  p-4 rounded-lg shadow flex justify-center items-center flex-wrap flex-1 '>
            <div className='w-60'>
              <DoughnutChart data={chartData} />
            </div>

            <div className='flex flex-col gap-2 justify-between min-w-fit mt-5'>
              <div className='flex flex-row bg-black rounded-3xl p-2 gap-1'>
                <Image src={Fire} width={20} height={20} alt='fire' />
                <p className='text-sm font-semibold text-yellow-500'>
                  Calories Burned
                </p>
                <p className='text-white text-sm font-semibold '>{`${macros.calories.toFixed(
                  2,
                )}kcal`}</p>
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

          <div className='flex flex-col gap-2 justify-between flex-1 min-w-fit'>
            <div className='bg-black  p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1'>
              <Image src={Barbell} width={50} height={50} alt='calender' />
              <p className='text-xl text-white font-semibold'>Log Workout</p>
            </div>
            <Link
              href={'diet'}
              className='bg-white  p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1'
            >
              <Image src={Plate} width={50} height={50} alt='calender' />
              <p className='text-xl  font-semibold'>Log Diet</p>
            </Link>
          </div>
          <div className='w-full flex flex-row justify-between mt-4 gap-4 flex-wrap'>
            <div
              aria-label='Workout of the day'
              className='bg-white px-10 py-20 rounded-lg gap-2 shadow flex justify-center items-center min-w-fit flex-1'
            >
              <p className='text-xl  font-semibold'>Placeholder</p>
            </div>
            <div
              aria-label='Market place'
              className='bg-white  rounded-lg gap-2 px-10 py-20 shadow flex justify-center items-center min-w-fit flex-1'
            >
              <p className='text-xl  font-semibold'>Trainer Marketplace</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

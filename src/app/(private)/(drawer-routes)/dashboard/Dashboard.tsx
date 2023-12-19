'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Calender from '@/assets//Dashboard/calender.svg';
import DoughnutChart from '@/components/DoughnutChart/DoughnutChart';
import Fire from '@/assets/Dashboard/fire.svg';
import Minus from '@/assets/Dashboard/minus.svg';
import Tick from '@/assets/Dashboard/tick.svg';
import Cross from '@/assets/Dashboard/cross.svg';
import Barbell from '@/assets/Dashboard/barbell.svg';
import Plate from '@/assets/Dashboard/plate.svg';

export function Dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/complete-user');
  }
  // useEffect(() => {
  //   (async () => {
  //     if (!session.data) return;
  //     else if (session.data.user.user_type === 'Waza Trainer')
  //       router.push(`/api/auth/signin`);
  //     // Create a proper work flow

  //     const res = await fetch(
  //       `http://localhost:3000/api/waza_warrior/?user_id=${session.data.user.user_id}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     if (!res.ok) {
  //       console.log('User not found:', data);
  //       router.push(`/complete-user/waza_warrior/${session.data.user.user_id}`);
  //     }
  //   })();
  // }, [session, router]);

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [200, 845, 1000], // Replace with your actual data
        backgroundColor: ['#4ade80', '#facc15', '#f87171'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='p-4 min-h-screen'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>Dashboard</p>
        <div className='border-2 rounded-lg p-3 border-black/10 flex flex-row gap-2 items-center'>
          <Image src={Calender} width={24} height={24} alt='calender' />
          <p className='text-sm font-medium'>{date}</p>
        </div>
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
                <p className='text-white text-sm font-semibold '>480kcal</p>
              </div>
              <div className='flex flex-row gap-1'>
                <div className='flex flex-row bg-green-500 rounded-3xl p-2 gap-1'>
                  <Image src={Minus} width={20} height={20} alt='minus' />
                  <p className='text-sm font-semibold text-white'>Protiens</p>
                </div>
                <p className='text-black text-sm font-semibold flex items-center'>
                  200/1200kcal
                </p>
              </div>
              <div className='flex flex-row gap-1'>
                <div className='flex flex-row bg-gray-500 rounded-3xl p-2 gap-1'>
                  <Image src={Tick} width={20} height={20} alt='tick' />
                  <p className='text-sm font-semibold text-white'>Carbs</p>
                </div>
                <p className='text-black text-sm font-semibold flex items-center'>
                  200/1200kcal
                </p>
              </div>
              <div className='flex flex-row gap-1'>
                <div className='flex flex-row bg-red-500 rounded-3xl p-2 gap-1'>
                  <Image src={Cross} width={20} height={20} alt='cross' />
                  <p className='text-sm font-semibold text-white'>Fats</p>
                </div>
                <p className='text-black text-sm font-semibold flex items-center'>
                  200/1200kcal
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 justify-between flex-1 min-w-fit'>
            <div className='bg-black  p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1'>
              <Image src={Barbell} width={50} height={50} alt='calender' />
              <p className='text-xl text-white font-semibold'>Log Workout</p>
            </div>
            <div className='bg-white  p-10 rounded-lg gap-2 shadow flex justify-center items-center flex-1'>
              <Image src={Plate} width={50} height={50} alt='calender' />
              <p className='text-xl  font-semibold'>Log Diet</p>
            </div>
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

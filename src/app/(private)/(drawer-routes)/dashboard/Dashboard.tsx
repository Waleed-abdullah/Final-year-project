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

export function Dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/complete-user');
  }
  useEffect(() => {
    (async () => {
      if (!session.data) return;
      else if (session.data.user.user_type === 'Waza Trainer')
        router.push(`/api/auth/signin`);
      // Create a proper work flow

      const res = await fetch(
        `http://localhost:3000/api/waza_warrior/?user_id=${session.data.user.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log('User not found:', data);
        router.push(`/complete-user/waza_warrior/${session.data.user.user_id}`);
      }
    })();
  }, [session, router]);
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
    <div className='container p-4 '>
      <header className='mb-4 flex flex-row justify-between'>
        <p className='text-xl font-semibold text-gray-400'>Dashboard</p>
        <div className='border-2 rounded-lg p-3 border-black/10 flex flex-row gap-2 items-center'>
          <Image src={Calender} width={24} height={24} alt='calender' />
          <p className='text-sm font-medium'>{date}</p>
        </div>
      </header>

      <main>
        <h2 className='text-lg font-semibold'>Welcome Back Waleed!</h2>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-4'>
          <section aria-label='Nutrition section'>
            <div className='bg-white  p-4 rounded-lg shadow flex justify-between items-center'>
              <div className='w-2/4 '>
                <DoughnutChart data={chartData} />
              </div>
              <div className='flex flex-col gap-2 justify-between'>
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
          </section>

          {/* <section aria-label='Log Workout' className='col-span-1'>
            <button className='w-full bg-black text-white p-4 rounded-lg shadow'>
              Log Workout
            </button>
          </section>

          <section aria-label='Log Diet' className='col-span-1'>
            <button className='w-full bg-yellow-400 text-white p-4 rounded-lg shadow'>
              Log Diet
            </button>
          </section>

          <section
            aria-label='Trainer Marketplace'
            className='md:col-span-2 lg:col-span-1'
          >
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-medium'>Trainer Marketplace</h2>
         
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}

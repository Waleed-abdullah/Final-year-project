'use client';
import { signIn } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ageIcon from '@/assets/formIcons/age.svg';
import calGoalIcon from '@/assets/formIcons/calories.svg';
import wazaLogoBlack from '@/assets/wazaLogos/Wazalogo_Black.svg';
import Image from 'next/image';

export default function CompleteWarriorProfile() {
  const router = useRouter();
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };
  const [warriorDetails, setWarriorDetails] = useState({
    user_id: user_id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setWarriorDetails((prevDetails) => ({
      ...prevDetails,
      user_id: user_id,
    }));
  }, [user_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/waza_warrior?user_id=${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log('Warrior found:', data);
        router.push(`/dashboard`);
      }
    })();
  }, [user_id, router]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/user?id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        console.log('User Not found:');
        router.push(`/completeProfile`);
      }
    })();
  }, [user_id, router]);

  const handleInputChange = (e: any) => {
    console.log(typeof e.target.value);
    const { id, value } = e.target;
    setWarriorDetails((prevDetails) => ({
      ...prevDetails,
      [id]: Number(value),
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3000/api/waza_warrior`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(warriorDetails),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('Warrior created:', data);
      router.push('/dashboard');
    } catch (err) {
      // If err is an instance of Error, use its message, otherwise use a default error message
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error creating warrior:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Image src={wazaLogoBlack} alt='wazaLogo' />
        <form onSubmit={handleSubmit} className='w-2/6 mx-auto'>
          <div className=' text-3xl font-semibold text-left mb-10'>
            Complete Profile
          </div>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={ageIcon} width={25} height={25} alt='userIcon' />
            </div>
            <input
              type='number'
              id='age'
              name='age'
              min={5}
              max={120}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Age'
              required
            />
          </div>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none'>
              <Image src={calGoalIcon} width={30} height={25} alt='userIcon' />
            </div>
            <input
              type='number'
              id='goals'
              name='goals'
              min={0}
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Caloric Goal'
              required
            />
          </div>

          <button
            type='submit'
            className='relative rounded-[100px] shadow-[0px_10px_10px_rgba(0,_0,_0,_0.05)] h-[30px] text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-4 focus:outline-none  sm:text-base md:text-lg lg:text-xl text-color-base-black font-desktop-text-bold-1 w-full text-center'
          >
            <div className='relative leading-[101%] font-medium'>Next</div>
          </button>
        </form>

        {error && (
          <p className=' text-red-600 mt-3'>
            An unexpected error occured: {error}
          </p>
        )}
      </div>
      {isSubmitting && (
        <div className='w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50'>
          <div className='flex justify-center items-center mt-[50vh]'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-yellow-400 rounded-full animate-bounce'></div>
          </div>
        </div>
      )}
    </>
  );
}

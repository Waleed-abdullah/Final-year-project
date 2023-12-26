'use client';
import { signIn } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import userIcon from '@/assets/formIcons/user.svg';
import wazaLogoBlack from '@/assets/wazaLogos/Wazalogo_Black.svg';
import Image from 'next/image';

export default function Trainer() {
  const router = useRouter();
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };
  const [trainerDetails, setTrainerDetails] = useState({
    user_id: user_id,
    hourly_rate: '',
    bio: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTrainerDetails((prevDetails) => ({
      ...prevDetails,
      user_id: user_id,
    }));
  }, [user_id]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/waza_trainer?user_id=${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (res.ok) {
        const data = await res.json();
        console.log('Trainer found:', data);
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
        router.push(`/complete-user`);
      }
    })();
  }, [user_id, router]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTrainerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Ensure hourly_rate is a number and convert it to a float
      const hourlyRate = parseFloat(trainerDetails.hourly_rate);
      if (isNaN(hourlyRate)) {
        throw new Error('Hourly rate must be a number');
      }

      const detailsToSend = {
        ...trainerDetails,
        hourly_rate: hourlyRate, // Use the parsed hourly rate
      };

      console.log('Trainer details:', detailsToSend);
      const response = await fetch(`http://localhost:3000/api/waza_trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detailsToSend),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('Trainer created:', data);
      signIn(); // Use router.navigate for Next.js 13+
    } catch (err) {
      // If err is an instance of Error, use its message, otherwise use a default error message
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error creating trainer:', errorMessage);
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
              <Image src={userIcon} alt='lockIcon' />
            </div>
            <input
              type='text'
              id='username'
              name='username'
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Username'
              required
            />
          </div>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={userIcon} alt='lockIcon' />
            </div>
            <input
              type='number'
              id='hourly_rate'
              name='hourly_rate'
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Hourly Rate'
              required
            />
          </div>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={userIcon} alt='lockIcon' />
            </div>
            <textarea
              id='bio'
              name='bio'
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Bio'
              required
            />
          </div>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={userIcon} alt='lockIcon' />
            </div>
            <input
              type='text'
              id='location'
              name='location'
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='Location'
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

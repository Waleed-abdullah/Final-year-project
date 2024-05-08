'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import userIcon from '@/assets/formIcons/user.svg';
import { UserType } from '@/types/page/auth/user';
import wazaLogoBlack from '@/assets/wazaLogos/Wazalogo_Black.svg';
import Image from 'next/image';

export default function CompleteProfilePage() {
  const router = useRouter();
  const { data: sessionData, update } = useSession();
  const [userDetails, setUserDetails] = useState({
    username: '',
    user_type: UserType.WazaWarrior,
    email: sessionData?.user.email || '',
    profile_pic: sessionData?.user.image || '',
    is_verified: sessionData?.user.is_verified || false,
    provider: sessionData?.user.provider || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Handle input changes for each field
  const handleInputChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('User details:', userDetails);
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('User created:', data);
      // update the session
      await update({
        newUser: true,
        id: data.user_id,
        type: data.user_type,
      });

      if (data.user_type === 'Waza Warrior')
        router.push(`completeProfile/wazaWarrior`);
      else if (data.user_type === 'Waza Trainer')
        router.push(`completeProfile/wazaTrainer`);
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError(err.message);
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
              <Image src={userIcon} alt='userIcon' />
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
            <select
              id='user_type'
              onChange={handleInputChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-2.5'
            >
              <option value={UserType.WazaWarrior}>Waza Warrior</option>
              <option value={UserType.WazaTrainer}>Waza Trainer</option>
            </select>
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

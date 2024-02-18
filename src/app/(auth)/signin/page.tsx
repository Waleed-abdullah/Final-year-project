'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import WazaLogo from '@/assets/wazaLogos/Wazalogo_Black.svg';
import trainingImage from '@/assets/signInPage/hero-image.png';
import mailIcon from '@/assets/formIcons/mail.svg';
import lockIcon from '@/assets/formIcons/lock.svg';
import googleIcon from '@/assets/formIcons/GoogleIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

interface SignInData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        callbackUrl: '/dashboard',
        ...formData,
      });
      if (result?.error) throw new Error();
    } catch (err: any) {
      console.error(err.message || 'An error occurred');
      setError('There was an error signing in.');
    }
  };

  const handleSignInWithGoogle = () => {
    try {
      signIn('google', { callbackUrl: '/dashboard' });
    } catch (err: any) {
      setError('There was an error signing in.');
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-center w-full min-h-screen'>
      <div className='lg:basis-1/2 px-20 w-full flex flex-col justify-center gap-[20px] text-xl text-black font-desktop-text-bold-1'>
        <div>
          <Image src={WazaLogo} alt='logo' className='' />
        </div>
        <div className='text-3xl font-semibold mb-2'>Sign In</div>
        {error.length ? (
          <div className='text-lg text-red-500'>{error}</div>
        ) : null}
        <form onSubmit={handleSubmit} className='w-full mx-auto'>
          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={mailIcon} alt='lockIcon' />
            </div>
            <input
              type='email'
              id='email'
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block focus:ring-yellow-400 focus:border-yellow-400 w-full p-2 ps-10'
              placeholder='E-mail'
              required
            />
          </div>

          <div className='relative mb-5'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none'>
              <Image src={lockIcon} alt='lockIcon' />
            </div>
            <input
              type='password'
              id='password'
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 ps-10'
              placeholder='Password'
              required
            />
          </div>

          <button
            type='submit'
            className='relative rounded-[100px] shadow-[0px_10px_10px_rgba(0,_0,_0,_0.05)] h-[50px] text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400 focus:ring-4 focus:outline-none  sm:text-base md:text-lg lg:text-xl text-color-base-black font-desktop-text-bold-1 w-full px-5 py-2.5 text-center  '
          >
            <div className='relative leading-[101%] font-semibold'>Sign In</div>
          </button>
        </form>
        <div className='my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
          <p className='mx-4 mb-0 text-center font-light'>Or</p>
        </div>
        <button
          onClick={handleSignInWithGoogle}
          className='relative rounded-[100px] shadow-[0px_10px_10px_rgba(0,_0,_0,_0.05)] box-border w-full h-[50px] overflow-hidden shrink-0  hover:bg-gray-200 focus:ring-4 focus:outline-none flex flex-row focus:ring-black justify-center items-center gap-4  py-1.5 px-5  sm:text-base md:text-lg lg:text-xl text-color-base-black font-desktop-text-bold-1 border-[1px] border-solid border-color-grey-grey-200'
        >
          <div>
            <Image src={googleIcon} alt='googleIcon' />
          </div>
          <div className='relative leading-[101%] font-semibold'>
            Sign in with Google
          </div>
        </button>

        <div className='mb-2 relative text-[20px] leading-[101%] text-black text-center font-poppins'>
          <span>Not registered yet? </span>
          <Link
            href={'/signup/warrior'}
            className='font-semibold hover:font-bold'
          >
            Create a New Account
          </Link>
        </div>
      </div>
      <div className='lg:basis-1/2 flex items-center justify-center h-full relative'>
        {/* Training Image */}
        <div className='w-full h-full'>
          <Image
            src={trainingImage}
            alt='trainingImage'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

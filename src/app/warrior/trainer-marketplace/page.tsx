// src/app/warrior/trainer-marketplace/page.tsx
'use client';
import React, { useState } from 'react';
import Filter from './components/Filter';
import TrainerList from './components/TrainerList';
import Image from 'next/image';
import Logo from '@/assets/trainer-marketplace/logo.svg';
import { useRouter } from 'next/navigation';
import { useTrainerFilter } from './context/TrainerFilterContext';
import { debounce } from 'lodash';

const TrainerMarketplace: React.FC = () => {
  const router = useRouter();
  const [specialization, setSpecialization] = useState('');
  const { setFilters } = useTrainerFilter();

  const debouncedSpecialization = debounce(
    (e) =>
      setFilters((prevFilters) => ({
        ...prevFilters,
        specialization: e,
      })),
    500,
  );
  return (
    <>
      <div className='bg-black flex flex-row items-center justify-between'>
        <div className='flex flex-row flex-start gap-2 items-center text-xl'>
          <Image src={Logo} alt='logo' width={100} height={150} />
          <p className='text-white font-bold'>
            Trainer
            <br /> Marketplace
          </p>
          <input
            type='text'
            value={specialization}
            onChange={(e) => {
              debouncedSpecialization(e.target.value);
              setSpecialization(e.target.value);
            }}
            placeholder='Skills'
            className='p-4 bg-black border border-white text-white rounded-2xl ml-4 h-8 w-96 text-sm'
          />
        </div>
        <p
          className='text-yellow-500 font-bold text-md mr-4 cursor-pointer'
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </p>
      </div>
      <div className='flex flex-row'>
        <Filter specialization={specialization} />
        <TrainerList />
      </div>
    </>
  );
};

export default TrainerMarketplace;

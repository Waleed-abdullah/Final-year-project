// src/app/warrior/trainer-marketplace/page.tsx
'use client';
import React from 'react';
import Filter from './components/Filter';
import TrainerList from './components/TrainerList';
import { TrainerFilterProvider } from './context/TrainerFilterContext'; // Import the context provider

const TrainerMarketplace: React.FC = () => {
  return (
    <TrainerFilterProvider>
      <div className='container mx-auto'>
        <Filter />
        <TrainerList />
      </div>
    </TrainerFilterProvider>
  );
};

export default TrainerMarketplace;

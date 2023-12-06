'use client';
import React, { useState } from 'react';
import Filter from './components/Filter';
import TrainerList from './components/TrainerList';
import { TrainerFilters } from '@/src/types/trainer-marketplace/trainerList';

const TrainerMarketplace: React.FC = () => {
  const [filters, setFilters] = useState<TrainerFilters>({});

  const handleFilterChange = (newFilters: TrainerFilters) => {
    console.log('New filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <div className='container mx-auto'>
      <Filter onFilterChange={handleFilterChange} />
      <TrainerList filters={filters} />
    </div>
  );
};
export default TrainerMarketplace;

'use client';

import { TrainerFilters } from '@/src/types/trainer-marketplace/trainerList';
import React, { use, useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: TrainerFilters) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [specializationQuery, setSpecializationQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [genderQuery, setGenderQuery] = useState('');
  const [hourlyRateMin, setHourlyRateMin] = useState('');
  const [hourlyRateMax, setHourlyRateMax] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [experienceMin, setExperienceMin] = useState('');
  const [experienceMax, setExperienceMax] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      specializationQuery,
      locationQuery,
      genderQuery,
      hourlyRateMin: parseInt(hourlyRateMin),
      hourlyRateMax: parseInt(hourlyRateMax),
      experienceMin: parseInt(experienceMin),
      experienceMax: parseInt(experienceMax),
      ageMin: parseInt(ageMin),
      ageMax: parseInt(ageMax),
    });
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row justify-between'>
        <p className='text-lg font-bold tracking-wide'>Filter</p>
        <p className='text-lg text-red-500 tracking-wide cursor-pointer'>
          Clear
        </p>
      </div>
      <div className='m-5' />
      <div className='flex flex-row justify-start gap-2 flex-wrap'>
        {/* Years as Trainer */}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>
            Years as Trainer
          </label>
          <div className='flex flex-row gap-1 items-center'>
            <select
              className='border rounded p-2 mt-2 w-full'
              defaultValue=''
              onChange={(e) => setExperienceMin(e.target.value)}
            >
              <option value='' disabled>
                From
              </option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className='text-4xl font-light'>-</span>
            <select
              className='border rounded p-2 mt-2 w-full'
              defaultValue=''
              onChange={(e) => setExperienceMax(e.target.value)}
            >
              <option value='' disabled>
                To
              </option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Age */}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>Age</label>
          <div className='flex flex-row gap-1 items-center'>
            <select
              className='border rounded p-2 mt-2 w-full'
              defaultValue=''
              onChange={(e) => setAgeMin(e.target.value)}
            >
              <option value='' disabled>
                From
              </option>
              {[...Array(50)].map((_, i) => (
                <option key={i} value={i + 18}>
                  {i + 18}
                </option>
              ))}
            </select>
            <span className='text-4xl font-light'>-</span>
            <select
              className='border rounded p-2 mt-2 w-full'
              defaultValue=''
              onChange={(e) => setAgeMax(e.target.value)}
            >
              <option value='' disabled>
                To
              </option>
              {[...Array(50)].map((_, i) => (
                <option key={i} value={i + 18}>
                  {i + 18}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender*/}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>Gender</label>
          <div className='flex flex-row gap-1 items-center'>
            <select
              className='border rounded p-2 mt-2 w-full'
              defaultValue=''
              onChange={(e) => setGenderQuery(e.target.value)}
            >
              <option value='' disabled>
                Select Gender
              </option>
              <option key={1} value={`Male`}>
                {`Male`}
              </option>
              <option key={2} value={`Female`}>
                {`Female`}
              </option>
            </select>
          </div>
        </div>
        {/* Location*/}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>
            Location
          </label>
          <div className='flex flex-row gap-1 items-center'>
            <input
              className='border rounded p-2 mt-2 w-full'
              type='text'
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder={`Select Trainer's Location`}
            />
          </div>
        </div>
        {/* Skills*/}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>Skills</label>
          <div className='flex flex-row gap-1 items-center'>
            <input
              className='border rounded p-2 mt-2 w-full'
              onChange={(e) => setSpecializationQuery(e.target.value)}
              type='text'
              placeholder={`Select Trainer's Skills`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

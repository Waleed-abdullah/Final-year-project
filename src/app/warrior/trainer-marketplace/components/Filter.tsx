'use client';

import React, { useState } from 'react';
import { useTrainerFilter } from '../context/TrainerFilterContext';

const Filter: React.FC = () => {
  const { setFilters } = useTrainerFilter();

  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [hourlyRateMin, setHourlyRateMin] = useState('');
  const [hourlyRateMax, setHourlyRateMax] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [experienceMin, setExperienceMin] = useState('');
  const [experienceMax, setExperienceMax] = useState('');

  const handleFilterChange = () => {
    setFilters({
      specialization,
      location,
      gender,
      hourlyRateMin: parseInt(hourlyRateMin),
      hourlyRateMax: parseInt(hourlyRateMax),
      ageMin: parseInt(ageMin),
      ageMax: parseInt(ageMax),
      experienceMin: parseInt(experienceMin),
      experienceMax: parseInt(experienceMax),
    });
  };

  const handleClearFilters = () => {
    setSpecialization('');
    setLocation('');
    setGender('');
    setHourlyRateMin('');
    setHourlyRateMax('');
    setAgeMin('');
    setAgeMax('');
    setExperienceMin('');
    setExperienceMax('');
    setFilters({});
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row justify-between'>
        <p className='text-lg font-bold tracking-wide'>Filter</p>
        <p
          className='text-lg text-red-500 tracking-wide cursor-pointer'
          onClick={handleClearFilters}
        >
          Clear
        </p>
        <p
          className='text-lg text-blue-500 tracking-wide cursor-pointer'
          onClick={handleFilterChange}
        >
          Apply
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
              onChange={(e) => setExperienceMin(e.target.value)}
              value={experienceMin}
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
              onChange={(e) => setExperienceMax(e.target.value)}
              value={experienceMax}
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
              onChange={(e) => setAgeMin(e.target.value)}
              value={ageMin}
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
              onChange={(e) => setAgeMax(e.target.value)}
              value={ageMax}
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
              onChange={(e) => setGender(e.target.value)}
              value={gender}
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
              onChange={(e) => setLocation(e.target.value)}
              placeholder={`Select Trainer's Location`}
              value={location}
            />
          </div>
        </div>
        {/* Skills*/}
        <div className='flex flex-col w-full md:w-1/3 lg:w-1/4'>
          <label className='text-sm font-semibold tracking-wide'>Skills</label>
          <div className='flex flex-row gap-1 items-center'>
            <input
              className='border rounded p-2 mt-2 w-full'
              onChange={(e) => setSpecialization(e.target.value)}
              type='text'
              placeholder={`Select Trainer's Skills`}
              value={specialization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

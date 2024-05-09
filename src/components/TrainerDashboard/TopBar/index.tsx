'use client';

import CalendarInput from '@/components/CalenderInput';
import { useState } from 'react';

export const TopBar = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <header className='mb-4 flex flex-row justify-between flex-wrap'>
      <p className='text-xl font-semibold text-gray-400'>Dashboard</p>
      <CalendarInput date={date} handleDateChange={() => null} />
    </header>
  );
};

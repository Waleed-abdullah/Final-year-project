import React, { useState, useCallback } from 'react';
import {
  Exercise,
  ExerciseLog,
} from '@/src/types/app/(private)/(drawer-routes)/workout';
import { LogCard } from './LogCard';

export const ExerciseCard = ({
  title,
  muscle_group,
  weight,
  sets,
  reps,
  exercise_id,
  exercise_log: initialExerciseLog,
}: Exercise) => {
  const [exerciseLog, setExerciseLog] =
    useState<ExerciseLog[]>(initialExerciseLog);

  const addExerciseLog = useCallback(async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/waza_warrior/exercise_log',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            exercise_id,
            weight: 1, // default value
            achieved_reps: 1, // default value
          }),
        },
      );

      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }

      const newLog = await response.json();
      setExerciseLog([...exerciseLog, newLog]);
    } catch (error) {
      console.error('Failed to add exercise log:', error);
    }
  }, [exercise_id, exerciseLog]);

  return (
    <div className='bg-white rounded-md p-4 flex flex-col gap-4 '>
      <div className='flex flex-col gap-2'>
        <label className=' py-1 px-4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'>
          {title}
        </label>

        <label className=' py-1 px-4 focus:outline-none border-2 border-black/[.15] rounded-3xl text-center'>
          {muscle_group}
        </label>
      </div>

      <div className='flex flex-col  gap-2'>
        <div className='flex flex-row  justify-between '>
          <h1>Weights</h1>
          <label className=' py-1 px-4 w-1/4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'>
            {weight}kg
          </label>
        </div>
        <div className='flex flex-row   justify-between '>
          <h1>Sets</h1>
          <label className=' py-1 px-4 w-1/4 focus:outline-none border-2 border-black/[.15] rounded-md text-center '>
            {sets}
          </label>
        </div>
        <div className='flex flex-row justify-between '>
          <h1>Reps</h1>
          <label className=' py-1 px-4 w-1/4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'>
            {reps}
          </label>
        </div>
      </div>
      <div>
        Log Card
        {exerciseLog &&
          exerciseLog.map((log) => (
            <LogCard
              key={log.log_id}
              log_id={log.log_id}
              exercise_id={log.exercise_id}
              weight={log.weight}
              achieved_reps={log.achieved_reps}
            />
          ))}
      </div>
      <button
        onClick={addExerciseLog}
        className='mt-4 border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center justify-center cursor-pointer'
      >
        Add Set
      </button>
    </div>
  );
};

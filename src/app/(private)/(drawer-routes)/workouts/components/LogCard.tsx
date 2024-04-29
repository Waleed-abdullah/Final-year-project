import React, { useState, useEffect, useCallback } from 'react';
import { ExerciseLog } from '@/types/app/(private)/(drawer-routes)/workout';
import { debounce } from 'lodash';

export const LogCard = ({
  log_id,
  exercise_id,
  weight: initialWeight,
  achieved_reps: initialAchievedReps,
}: ExerciseLog) => {
  const [formData, setFormData] = useState({
    weight: initialWeight || 0,
    achieved_reps: initialAchievedReps || 0,
  });

  // Generic input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: Number(value),
    }));
  };

  // Debounced API call function
  const updateExerciseLog = debounce(
    async (logId: string, data: { weight: number; achieved_reps: number }) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/waza_warrior/exercise_log?log_id=${logId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Optionally, handle the response data
        console.log('Exercise log updated successfully');
      } catch (error) {
        console.error('Failed to update exercise log:', error);
      }
    },
    500,
  ); // 500ms debounce time

  useEffect(() => {
    updateExerciseLog(log_id, formData);
  }, [formData, updateExerciseLog, log_id]);

  return (
    <div className='bg-white rounded-md flex flex-col gap-4 mt-4'>
      <div className='flex flex-col  gap-2'>
        <div className='flex flex-row  justify-between'>
          <h1>Weights</h1>
          <input
            name='weight'
            className=' text-center w-16 border-2 border-black/[.15] rounded-md focus:outline-none '
            value={`${formData.weight}`}
            onChange={handleInputChange}
            type='number'
          />
        </div>
        <div className='flex flex-row   justify-between '>
          <h1>Reps</h1>
          <input
            name='achieved_reps'
            className=' text-center w-16 border-2 border-black/[.15] rounded-md focus:outline-none  '
            value={`${formData.achieved_reps}`}
            onChange={handleInputChange}
            type='number'
          />
        </div>
      </div>
    </div>
  );
};

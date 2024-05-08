import React, { useState, useCallback } from 'react';
import {
  Exercise,
  ExerciseLog,
} from '@/types/app/(private)/(drawer-routes)/workout';
import { LogCard } from './LogCard';
import { useLeaderBoard } from '@/stores/leaderboard-store';
import { updateUserPoints } from '@/lib/leaderboard';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';

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
  const { leaderBoard, setLeaderBoard } = useLeaderBoard()((state) => state);
  const { warriorID } = useWarriorAndDate();

  const addExerciseLog = useCallback(async () => {
    try {
      const response = await fetch('/api/waza_warrior/exercise_log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercise_id,
          weight: 1, // default value
          achieved_reps: 1, // default value
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
      }

      const newLog = await response.json();
      setExerciseLog([...exerciseLog, newLog]);
      updateUserPoints(warriorID, leaderBoard!, setLeaderBoard, 8);
    } catch (error) {
      console.error('Failed to add exercise log:', error);
    }
  }, [exercise_id, exerciseLog, leaderBoard, setLeaderBoard, warriorID]);

  return (
    <div className='bg-white rounded-md px-12 py-3 flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className=' font-bold text-center'>{title}</p>

        <p className=' py-1 px-4 bg-black text-yellow-500 text-medium rounded-3xl text-center'>
          {muscle_group}
        </p>
      </div>

      <div className='flex flex-col  gap-2 mt-6'>
        <div className='flex flex-row  justify-between '>
          <h1>Weight</h1>
          <div className=' text-center w-16 border-2 border-black/[.15] rounded-md '>
            {`${weight} kg`}
          </div>
        </div>
        <div className='flex flex-row   justify-between '>
          <h1>Sets</h1>
          <p className=' text-center w-16 border-2 border-black/[.15] rounded-md  '>
            {sets}
          </p>
        </div>
        <div className='flex flex-row justify-between '>
          <h1>Reps</h1>
          <p className=' text-center w-16 border-2 border-black/[.15] rounded-md '>
            {reps}
          </p>
        </div>
      </div>
      <div>
        {exerciseLog &&
          exerciseLog.map((log, idx) => (
            <div key={log.log_id}>
              <p className=' text-center bg-yellow-500 mt-2 rounded-3xl'>{`Set ${
                idx + 1
              }`}</p>
              <LogCard
                log_id={log.log_id}
                exercise_id={log.exercise_id}
                weight={log.weight}
                achieved_reps={log.achieved_reps}
              />
            </div>
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

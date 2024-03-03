'use client';
import Image from 'next/image';
import Calender from '@/assets/Dashboard/calender.svg';
import ArrowDown from '@/assets/arrow-down.svg';
import Plus from '@/assets/plus.svg';
import { useWarriorAndDate } from '../../WarriorAndDateProvider';
import { useEffect, useState } from 'react';
import {
  Exercise,
  Session,
} from '@/src/types/app/(private)/(drawer-routes)/workout';
import { ExerciseCard } from './components/ExerciseCard';
import { CreateWorkout } from './components/CreateWorkout';
export default function WorkoutPage() {
  const { warriorID, date, setDate, name } = useWarriorAndDate();
  const [session, setSession] = useState<Session | null>(null);
  const [isCreateWorkoutVisible, setIsCreateWorkoutVisible] = useState(false);

  const toggleCreateWorkoutModal = () => {
    setIsCreateWorkoutVisible(!isCreateWorkoutVisible);
  };

  const closeModal = (e: any) => {
    if (e.target.id === 'modal-overlay') {
      setIsCreateWorkoutVisible(false);
    }
  };
  useEffect(() => {
    const fetchSession = async (warrior_id: string, date: string) => {
      const res = await fetch(
        'http://localhost:3000/api/waza_warrior/session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            warrior_id,
            date,
          }),
        },
      );
      const session = await res.json();
      setSession(session);
      console.log(session);
    };
    if (warriorID.length) fetchSession(warriorID, date);
  }, [warriorID, date]);

  const handleAddExercise = (newExercise: Exercise) => {
    if (session) {
      // Assuming 'session.exercise' is an array of exercises
      const updatedSession = {
        ...session,
        exercise: [...session.exercise, newExercise],
      };
      setSession(updatedSession);
      console.log(
        '==========================updatedSession==========================',
      );
      console.log(updatedSession);
    }
    setIsCreateWorkoutVisible(false); // Close the modal after adding the exercise
  };

  return (
    <div className='p-4'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>My Workouts</p>
        <div className='flex flex-row gap-2'>
          <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
            <Image src={Calender} width={24} height={24} alt='calendar' />
            <input
              type='date'
              name='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='text-sm font-medium bg-transparent focus:outline-none'
            />
          </label>
          <label className='border-2 rounded-3xl py-1 px-4 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
            <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
            <p>{name}</p>
            <Image src={Calender} width={24} height={24} alt='calendar' />
          </label>
        </div>
      </header>
      <main className='mt-10'>
        <div className='flex flex-row gap-4'>
          <h1 className='text-xl font-bold '>Log Workout</h1>
          <button className='border-2 rounded-3xl py-1 px-4 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
            <p>Select Template</p>
            <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
          </button>
          <button
            className=' py-1 px-4 bg-yellow-500 flex flex-row gap-2 items-center cursor-pointer'
            onClick={toggleCreateWorkoutModal}
          >
            <Image src={Plus} width={24} height={24} alt='arrow-down' />
            <p>Create Template</p>
          </button>
        </div>
        {isCreateWorkoutVisible && (
          <div
            id='modal-overlay'
            className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
            onClick={closeModal}
          >
            {session && (
              <CreateWorkout
                session_id={session.session_id}
                onExerciseCreated={handleAddExercise}
              />
            )}
          </div>
        )}
        <div className='flex flex-row'>
          {session &&
            session.exercise.map((exercise) => (
              <ExerciseCard
                key={exercise.exercise_id}
                title={exercise.title}
                muscle_group={exercise.muscle_group}
                weight={exercise.weight}
                sets={exercise.sets}
                reps={exercise.reps}
                exercise_id={exercise.exercise_id}
                exercise_log={exercise.exercise_log}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

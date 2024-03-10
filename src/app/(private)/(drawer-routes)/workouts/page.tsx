'use client';
import Image from 'next/image';
import Calender from '@/assets/Dashboard/calender.svg';
import ArrowDown from '@/assets/workouts/arrow-down.svg';
import Plus from '@/assets/workouts/plus.svg';
import { useEffect, useState } from 'react';
import { useWarriorAndDate } from '../../WarriorAndDateProvider';
import {
  Exercise,
  Session,
  Template,
} from '@/src/types/app/(private)/(drawer-routes)/workout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ExerciseCard } from './components/ExerciseCard';
import { CreateWorkout } from './components/CreateWorkout';
import { set, template } from 'lodash';
import { DialogClose } from '@radix-ui/react-dialog';
import { CreateTemplate } from './components/CreateTemplate';

export default function WorkoutPage() {
  const { warriorID, date, setDate, name } = useWarriorAndDate();
  const [session, setSession] = useState<Session | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/waza_warrior/template?warrior_id=${warriorID}`,
        );
        const data = await res.json();
        console.log('===========data===========');
        console.log(data);
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    if (warriorID) {
      fetchTemplates();
    }
  }, [warriorID]);

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
      const updatedSession = {
        ...session,
        exercise: [...session.exercise, newExercise],
      };
      console.log('===========updatedSession===========');
      console.log(updatedSession);
      setSession(updatedSession);
    }
  };

  const updateSession = async (sessionID: string, templateID: string) => {
    const res = await fetch(
      `http://localhost:3000/api/waza_warrior/session?session_id=${sessionID}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: templateID,
        }),
      },
    );

    const updatedSession = await res.json();
    setSession(updatedSession);
  };

  return (
    <div className='p-4'>
      <header className='mb-4 flex flex-row justify-between flex-wrap'>
        <p className='text-xl font-semibold text-gray-400'>My Workouts</p>
        <div className='flex flex-row gap-2'>
          <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
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
            <p>{name}</p>
            <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
          </label>
        </div>
      </header>
      <main className='mt-10'>
        <div className='flex flex-row gap-4'>
          <h1 className='text-2xl font-bold '>Log Workout</h1>
          <Dialog>
            <DialogTrigger className='border-2 rounded-3xl py-2 px-6 border-black/10 flex flex-row gap-2 items-center cursor-pointer'>
              <p className='font-medium'>Select Template</p>
              <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Templates</DialogTitle>
              </DialogHeader>
              <ul className='overflow-y-auto max-h-60'>
                {templates.map((template) => (
                  <li key={template.template_id}>
                    <DialogClose
                      className='p-2 cursor-pointer hover:bg-gray-100'
                      onClick={() =>
                        session &&
                        updateSession(session.session_id, template.template_id)
                      }
                    >
                      {template.title}
                    </DialogClose>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className=' py-2 px-6 bg-yellow-500 rounded-3xl flex flex-row gap-2 items-center cursor-pointer'>
              <p>Create Template</p>
              <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Template</DialogTitle>
              </DialogHeader>
              {session && <CreateTemplate session_id={session.session_id} />}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className=' py-2 px-6 bg-yellow-500 rounded-3xl flex flex-row gap-2 items-center cursor-pointer'>
              <p>Create Exercise</p>
              <Image src={ArrowDown} width={24} height={24} alt='arrow-down' />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Exercise</DialogTitle>
              </DialogHeader>
              {session && (
                <CreateWorkout
                  session_id={session.session_id}
                  onExerciseCreated={handleAddExercise}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex flex-row justify-around mt-6 flex-wrap '>
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

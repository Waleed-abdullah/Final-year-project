'use client';
import React, { useState, useEffect } from 'react';
import { fetchTrainer } from '../services/trainerService';
import { useParams } from 'next/navigation';
import { DetailedTrainer } from '../types/';
import Image from 'next/image';

const TrainerMarketplace: React.FC = () => {
  const [trainer, setTrainer] = useState<DetailedTrainer | null>(null);
  const [error, setError] = useState(null);
  const { user_id } = useParams<{ user_id: string }>() || { user_id: '' };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrainer(user_id);
        console.log(data);
        setTrainer(data);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, [user_id]); // user_id is now consistently a string

  return (
    <div className='container mx-auto px-40 py-14'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Waza Fitness</h1>
      </div>

      <div className='flex flex-row-reverse flex-wrap justify-between mt-14'>
        <div className='w-48 h-48 rounded-full overflow-hidden bg-black ml-6'>
          <Image
            src={trainer?.users.profile_pic || ''}
            width={200}
            height={200}
            alt={`${trainer?.users.name} profile`}
          />
        </div>
        <div className='grow'>
          <div className='text-3xl font-bold'>{trainer?.users.name}</div>
          <div className='flex flex-col items-start mt-4'>
            {trainer?.trainer_specializations.map((specialization, index) => (
              <div key={index} className='text-lg'>
                • {specialization.specializations.specialization_name}
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center mt-8 flex-wrap'>
            <div>
              <p>Experience</p>
              <p>{trainer?.experience} Years</p>
            </div>
            <div>
              <p>Location</p>
              <p>{trainer?.location}</p>
            </div>
            <div>
              <p>Hourly Rate</p>
              <p>${trainer?.hourly_rate}</p>
            </div>
          </div>
        </div>
      </div>
      <blockquote className='mt-14 p-4 italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote'>
        <p className='mb-2'>{trainer?.bio}</p>
      </blockquote>
    </div>
  );
};

export default TrainerMarketplace;

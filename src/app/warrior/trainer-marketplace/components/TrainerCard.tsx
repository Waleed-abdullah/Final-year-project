// src/app/warrior/trainer-marketplace/components/T
import {
  TrainerSpecialization,
  Trainer,
} from '@/src/app/warrior/trainer-marketplace/types';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TrainerCard: React.FC<Trainer> = ({
  hourly_rate,
  bio,
  location,
  experience,
  users,
  trainer_specializations,
}) => {
  const router = useRouter();
  return (
    <div
      className='border rounded p-4 shadow-md flex flex-col items-center'
      onClick={() =>
        router.push(`/warrior/trainer-marketplace/${users.user_id}`)
      }
    >
      <img
        src={users.profile_pic}
        alt={users.name}
        className='w-24 h-24 rounded-full border-2 border-gray-300 -mt-12 mb-4'
      />
      <div className='font-bold'>{users.name}</div>
      <div>{location}</div>
      <div>
        {trainer_specializations
          .map(
            (ts: TrainerSpecialization) =>
              ts.specializations.specialization_name,
          )
          .join(', ')}
      </div>
      <div>{experience} years experience</div>
      <div>${hourly_rate}/hr</div>
      <div>{bio}</div>
    </div>
  );
};

export default TrainerCard;

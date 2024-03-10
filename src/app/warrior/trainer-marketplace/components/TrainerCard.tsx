// src/app/warrior/trainer-marketplace/components/T
import {
  TrainerSpecialization,
  Trainer,
} from '@/src/app/warrior/trainer-marketplace/types';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Location from '@/assets/trainer-marketplace/location.svg';
import Experience from '@/assets/trainer-marketplace/experience.svg';

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
      className='p-4 shadow-md flex flex-row grow mt-2 cursor-pointer max-h-60'
      onClick={() =>
        router.push(`/warrior/trainer-marketplace/${users.user_id}`)
      }
    >
      <Image
        src={users.profile_pic || ''}
        alt={users.name}
        width={200}
        height={200}
      />
      <div className='grow flex flex-col flex-start gap-2 ml-6'>
        <p className='font-bold'>{users.name}</p>
        <div className='flex flex-row flex-start gap-2'>
          {trainer_specializations.map((ts, idx) => (
            <div key={idx} className='bg-yellow-500 p-2 rounded-sm'>
              <p className='text-sm text-white font-semibold'>
                {ts.specializations.specialization_name}
              </p>
            </div>
          ))}
        </div>
        <p className='italic text-neutral-500'>{bio}</p>
        <div className='flex flex-row flex-start gap-2 items-center'>
          <Image src={Location} alt='location' width={20} height={20} />
          <p className='font-light'>{location}</p>
        </div>
        <div className='flex flex-row flex-start gap-2 items-center'>
          <Image src={Experience} alt='location' width={20} height={20} />
          <p>{experience} years</p>
        </div>
      </div>
      <p className='font-bold'>${hourly_rate}/hr</p>
    </div>
  );
};

export default TrainerCard;

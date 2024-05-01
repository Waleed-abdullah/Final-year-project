"use client";
import Image from 'next/image';
import SettingsSvg from '@/assets/UserMenu/settings.svg';

export const Settings = () => {
  return (
    <button className='rounded-full focus:ring-4 focus:ring-yellow-400 transition-all duration-500'>
      <Image
        className='cursor-pointer'
        src={SettingsSvg}
        alt='Settings Icon'
        width={30}
        height={30}
      />
    </button>
  );
};

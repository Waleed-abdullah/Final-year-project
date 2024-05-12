'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { HomeIcon } from '@/icons/home';
import { DumbbellIcon } from '@/icons/dumbbell';
import { AppleIcon } from '@/icons/apple';
import { EarthIcon } from 'lucide-react';

export const WarriorRoutes = () => {
  const path = usePathname();
  const isActive = (href: string) => path === href;
  return (
    <nav className='text-white'>
      <ul className='flex flex-col gap-2'>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/dashboard'),
            'text-white': !isActive('/dashboard'),
          })}
        >
          <HomeIcon className='h-5 w-5' />
          <Link href={'/dashboard'} className={`ml-2 `}>
            Dashboard
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/workouts'),
            'text-white': !isActive('/workouts'),
          })}
        >
          <DumbbellIcon className='h-5 w-5' />
          <Link href={'/workouts'} className={`ml-2 `}>
            My Workouts
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/diet'),
            'text-white': !isActive('/diet'),
          })}
        >
          <AppleIcon />
          <Link href={'/diet'} className={`ml-2 `}>
            My Diet
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/chat'),
            'text-white': !isActive('/chat'),
          })}
        >
          <EarthIcon className='h-5 w-5' />
          <Link href={'/chat'} className={`ml-2 `}>
            Messages
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/community'),
            'text-white': !isActive('/community'),
          })}
        >
          <EarthIcon className='h-5 w-5' />
          <Link href={'/community'} className={`ml-2 `}>
            Community
          </Link>
        </li>
      </ul>
    </nav>
  );
};

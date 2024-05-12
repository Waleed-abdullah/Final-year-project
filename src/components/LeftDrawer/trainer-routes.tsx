'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MailIcon } from '@/icons/mail';
import { cn } from '@/utils/cn';
import { UserIcon } from '@/icons/user';
import { BookMarkedIcon } from '@/icons/book-marked';
import { HomeIcon } from '@/icons/home';

export const TrainerRoutes = () => {
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
            'text-yellow-400': path?.includes('/chat'),
            'text-white': !isActive('/chat'),
          })}
        >
          <MailIcon className={cn('h-5 w-5')} />
          <Link href={'/chat'} className={`ml-2 `}>
            Messages
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': path?.includes('/clients'),
            'text-white': !isActive('/clients'),
          })}
        >
          <UserIcon className='h-5 w-5' />
          <Link href={'/clients'} className={`ml-2 `}>
            Clients
          </Link>
        </li>
        <li
          className={cn('flex items-center mb-4', {
            'text-yellow-400': isActive('/training'),
            'text-white': !isActive('/training'),
          })}
        >
          <BookMarkedIcon className='h-5 w-5' />
          <Link href={'/courses'} className={`ml-2 `}>
            Courses
          </Link>
        </li>
      </ul>
    </nav>
  );
};

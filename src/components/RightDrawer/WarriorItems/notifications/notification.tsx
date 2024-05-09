'use client';
import Image from 'next/image';
import Bell from '@/assets/UserMenu/bell.svg';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { NotificationDialog } from './notification-dialog';
import { useFriendRequests } from '@/stores/friend-request-store';

export const Notification: React.FC = () => {
  const friendRequests = useFriendRequests()((state) => state.friendRequests);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='relative rounded-full focus:ring-4 focus:ring-yellow-400 transition-all duration-500'>
          <Image
            className='cursor-pointer'
            src={Bell}
            alt='Settings Icon'
            width={30}
            height={30}
          />
          {friendRequests.length > 0 && (
            <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-center text-xs flex items-center justify-center'>
              {friendRequests.length}
            </div>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className=' focus:ring-2 ring-offset-0 focus:ring-yellow-500'>
        <NotificationDialog />
      </DialogContent>
    </Dialog>
  );
};

'use client';
import Image from 'next/image';
import SettingsSvg from '@/assets/UserMenu/settings.svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useLeaderBoard } from '@/stores/leaderboard-store';
import { Textarea } from '@/components/ui/textarea';

export const TrainerSettings = () => {
  const { warriorProfilePic, setWarriorProfilePic } = useWarriorAndDate();
  const { data: session } = useSession();

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [imageSource, setImageSource] = useState<string>(
    warriorProfilePic || '',
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profilePic = (
      e.currentTarget.elements.namedItem('profilePic') as HTMLInputElement
    ).value;
    const bio = (e.currentTarget.elements.namedItem('bio') as HTMLInputElement)
      .value;
    const hourlyRate = (
      e.currentTarget.elements.namedItem('hourlyRate') as HTMLInputElement
    ).value;

    if (!profilePic && !bio && !hourlyRate) setIsEmpty(true);
    setIsEmpty(false);

    //TODOL: Update warrior profile on the backend
    if (profilePic) {
      setWarriorProfilePic(profilePic);
    }

    try {
      await fetch('/api/trainer/update-info', {
        method: 'PATCH',
        body: JSON.stringify({
          profilePic,
          bio,
          hourlyRate,
          userId: session?.user?.user_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Profile updated successfully', { autoClose: 3000 });
    } catch (e) {
      toast.error('Failed to update profile', { autoClose: 3000 });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='rounded-full focus:ring-4 focus:ring-yellow-400 transition-all duration-500'>
          <Image
            className='cursor-pointer'
            src={SettingsSvg}
            alt='Settings Icon'
            width={30}
            height={30}
          />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
        {isEmpty && (
          <span className='text-red-600'>At least one field is required</span>
        )}
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-8 items-center gap-4'>
              <Avatar>
                <AvatarImage src={imageSource || warriorProfilePic || ''} />
                <AvatarFallback>PW</AvatarFallback>
              </Avatar>
              <Label htmlFor='name' className='text-right whitespace-normal'>
                Profile Pic
              </Label>
              <Input
                id='profilePic'
                placeholder='A sensei must look good (need image url)'
                className='col-span-6'
                onChange={(e) => setImageSource(e.target.value)}
                type='text'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='bio' className=' whitespace-nowrap  text-right'>
                Bio
              </Label>
              <Textarea
                id='bio'
                placeholder='A sensei must describe himself well'
                className='col-span-3 h-[200px] resize-none'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Hourly Rate $
              </Label>
              <Input
                id='hourlyRate'
                placeholder={'A sensei must be able to afford'}
                className='col-span-3'
                type='number'
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type='submit'
              className='border bg-yellow-300 hover:bg-yellow-400 rounded-md flex font-semibold outline-none focus:ring-4 focus:ring-yellow-200 items-center justify-center p-2'
            >
              Save changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

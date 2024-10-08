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

export const WarriorSettings = () => {
  const {
    warriorID,
    warriorProfilePic,
    caloricGoal,
    weightGoal,
    setWarriorProfilePic,
    setCaloricGoal,
    setWeightGoal,
  } = useWarriorAndDate();
  const { data: session } = useSession();

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [imageSource, setImageSource] = useState<string>(
    warriorProfilePic || '',
  );

  const { leaderBoard, setLeaderBoard } = useLeaderBoard()((state) => state);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profilePic = (
      e.currentTarget.elements.namedItem('profilePic') as HTMLInputElement
    ).value;
    const weightGoal = (
      e.currentTarget.elements.namedItem('weightGoal') as HTMLInputElement
    ).value;
    const caloricGoal = (
      e.currentTarget.elements.namedItem('caloricGoal') as HTMLInputElement
    ).value;

    if (!profilePic && !weightGoal && !caloricGoal) setIsEmpty(true);
    setIsEmpty(false);

    //TODOL: Update warrior profile on the backend
    if (profilePic) {
      setWarriorProfilePic(profilePic);

      // find the current user in the leaderboard and update the pic
      const updatedLeaderBoard = leaderBoard.map((user) => {
        if (user.warrior_id === warriorID) {
          return {
            ...user,
            profile_pic: profilePic,
          };
        }
        return user;
      });
      setLeaderBoard(updatedLeaderBoard);
    }
    if (weightGoal) {
      setWeightGoal(parseFloat(weightGoal));
    }
    if (caloricGoal) {
      setCaloricGoal(parseInt(caloricGoal));
    }

    console.log(profilePic);
    try {
      await fetch('/api/warrior/update-info', {
        method: 'PATCH',
        body: JSON.stringify({
          profilePic,
          weightGoal,
          caloricGoal,
          warriorId: warriorID,
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
              <Label
                htmlFor='profilePic'
                className='text-right whitespace-normal'
              >
                Profile Pic
              </Label>
              <Input
                id='profilePic'
                placeholder='A warrior must look good (need image url)'
                className='col-span-6'
                onChange={(e) => setImageSource(e.target.value)}
                type='text'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label
                htmlFor='weightGoal'
                className=' whitespace-nowrap  text-right'
              >
                Weight Goal (kg)
              </Label>
              <Input
                id='weightGoal'
                placeholder={
                  weightGoal !== null
                    ? weightGoal.toString()
                    : 'A warrior must find the correct weight goal'
                }
                className='col-span-3'
                type='number'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='caloricGoal' className='text-right'>
                Caloric Goal
              </Label>
              <Input
                id='caloricGoal'
                placeholder={
                  caloricGoal !== null
                    ? caloricGoal.toString()
                    : 'A warrior must eat right'
                }
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

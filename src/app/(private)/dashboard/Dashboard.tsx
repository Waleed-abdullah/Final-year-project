'use client';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useScreenWidth } from '../../ScreenWidthProvider';

export function Dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session.data && session.data.user.isNewUser) {
    redirect('/complete-user');
  }
  useEffect(() => {
    (async () => {
      let route_type = '';
      if (!session.data) return;
      else if (session.data.user.user_type === 'Waza Trainer')
        route_type = 'waza_trainer';
      else if (session.data.user.user_type === 'Waza Warrior')
        route_type = 'waza_warrior';
      else return;
      const res = await fetch(
        `http://localhost:3000/api/${route_type}/?user_id=${session.data.user.user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!res.ok) {
        const data = await res.json();
        console.log('User not found:', data);
        router.push(
          `/complete-user/${route_type}/${session.data.user.user_id}`,
        );
      }
    })();
  }, [session, router]);

  const { screenWidth } = useScreenWidth();
  const isLargeScreen = screenWidth >= 1024;
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(isLargeScreen);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(isLargeScreen);

  useEffect(() => {
    setIsLeftDrawerOpen(isLargeScreen);
    setIsRightDrawerOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <div className='flex h-screen'>
      {/* Left Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black p-4 transition-transform duration-300 ease-in-out ${
          isLeftDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {!isLargeScreen && (
          <button
            onClick={() => setIsLeftDrawerOpen(!isLeftDrawerOpen)}
            className='lg:hidden'
          >
            Toggle Left Drawer
          </button>
        )}
        {/* Drawer content */}
      </div>

      {/* Center Content */}
      <div
        className={`flex-1 p-4 bg-gray-200 transition-all duration-300 ease-in-out ${
          isLeftDrawerOpen ? 'lg:ml-64' : 'lg:ml-0'
        } ${isRightDrawerOpen ? 'lg:mr-64' : 'lg:mr-0'}`}
      >
        {/* Your main content goes here */}
        {!isLargeScreen && (
          <>
            <button
              onClick={() => setIsLeftDrawerOpen(!isLeftDrawerOpen)}
              className='lg:hidden'
            >
              Toggle Left Drawer
            </button>
            <button
              onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
              className='lg:hidden'
            >
              Toggle Right Drawer
            </button>
          </>
        )}
      </div>

      {/* Right Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-64 bg-white p-4 transition-transform duration-300 ease-in-out ${
          isRightDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:block`}
      >
        {!isLargeScreen && (
          <button
            onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
            className='lg:hidden'
          >
            Toggle Right Drawer
          </button>
        )}
        {/* Drawer content */}
      </div>
    </div>
  );
}

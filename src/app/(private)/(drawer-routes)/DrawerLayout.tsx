'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '@/assets/Dashboard/waza_logo.svg';
import Home from '@/assets/Dashboard/home.svg';
import HomeYellow from '@/assets/Dashboard/home_yellow.svg';
import Barbell from '@/assets/Dashboard/barbell.svg';
import BarbellYellow from '@/assets/Dashboard/barbell_yellow.svg';
import Apple from '@/assets/Dashboard/apple.svg';
import AppleYellow from '@/assets/Dashboard/apple_yellow.svg';
import Bicep from '@/assets/Dashboard/bicep.svg';
import BicepYellow from '@/assets/Dashboard/bicep_yellow.svg';
import World from '@/assets/Dashboard/world.svg';
import WorldYellow from '@/assets/Dashboard/world_yellow.svg';
import Image from 'next/image';
import { useScreenWidth } from '../../ScreenWidthProvider';
import Link from 'next/link';

export function DrawerLayout({ children }: { children: React.ReactNode }) {
  // const { screenWidth } = useScreenWidth();
  // const isLargeScreen = screenWidth >= 1024;
  // const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(isLargeScreen);
  // const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(isLargeScreen);

  // useEffect(() => {
  //   setIsLeftDrawerOpen(isLargeScreen);
  //   setIsRightDrawerOpen(isLargeScreen);
  // }, [isLargeScreen]);
  const path = usePathname();
  const isActive = (href: string) => path === href;

  return (
    <div className='flex'>
      {/* Left Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black p-4 transition-transform duration-300 ease-in-out translate-x-0`} //  ${ isLeftDrawerOpen ? 'translate-x-0' : '-translate-x-full' }
      >
        {/* <button onClick={() => setIsLeftDrawerOpen(!isLeftDrawerOpen)}>
          Toggle Left Drawer
        </button> */}
        {/* Logo */}
        <div className='mb-8'>
          <Image src={Logo} alt='Waza Logo' />
        </div>

        {/* Drawer content */}
        <nav className='text-white'>
          <ul>
            <li
              className={`flex items-center mb-4 ${
                isActive('/dashboard') ? 'text-yellow-500' : 'text-white'
              }`}
            >
              {!isActive('/dashboard') ? (
                <Image src={Home} alt='Diet Icon' width={20} height={20} />
              ) : (
                <Image
                  src={HomeYellow}
                  alt='Diet Icon'
                  width={20}
                  height={20}
                />
              )}
              <Link href={'dashboard'} className={`ml-2 `}>
                Dashboard
              </Link>
            </li>
            <li
              className={`flex items-center mb-4 ${
                isActive('/workouts') ? 'text-yellow-500' : 'text-white'
              }`}
            >
              {!isActive('/workouts') ? (
                <Image src={Barbell} alt='Diet Icon' width={20} height={20} />
              ) : (
                <Image
                  src={BarbellYellow}
                  alt='Diet Icon'
                  width={20}
                  height={20}
                />
              )}
              <Link href={'workouts'} className={`ml-2 `}>
                My Workouts
              </Link>
            </li>
            <li
              className={`flex items-center mb-4 ${
                isActive('/diet') ? 'text-yellow-500' : 'text-white'
              }`}
            >
              {!isActive('/diet') ? (
                <Image src={Apple} alt='Diet Icon' width={20} height={20} />
              ) : (
                <Image
                  src={AppleYellow}
                  alt='Diet Icon'
                  width={20}
                  height={20}
                />
              )}
              <Link href={'diet'} className={`ml-2 `}>
                My Diet
              </Link>
            </li>
            <li
              className={`flex items-center mb-4 ${
                isActive('/training') ? 'text-yellow-500' : 'text-white'
              }`}
            >
              {!isActive('/training') ? (
                <Image src={Bicep} alt='Diet Icon' width={20} height={20} />
              ) : (
                <Image
                  src={BicepYellow}
                  alt='Diet Icon'
                  width={20}
                  height={20}
                />
              )}
              <Link href={'training'} className={`ml-2 `}>
                Training
              </Link>
            </li>
            <li
              className={`flex items-center mb-4 ${
                isActive('/community')
                  ? 'text-yellow-500 fill-current'
                  : 'text-white'
              }`}
            >
              {!isActive('/community') ? (
                <Image src={World} alt='Diet Icon' width={20} height={20} />
              ) : (
                <Image
                  src={WorldYellow}
                  alt='Diet Icon'
                  width={20}
                  height={20}
                />
              )}
              <Link href={'community'} className={`ml-2 `}>
                Community
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Center Content */}
      <div
        className={`flex-1 bg-gray-200 transition-all duration-300 ease-in-out  min-h-screen ml-64 mr-64 `} /* 
        ${
          isLeftDrawerOpen ? 'lg:ml-64' : 'lg:ml-0'
        } ${isRightDrawerOpen ? 'lg:mr-64' : 'lg:mr-0'} */
      >
        {/* Your main content goes here */}

        {/* <>
          <button onClick={() => setIsLeftDrawerOpen(!isLeftDrawerOpen)}>
            Toggle Left Drawer
          </button>
          <button onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}>
            Toggle Right Drawer
          </button>
        </> */}

        {children}
      </div>

      {/* Right Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-64 bg-white p-4 transition-transform duration-300 ease-in-out lg:block translate-x-0`} //${isRightDrawerOpen ? 'translate-x-0' : 'translate-x-full' }
      >
        {/* <button onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}>
          Toggle Right Drawer
        </button> */}

        {/* Drawer content */}
      </div>
    </div>
  );
}

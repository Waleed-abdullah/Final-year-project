'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
import Link from 'next/link';

const LeftDrawer: React.FC = () => {
  const path = usePathname();
  const isActive = (href: string) => path === href;

  return (
    <div>
      <div className='mb-8'>
        <Image src={Logo} alt='Waza Logo' />
      </div>
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
              <Image src={HomeYellow} alt='Diet Icon' width={20} height={20} />
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
              <Image src={AppleYellow} alt='Diet Icon' width={20} height={20} />
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
              <Image src={BicepYellow} alt='Diet Icon' width={20} height={20} />
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
              <Image src={WorldYellow} alt='Diet Icon' width={20} height={20} />
            )}
            <Link href={'community'} className={`ml-2 `}>
              Community
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftDrawer;

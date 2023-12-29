import Link from 'next/link';
import Image from 'next/image';
import wazaLogo from '@/assets/wazaLogos/WazaLogo_yello_white.svg';

export default function LandingPage() {
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-center'>
      <div className='text-white'>
        <div className='flex justify-center mb-8'>
          <Image src={wazaLogo} alt='Logo' />
        </div>
        <div className='flex justify-center'>
          <Link href='/signin'>
            <button
              type='button'
              className='text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900'
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

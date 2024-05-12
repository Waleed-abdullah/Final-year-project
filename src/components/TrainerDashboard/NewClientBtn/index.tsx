import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export const NewClientBtn = () => {
  return (
    <Link
      href={'chat/requests'}
      className='w-[200px] h-[50px] rounded-[100px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-500  text-black flex gap-2 items-center justify-center'
    >
      <PlusIcon className='w-6 h-6' />
      <span className='text-xl font-semibold'>Add New Client</span>
    </Link>
  );
};

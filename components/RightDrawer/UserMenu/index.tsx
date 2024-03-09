import Settings from '@/assets/UserMenu/settings.svg';
import Bell from '@/assets/UserMenu/bell.svg';

import Image from 'next/image';
import Avatar from '@/components/Avatar';

const UserMenu: React.FC = () => {
  return (
    <div className='w-full m-2 flex flex-row justify-end items-center p-2 gap-3 border border-gray-300 rounded-full'>
      <Image
        className='cursor-pointer'
        src={Settings}
        alt='Settings Icon'
        width={30}
        height={30}
      />
      <Image
        className='cursor-pointer'
        src={Bell}
        alt='Notification Icon'
        width={30}
        height={30}
      />
      <div className='w-100 font-bold overflow-hidden whitespace-nowrap'>
        Waleed
      </div>
      <div>
        <Avatar src='https://picsum.photos/id/237/200/300' />
      </div>
    </div>
  );
};

export default UserMenu;

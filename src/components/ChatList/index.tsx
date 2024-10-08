'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/assets/chats/search.svg';

interface ChatListProp {
  chatPartners: {
    chat_id: string;
    user_id: string;
    username: string;
    profile_pic: string | null;
    name: string | null;
  }[];
}

const ChatList: React.FC<ChatListProp> = ({ chatPartners }) => {
  const path = usePathname();
  const isActive = (href: string) => path === href;

  return (
    <div className='flex flex-col gap-4'>
      <label className='border-2 rounded-3xl py-1 px-10 border-black/10 flex flex-row gap-2 items-center '>
        <Image src={Search} width={24} height={24} alt='calendar' />
        <input
          type='input'
          name='input'
          className='text-sm font-medium bg-transparent focus:outline-none'
          placeholder='Search'
        />
      </label>
      <nav className='text-black'>
        <ul className='flex flex-col gap-4'>
          {chatPartners.map((partner) => (
            <>
              <li className={`flex items-center `} key={partner.chat_id}>
                <Image
                  src={partner.profile_pic || 'https://robohash.org/123'}
                  alt='Profile Pic'
                  width={30}
                  height={30}
                />

                <Link href={`/chat/${partner.chat_id}`} className={`ml-2 `}>
                  {partner.name || partner.username}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ChatList;

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import prisma from '@/lib/database/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const page: FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const chatList = await prisma.chat_list.findMany({
    where: {
      OR: [
        { user_id_2: session.user.user_id, status: 'accepted' },
        { user_id_1: session.user.user_id, status: 'accepted' },
      ],
    },
    select: {
      chat_list_id: true,
      user_id_1: true,
      user_id_2: true,
    },
  });

  const chatPartnerIds = chatList.map((chat) =>
    session.user.user_id === chat.user_id_1 ? chat.user_id_2 : chat.user_id_1,
  );

  const chatPartners = await prisma.users.findMany({
    where: {
      user_id: {
        in: chatPartnerIds,
      },
    },
    select: {
      user_id: true,
      username: true,
      profile_pic: true,
      name: true,
    },
  });

  return (
    <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
      {chatList.map((chat) => {
        return (
          <li key={chat.chat_list_id}>
            <Link
              href={`/chat/${chat.chat_list_id}`}
              className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            >
              <img
                src={
                  chatPartners.find(
                    (partner) => partner.user_id === chat.user_id_1,
                  )?.profile_pic || 'https://www.gravatar.com/avatar/'
                }
                alt=''
                className='w-8 h-8 rounded-full'
              />
              <span>
                {
                  chatPartners.find(
                    (partner) => partner.user_id === chat.user_id_1,
                  )?.name
                }
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default page;

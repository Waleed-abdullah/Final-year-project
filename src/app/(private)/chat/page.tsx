import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import prisma from '@/src/lib/database/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const page: FC = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const list = await prisma.chat_list.findMany({
    where: {
      OR: [
        { user_id_2: session.user.user_id, status: 'accepted' },
        { user_id_1: session.user.user_id, status: 'accepted' },
      ],
    },
    select: {
      user_id_1: true,
      user_id_2: true,
    },
  });

  const chatList = await prisma.users.findMany({
    where: {
      user_id: {
        in: list.map((item) =>
          session.user.user_id === item.user_id_1
            ? item.user_id_2
            : item.user_id_1,
        ),
      },
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      profile_pic: true,
    },
  });

  return (
    <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
      {chatList.sort().map((chat) => {
        return (
          <li key={chat.user_id}>
            <Link
              href={`/chat/${session.user.user_id}--${chat.user_id}`}
              className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            >
              {chat.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default page;

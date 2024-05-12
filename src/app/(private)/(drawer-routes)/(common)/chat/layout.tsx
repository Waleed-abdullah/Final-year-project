import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { notFound } from 'next/navigation';
import ChatList from '@/components/ChatList';
import prisma from '@/lib/database/prisma';

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const chatList = await prisma.chat_list.findMany({
    where: {
      OR: [
        { user_id_2: session.user.user_id, status: 'accepted' },
        { user_id_1: session.user.user_id, status: 'accepted' },
      ],
    },

    include: {
      users_chat_list_user_id_2Tousers: {
        select: {
          user_id: true,
          username: true,
          profile_pic: true,
          name: true,
        },
      },
      users_chat_list_user_id_1Tousers: {
        select: {
          user_id: true,
          username: true,
          profile_pic: true,
          name: true,
        },
      },
    },
  });

  const chatPartners = chatList.map((chat) => {
    if (chat.user_id_1 === session.user.user_id) {
      return {
        ...chat.users_chat_list_user_id_2Tousers,
        chat_id: chat.chat_list_id,
      };
    } else {
      return {
        ...chat.users_chat_list_user_id_1Tousers,
        chat_id: chat.chat_list_id,
      };
    }
  });

  return (
    <div className='flex'>
      <div
        className={`fixed inset-y-0 left-64 z-30 w-64 p-4 bg-white transition-transform duration-300 ease-in-out translate-x-0`}
      >
        <ChatList chatPartners={chatPartners} />
      </div>

      <div
        className={`flex-1 bg-gray-200 transition-all duration-300 ease-in-out  min-h-screen ml-64 `}
      >
        {children}
      </div>
    </div>
  );
}

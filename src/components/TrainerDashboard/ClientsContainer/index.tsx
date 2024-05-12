import { getServerSession } from 'next-auth';
import { ClientCard } from './ClientCard';
import prisma from '@/lib/database/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { notFound } from 'next/navigation';

export const ClientsContainer = async () => {
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
          profile_pic: true,
          name: true,
          waza_warriors: {
            select: {
              warrior_id: true,
              caloric_goal: true,
            },
          },
        },
      },
      users_chat_list_user_id_1Tousers: {
        select: {
          profile_pic: true,
          name: true,

          waza_warriors: {
            select: {
              warrior_id: true,
              caloric_goal: true,
            },
          },
        },
      },
    },
  });

  const clients = chatList.map((chat) => {
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
    <div>
      <p className='font-semibold text-gray-400 mb-4'>Your Clients</p>
      <div className='grid grid-cols-1  2xl:grid-cols-4 lg:grid-cols-3  gap-3 p-1'>
        {clients.map((client) => (
          <ClientCard
            key={client.chat_id}
            avatar={client.profile_pic || 'https://robohash.org/asd'}
            name={client.name || 'name'}
            chat_id={client.chat_id}
            warrior_id={client.waza_warriors?.warrior_id || 'warrior_id'}
            caloric_goal={client.waza_warriors?.caloric_goal || 1500}
          />
        ))}
      </div>
    </div>
  );
};

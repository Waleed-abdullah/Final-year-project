import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import prisma from '@/src/lib/database/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import Messages from '../components/Messages';
import ChatInput from '../components/ChatInput';

interface PageProps {
  params: {
    chat_id: string;
  };
}

const page: FC<PageProps> = async ({ params }) => {
  const { chat_id } = params;
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const [user_id_1, user_id_2] = chat_id.split('--');

  if (
    user_id_1 !== session.user.user_id &&
    user_id_2 !== session.user.user_id
  ) {
    notFound();
  }
  const chatPartnerId =
    user_id_1 === session.user.user_id ? user_id_2 : user_id_1;
  try {
    const chatPartner = await prisma.users.findUnique({
      where: {
        user_id: chatPartnerId,
      },
      select: {
        user_id: true,
        username: true,
        profile_pic: true,
        name: true,
      },
    });

    if (!chatPartner) notFound();

    const initialMessages = await prisma.chat.findMany({
      where: {
        OR: [
          {
            sender_id: session.user.user_id,
            receiver_id: chatPartnerId,
          },
          {
            sender_id: chatPartnerId,
            receiver_id: session.user.user_id,
          },
        ],
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    return (
      <div>
        <Messages
          initialMessages={initialMessages}
          session_id={session.user.user_id}
        />
        <ChatInput chatPartner={chatPartner} chat_id={chat_id} />
      </div>
    );
  } catch (error) {
    console.error('An error occurred while fetching chat partner: ', error);
    notFound();
  }
};

export default page;

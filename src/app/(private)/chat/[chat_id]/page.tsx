import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import prisma from '@/src/lib/database/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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
  } catch (error) {
    console.error('An error occurred while fetching chat partner: ', error);
    notFound();
  }

  return (
    <div>
      <h1>{session.user.user_id}</h1>
    </div>
  );
};

export default page;

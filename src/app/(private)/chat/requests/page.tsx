import MessageRequests from '@/src/app/(private)/chat/components/MessageRequests';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import prisma from '@/src/lib/database/prisma';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  // ids of people who sent current logged in user a message requests
  const incomingSenderIds_1 = await prisma.chat_list.findMany({
    where: {
      user_id_2: session.user.user_id,
      status: 'pending',
    },
    select: {
      user_id_1: true,
    },
  });
  const incomingSenderIds_2 = await prisma.chat_list.findMany({
    where: {
      user_id_1: session.user.user_id,
      status: 'pending',
    },
    select: {
      user_id_2: true,
    },
  });

  const incomingSenderIds = [
    ...incomingSenderIds_1.map((item) => item.user_id_1),
    ...incomingSenderIds_2.map((item) => item.user_id_2),
  ];

  const incomingMessageRequests = await Promise.all(
    await prisma.users.findMany({
      where: {
        user_id: {
          in: incomingSenderIds,
        },
      },
      select: {
        user_id: true,
        username: true,
        profile_pic: true,
        name: true,
      },
    }),
  );
  return (
    <main className='pt-8'>
      <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
      <div className='flex flex-col gap-4'>
        <MessageRequests
          incomingMessageRequests={incomingMessageRequests}
          session_id={session.user.user_id}
        />
      </div>
    </main>
  );
};

export default page;

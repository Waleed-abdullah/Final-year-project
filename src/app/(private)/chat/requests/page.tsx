import MessageRequests from '@/src/app/(private)/chat/components/MessageRequests';
import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import prisma from '@/src/lib/database/prisma';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const list = await prisma.chat_list.findMany({
    where: {
      OR: [
        { user_id_2: session.user.user_id, status: 'pending' },
        { user_id_1: session.user.user_id, status: 'pending' },
      ],
    },
    select: {
      user_id_1: true,
      user_id_2: true,
    },
  });

  const incomingSenderIds = list.map((item) =>
    session.user.user_id === item.user_id_1 ? item.user_id_2 : item.user_id_1,
  );

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

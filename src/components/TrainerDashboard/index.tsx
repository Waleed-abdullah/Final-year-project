import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { TopBar } from './TopBar';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/database/prisma';
import { WelcomeText } from './WelcomeText';
import { NewClientBtn } from './NewClientBtn';
import { ClientsContainer } from './ClientsContainer';

export const TrainerDashboard = async () => {
  const session = await getServerSession(authOptions);

  const userID = session?.user?.user_id;
  // get username from userId and other details if required
  const user = await prisma.users.findUnique({
    where: {
      user_id: userID,
    },
    select: {
      username: true,
    },
  });

  return (
    <div className='p-4 pl-7 flex flex-col gap-4'>
      <TopBar />
      <WelcomeText username={user?.username || ''} />
      <NewClientBtn />
      <ClientsContainer />
    </div>
  );
};

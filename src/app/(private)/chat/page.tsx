import { authOptions } from '@/src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { FC } from 'react';

const page: FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default page;

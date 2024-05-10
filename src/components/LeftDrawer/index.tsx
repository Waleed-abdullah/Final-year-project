import Image from 'next/image';
import Logo from '@/assets/Dashboard/waza_logo.svg';
import { UserType } from '@/types/page/auth/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WarriorRoutes } from './warrior-routes';
import { TrainerRoutes } from './trainer-routes';

const LeftDrawer: React.FC = async () => {
  const session = await getServerSession(authOptions);

  const userType = session?.user?.user_type as UserType;

  return (
    <div>
      <div className='mb-12 flex justify-center items-center'>
        <Image src={Logo} alt='Waza Logo' />
      </div>
      {userType === UserType.WazaWarrior ? (
        <WarriorRoutes />
      ) : (
        <TrainerRoutes />
      )}
    </div>
  );
};

export default LeftDrawer;

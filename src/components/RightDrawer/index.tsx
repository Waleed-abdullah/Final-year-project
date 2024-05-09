import UserMenu from './UserMenu';
import LeaderBoard from './WarriorItems/LeaderBoard';
import AddFriends from './WarriorItems/AddFriends';
import './styles.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { UserType } from '@/types/page/auth/user';
import { ClearNotificationsBtn } from './TrainerItems/notifications/clear-notifications';
import { NotificationArea } from './TrainerItems/notifications';

const RightDrawer: React.FC = async () => {
  const session = await getServerSession(authOptions);

  const userType = session?.user?.user_type as UserType;

  return (
    <div className='flex flex-col items-center max justify-between max-w-[365px] w-full h-full'>
      <div className='flex flex-col items-center justify-center gap-3 overflow-y-auto overflow-x-clip'>
        <UserMenu />
        <hr className='w-48 h-[1px]  border-0 rounded bg-gray-200' />
        <div className='flex-grow overflow-y-auto overflow-x-hidden'>
          {userType === UserType.WazaWarrior ? (
            <LeaderBoard />
          ) : (
            <NotificationArea />
          )}
        </div>
      </div>
      <div className='mt-auto'>
        {userType === UserType.WazaWarrior ? (
          <AddFriends />
        ) : (
          <ClearNotificationsBtn />
        )}
      </div>
    </div>
  );
};

export default RightDrawer;

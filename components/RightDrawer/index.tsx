import UserMenu from './UserMenu';
import LeaderBoard from './LeaderBoard';
import AddFriends from './AddFriends';

const RightDrawer: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-between h-full'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <UserMenu />
        <hr className='w-48 h-[1px]  border-0 rounded bg-gray-200' />
        <LeaderBoard />
      </div>
      <div>
        <AddFriends />
      </div>
    </div>
  );
};

export default RightDrawer;

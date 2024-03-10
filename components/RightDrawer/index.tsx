import UserMenu from './UserMenu';
import LeaderBoard from './LeaderBoard';
import AddFriends from './AddFriends';
import './styles.css';

const RightDrawer: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-between h-full'>
      <div className='flex flex-col items-center justify-center gap-3 overflow-y-auto'>
        <UserMenu />
        <hr className='w-48 h-[1px]  border-0 rounded bg-gray-200' />
        <div className='flex-grow overflow-y-auto overflow-x-hidden'>
          <LeaderBoard />
        </div>
      </div>
      <div className='mt-1'>
        <AddFriends />
      </div>
    </div>
  );
};

export default RightDrawer;

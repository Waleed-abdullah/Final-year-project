import UserCard from './userCard';

const LeaderBoard = () => {
  const currentMonth = new Date()
    .toLocaleString('default', { month: 'long' })
    .substring(0, 3);

  return (
    <div className='flex flex-col items-center justify-center overflow-y-auto'>
      <div className='flex justify-between items-center gap-8 mb-2'>
        <div>Leaderboard</div>
        <div className='bg-black hover:bg-yellow-400 text-yellow-400 text-center hover:text-white font-bold py-2 px-4 rounded-full'>
          {currentMonth}
        </div>
      </div>
      <UserCard username='something' friendPoints={[]} />
    </div>
  );
};

export default LeaderBoard;

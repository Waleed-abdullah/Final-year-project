import UserCard from './userCard';
import { leadingBackgroundColors, normalBackgroundColor } from './constants';

const leaderBoardArray = [
  { username: 'Waleed', points: 50 },
  { username: 'Ali', points: 20 },
  { username: 'Usman', points: 10 },
  { username: 'Ahmed', points: 5 },
  { username: 'Talha', points: 2 },
];

const LeaderBoard = () => {
  const currentMonth = new Date()
    .toLocaleString('default', { month: 'long' })
    .substring(0, 3);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex justify-between items-center gap-8 mb-2'>
        <div>Leaderboard</div>
        <div className='bg-black hover:bg-yellow-400 text-yellow-400 text-center hover:text-white font-bold py-2 px-4 rounded-full'>
          {currentMonth}
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        {leaderBoardArray.map((user, index) => (
          <UserCard
            key={index}
            username={user.username}
            points={user.points}
            background={
              index < 3 ? leadingBackgroundColors[index] : normalBackgroundColor
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;

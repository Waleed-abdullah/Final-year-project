'use client';

import UserCard from './userCard';
import { leadingBackgroundColors, normalBackgroundColor } from './constants';
import { LeaderBoardItem } from '@/types/leaderboard';
import { useLeaderBoard } from '@/stores/leaderboard-store';
import { useEffect } from 'react';

interface UserCardContainerProps {
  leaderBoardData: LeaderBoardItem[];
}

export const UserCardContainer: React.FC<UserCardContainerProps> = ({
  leaderBoardData,
}) => {
  const leaderBoard = useLeaderBoard()((state) => state.leaderBoard);
  const setLeaderBoard = useLeaderBoard()((state) => state.setLeaderBoard);

  useEffect(() => {
    setLeaderBoard(leaderBoardData);
  }, [leaderBoardData, setLeaderBoard]);

  return (
    <div className='flex flex-col items-center justify-center'>
      {leaderBoard?.map((user, index) => (
        <UserCard
          key={index}
          username={user.username}
          points={user.points}
          background={
            index < 3 ? leadingBackgroundColors[index] : normalBackgroundColor
          }
          ImgSrc={user.profile_pic}
        />
      ))}
    </div>
  );
};

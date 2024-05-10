'use client';
import { ReactChildren } from '@/types/common';
import { LeaderBoardItem } from '@/types/leaderboard';
import { useState, createContext, useContext } from 'react';
import { create } from 'zustand';

const createStore = () =>
  create<{
    leaderBoard: LeaderBoardItem[];
    setLeaderBoard: (leaderBoard: LeaderBoardItem[]) => void;
  }>((set) => ({
    leaderBoard: [],
    setLeaderBoard(leaderBoard: LeaderBoardItem[]) {
      leaderBoard.sort((a, b) => b.points - a.points);
      set({ leaderBoard: leaderBoard });
    },
  }));

const LeaderBoardContext = createContext<ReturnType<typeof createStore>>(null!);

export const useLeaderBoard = () => {
  if (!LeaderBoardContext)
    throw new Error('useLeaderBoard must be used within a LeaderBoardProvider');
  return useContext(LeaderBoardContext);
};

export const LeaderBoardProvider: React.FC<ReactChildren> = ({ children }) => {
  const [store] = useState(() => createStore());
  return (
    <LeaderBoardContext.Provider value={store}>
      {children}
    </LeaderBoardContext.Provider>
  );
};

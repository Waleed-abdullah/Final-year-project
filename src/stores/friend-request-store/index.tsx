'use client';
import { ReactChildren } from '@/types/common';
import { friendRequest } from '@/types/friend';
import { useState, createContext, useContext } from 'react';
import { create } from 'zustand';

const createStore = (friendRequests: friendRequest[]) =>
  create<{
    friendRequests: friendRequest[];
    setFriendRequests: (friendRequests: friendRequest[]) => void;
  }>((set) => ({
    friendRequests,
    setFriendRequests(friendRequests: friendRequest[]) {
      set({ friendRequests });
    },
  }));

const FriendRequestsContext = createContext<ReturnType<typeof createStore>>(
  null!,
);

export const useFriendRequests = () => {
  if (!FriendRequestsContext)
    throw new Error('useLeaderBoard must be used within a LeaderBoardProvider');
  return useContext(FriendRequestsContext);
};

export const FriendRequestsProvider: React.FC<
  ReactChildren & { friendRequests: friendRequest[] }
> = ({ friendRequests, children }) => {
  const [store] = useState(() => createStore(friendRequests));
  return (
    <FriendRequestsContext.Provider value={store}>
      {children}
    </FriendRequestsContext.Provider>
  );
};

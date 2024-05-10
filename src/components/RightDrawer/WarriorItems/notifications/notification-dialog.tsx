'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useFriendRequests } from '@/stores/friend-request-store';
import { FriendRequestAction, friendRequest } from '@/types/friend';
import { toast } from 'react-toastify';
// import { useLeaderBoard } from '@/stores/leaderboard-store';

export const NotificationDialog: React.FC = () => {
  const friendRequests = useFriendRequests()((state) => state.friendRequests);
  const setFriendRequests = useFriendRequests()(
    (state) => state.setFriendRequests,
  );
  // const leaderBoard = useLeaderBoard()((state) => state.leaderBoard);
  // const setLeaderBoard = useLeaderBoard()((state) => state.setLeaderBoard);

  const handleFriendRequest = async (
    friendData: friendRequest,
    idx: number,
    action: FriendRequestAction,
  ) => {
    // handle friend request logic
    try {
      const result = await fetch(`/api/friends/handle-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: friendData.id,
          action,
        }),
      });
      const data = await result.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setFriendRequests(
          friendRequests.slice(0, idx).concat(friendRequests.slice(idx + 1)),
        );
      }
    } catch (error) {
      toast.error('An error occured during the request. Please try again.');
    }
  };

  return (
    <>
      <DialogHeader className='max-w-[500px] outline-none ring-inse max-h-[500px] h-full w-full'>
        <DialogTitle>Search for Friends</DialogTitle>
      </DialogHeader>
      {friendRequests.length === 0 && (
        <div>Sorry, no friend requests at this time</div>
      )}
      <div className='w-full max-h-[300px] h-full overflow-auto overflow-y-scroll'>
        {friendRequests.map((result, idx) => (
          <Card
            key={result.requester_id}
            className='flex p-2 my-2 w-full justify-between items-center rounded-xl'
          >
            <CardContent className='flex items-center gap-3 text-center py-1 px-1 my-1 ml-2 mr-4 overflow-hidden'>
              <Avatar className='flex items-center'>
                <AvatarImage
                  src={result.profile_pic || ''}
                  alt={result.username!}
                />
                <AvatarFallback>
                  {result.username && result.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className='font-medium text-ellipsis'>{result.username}</p>
            </CardContent>
            <CardContent className='flex p-0 items-center h-full'>
              <button
                onClick={() => handleFriendRequest(result, idx, 'accepted')}
                className='border-2 hover:bg-yellow-400 p-2 focus:ring-2 focus:border-none focus:ring-yellow-500 transition-all duration-500 hover:text-white border-gray-300   hover:border-transparent rounded-3xl py-1 px-1 flex mr-2 tems-center justify-center cursor-pointer disabled:pointer-events-none disabled:bg-yellow-400/75'
              >
                Accept
              </button>
            </CardContent>
            <CardContent className='flex p-0 items-center h-full'>
              <button
                onClick={() => handleFriendRequest(result, idx, 'rejected')}
                className='border-2 hover:bg-yellow-400 p-2 focus:ring-2 focus:border-none focus:ring-yellow-500 transition-all duration-500 hover:text-white border-gray-300   hover:border-transparent rounded-3xl py-1 px-1 flex mr-2 tems-center justify-center cursor-pointer disabled:pointer-events-none disabled:bg-yellow-400/75'
              >
                Reject
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

'use client';

import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { Friend } from '@/types/friend';
import { toast } from 'react-toastify';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

const AddFriendsDialog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const { data: session } = useSession();

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      if (query.length === 0) {
        setSearchResults([]);
        return;
      }
      // Perform search logic here and update searchResults state
      setSearchQuery(query);
    },
    500,
  );

  const handleFriendAdd = async (potentialFriend: Friend, idx: number) => {
    // add friend logic
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/friends/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session?.user?.user_id,
            friendId: potentialFriend.warrior_id,
          }),
        },
      );
      const data = await result.json();
      if (data.error) {
        toast.error(data.error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      } else {
        setSearchResults((prevState) => [
          ...prevState.slice(0, idx),
          {
            ...prevState[idx],
            status: 'pending',
          },
          ...prevState.slice(idx + 1),
        ]);

        toast.success(data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('There was an error adding friend', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    // hit user search api endpoint and get results

    const fetchandSetData = async () => {
      if (searchQuery.length === 0) return;
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/friends/search?query=${searchQuery}&userId=${session?.user?.user_id}`,
        );
        const data = await result.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        toast.error('There was an error getting friends', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
    };
    fetchandSetData();
  }, [searchQuery, session]);

  return (
    <>
      <DialogHeader className='max-w-[500px] outline-none ring-inse max-h-[500px] h-full w-full'>
        <DialogTitle>Search for Friends</DialogTitle>
      </DialogHeader>
      <input
        name='title'
        onChange={handleSearch}
        className=' py-1 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 ring-offset-0 focus:border-none border-2 border-black/[.15] rounded-md text-center'
        placeholder='Search for friends'
      />
      <div className='w-full max-h-[300px] h-full overflow-auto overflow-y-scroll'>
        {searchResults.map((result, idx) => (
          <Card
            key={result.warrior_id}
            className='flex p-2 my-2 w-full justify-between items-center rounded-xl'
          >
            <CardContent className='flex items-center gap-3 text-center py-1 px-1 my-1 ml-2 mr-4 overflow-hidden'>
              <Avatar className='flex items-center'>
                <AvatarImage
                  src={result.profile_pic || ''}
                  alt={result.username}
                />
                <AvatarFallback>
                  {result.username && result.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className='font-medium text-ellipsis'>{result.username}</p>
            </CardContent>
            <CardContent className='flex p-0 items-center h-full'>
              <button
                onClick={() => handleFriendAdd(result, idx)}
                className='border-2 hover:bg-yellow-400 p-2 focus:ring-2 focus:border-none focus:ring-yellow-500 transition-all duration-500 hover:text-white border-gray-300   hover:border-transparent rounded-3xl py-1 px-1 flex mr-2 tems-center justify-center cursor-pointer disabled:pointer-events-none disabled:bg-yellow-400/75'
                disabled={
                  result.status === 'pending' || result.status === 'accepted'
                }
              >
                {result.status === 'pending' || result.status === 'accepted'
                  ? result.status
                  : 'Add Friend'}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AddFriendsDialog;

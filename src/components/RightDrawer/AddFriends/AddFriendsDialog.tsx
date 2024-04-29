'use client';

import { useState } from 'react';
import { DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
const AddFriendsDialog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    // Perform search logic here and update searchResults state
    setSearchQuery(query);

    setSearchResults(['Moez', 'Muhammad Waleed', 'Muhammad talha']);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Search for Friends</DialogTitle>
      </DialogHeader>
      <input
        name='title'
        onChange={handleSearch}
        className=' py-1 px-4 focus:outline-none border-2 border-black/[.15] rounded-md text-center'
        placeholder='Search for friends'
      />
      <div>
        {searchResults.map((result) => (
          <Card
            key={result}
            className='flex p-2 my-2 justify-between items-center rounded-xl'
          >
            <CardContent className='text-center py-1 px-1 my-1 ml-2 mr-4 overflow-hidden'>
              <p className='font-medium'>{result}</p>
            </CardContent>
            <CardContent className='border-2 hover:bg-yellow-400 hover:text-white border-gray-300  hover:border-transparent rounded-3xl py-1 px-10 border-black/10 flex mr-2 tems-center justify-center cursor-pointer'>
              Add
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AddFriendsDialog;

'use client';

import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export type UserCardProps = {
  username: string;
  points: number;
  background: string;
  ImgSrc?: string;
};

const UserCard: React.FC<UserCardProps> = ({
  username,
  points,
  background,
  ImgSrc,
}) => {
  return (
    <Card
      className={`p-0 whitespace-nowrap my-2 flex justify-between items-center ${background} w-60 rounded-lg`}
    >
      <CardContent className='p-0 py-1 my-1 ml-4'>
        <Avatar className='flex items-center'>
          <AvatarImage src={ImgSrc} alt={username} />
          <AvatarFallback className='ml-4'>
            {username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardContent className='py-1 px-1 my-1 ml-2 mr-4 overflow-hidden'>
        <p className='font-medium'>{username}</p>
      </CardContent>
      <CardContent className='py-1 px-1 my-1 mx-4'>
        <p className='font-bold'>{points}</p>
      </CardContent>
    </Card>
  );
};
export default UserCard;

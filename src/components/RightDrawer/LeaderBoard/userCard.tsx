import Avatar from '@/components/Avatar';
import { Card, CardContent } from '@/components/ui/card';

export type UserCardProps = {
  username: string;
  points: number;
  background: string;
};

const UserCard: React.FC<UserCardProps> = ({
  username,
  points,
  background,
}) => {
  return (
    <Card
      className={`p-0 whitespace-nowrap my-2 flex justify-between items-center ${background} w-60`}
    >
      <CardContent className='py-1 px-1 my-1 ml-4'>
        <Avatar src='https://picsum.photos/id/237/200/300' />
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

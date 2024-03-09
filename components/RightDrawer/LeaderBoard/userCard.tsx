import Avatar from '@/components/Avatar';
import { Card, CardContent } from '@/components/ui/card';

export type UserCardProps = {
  username: string;
  friendPoints: { username: string; points: number }[];
};

const UserCard: React.FC<UserCardProps> = ({ username, friendPoints }) => {
  return (
    <div className='flex flex-col items-center justify-center overflow-y-auto'>
      <Card className='p-0 whitespace-nowrap my-3 flex justify-between items-center'>
        <CardContent className='py-1 px-1 my-1 ml-4'>
          <Avatar src='https://picsum.photos/id/237/200/300' />
        </CardContent>
        <CardContent className='py-1 px-1 my-1 ml-2 mr-4 overflow-hidden'>
          <p className='font-medium'>Waleed</p>
        </CardContent>
        <CardContent className='py-1 px-1 my-1 mx-4'>
          <p className='font-bold'>100</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserCard;

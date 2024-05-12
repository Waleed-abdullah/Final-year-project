import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface ClientCardProps {
  avatar: string;
  name: string;
  chat_id: string;
  warrior_id: string;
  caloric_goal: number;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  avatar,
  name,
  chat_id,
  warrior_id,
  caloric_goal,
}) => {
  return (
    <div className='max-w-[266px]  w-full h-full max-h-[334px] rounded-xl bg-white flex flex-col justify-center items-center gap-3 p-2'>
      <Link href={`/clients/${warrior_id}/${caloric_goal}`}>
        <Avatar className='w-[150px] h-[150px]'>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <span className='text-lg font-semibold'>{name}</span>
      <Link
        href={`/chat/${chat_id}`}
        className='flex items-center justify-center rounded-[100px] font-medium h-12 w-[200px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-500 text-center'
      >
        Chat
      </Link>
    </div>
  );
};

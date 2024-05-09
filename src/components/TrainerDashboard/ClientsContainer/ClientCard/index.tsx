import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ClientCardProps {
  avatar: string;
  name: string;
}

export const ClientCard: React.FC<ClientCardProps> = ({ avatar, name }) => {
  return (
    <div className='max-w-[266px]  w-full h-full max-h-[334px] rounded-xl bg-white flex flex-col justify-center items-center gap-3 p-2'>
      <Avatar className='w-[150px] h-[150px]'>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className='text-lg font-semibold'>{name}</span>
      <button className='rounded-[100px] font-medium h-12 w-[200px] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 transition-all duration-500 text-center'>
        Chat
      </button>
    </div>
  );
};

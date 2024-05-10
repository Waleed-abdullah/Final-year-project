interface NotificationItemProps {
  heading: string;
  date: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  heading,
  date,
}) => {
  return (
    <div className=' flex gap-3 items-start w-[260px] justify-center h-[60px] pl-3'>
      <div className='h-2 w-2 rounded-full mt-2 bg-yellow-400' />
      <div className='flex flex-col items-start w-full h-full gap-2 font-medium'>
        <p>{heading}</p>
        <span className='text-gray-400'>{date}</span>
      </div>
    </div>
  );
};

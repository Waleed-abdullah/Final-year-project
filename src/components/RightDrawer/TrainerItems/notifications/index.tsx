import { NotificationItem } from './notification-item';

export const NotificationArea = () => {
  return (
    <div className='flex flex-col gap-3'>
      <NotificationItem
        heading='Waleed logged his workout'
        date='5 April | 5:57pm'
      />
      <NotificationItem
        heading='Waleed logged his workout'
        date='6 April | 1:23pm'
      />

      <NotificationItem
        heading='Waleed logged his diet'
        date='7 April | 2:37pm'
      />
    </div>
  );
};

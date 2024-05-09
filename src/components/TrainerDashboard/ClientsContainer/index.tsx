import { ClientCard } from './ClientCard';

const AVATAR_SRC_TEMP =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyW5AjczWG9OF6S7l5Rb2b4yJXo6JkAZID5GbM3PtEA&s';
const USERNAME_TEMP = 'Waleed Abdullah';
export const ClientsContainer = async () => {
  // TODO @moez: use this to fetch the trainer's clients

  return (
    <div>
      <p className='font-semibold text-gray-400 mb-4'>Your Clients</p>
      <div className='grid grid-cols-1  2xl:grid-cols-4 lg:grid-cols-3  gap-3 p-1'>
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
        <ClientCard avatar={AVATAR_SRC_TEMP} name={USERNAME_TEMP} />
      </div>
    </div>
  );
};

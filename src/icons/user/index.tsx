import { IconProps } from '@/types/icon';

export const UserIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm3 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.563 21a8 8 0 0 1 15.874 0l.063 2h-16l.063-2Zm2.02 0h11.833a6 6 0 0 0-11.832 0Z'
        fill='currentColor'
      />
    </svg>
  );
};

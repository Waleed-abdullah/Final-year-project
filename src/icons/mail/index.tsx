import { IconProps } from '@/types/icon';

export const MailIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        d='M20.5 20h-16a2 2 0 0 1-2-2V5.913A2 2 0 0 1 4.5 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2ZM4.5 7.868V18h16V7.868l-8 5.332-8-5.332ZM5.3 6l7.2 4.8L19.7 6H5.3Z'
        fill='currentColor'
      />
    </svg>
  );
};

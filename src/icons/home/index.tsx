import { IconProps } from '@/types/icon';

export const HomeIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      className={className}
    >
      <path
        d='M6 13.75h9a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5Z'
        fill='#FFC500'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.79 5 13.23.89a4.63 4.63 0 0 0-5.46 0L2.22 5A4.14 4.14 0 0 0 .5 8.34v7.43A4.34 4.34 0 0 0 4.94 20h11.12a4.34 4.34 0 0 0 4.44-4.23V8.33A4.15 4.15 0 0 0 18.79 5ZM19 15.77a2.84 2.84 0 0 1-2.94 2.73H4.94A2.85 2.85 0 0 1 2 15.77V8.34A2.65 2.65 0 0 1 3.11 6.2l5.55-4.1a3.12 3.12 0 0 1 3.68 0l5.55 4.11A2.61 2.61 0 0 1 19 8.33v7.44Z'
        fill='currentColor'
      />
    </svg>
  );
};

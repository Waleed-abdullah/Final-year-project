import { IconProps } from '@/types/icon';

export const BookMarkedIcon: React.FC<IconProps> = ({ className }) => {
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
        d='M7 3a1.5 1.5 0 0 0-1.5 1.5v11.838A3.5 3.5 0 0 1 7 16h12.5V3h-2v7a1 1 0 0 1-1.707.707L13.5 8.414l-2.293 2.293A1 1 0 0 1 9.5 10V3H7Zm0-2a3.5 3.5 0 0 0-3.5 3.5v15A3.5 3.5 0 0 0 7 23h13.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H7Zm4.5 2v4.586l1.293-1.293a1 1 0 0 1 1.414 0L15.5 7.586V3h-4Zm8 15H7a1.5 1.5 0 1 0 0 3h12.5v-3Z'
        fill='currentColor'
      />
    </svg>
  );
};

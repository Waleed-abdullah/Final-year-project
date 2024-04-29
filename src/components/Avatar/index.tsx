interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className='w-10 h-10 rounded-full' src={src} alt='Rounded avatar' />
    </>
  );
};

export default Avatar;

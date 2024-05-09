interface WelcomeTextProps {
  username: string;
}

export const WelcomeText: React.FC<WelcomeTextProps> = ({ username }) => {
  return (
    <div className=' text-black text-3xl font-bold'>
      Welcome back {username}!
    </div>
  );
};

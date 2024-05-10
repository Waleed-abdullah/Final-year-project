'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';

interface UserAvatarProps {
  displayName: string;
  profilePic: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ profilePic, displayName }) => {
  const { warriorProfilePic } = useWarriorAndDate();
  console.log(warriorProfilePic);
  return (
    <Avatar>
      <AvatarImage src={warriorProfilePic || profilePic} />
      <AvatarFallback>
        {displayName && displayName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

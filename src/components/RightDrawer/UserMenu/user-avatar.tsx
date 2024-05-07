'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWarriorAndDate } from '@/stores/warrior-store/WarriorAndDateProvider';

interface UserAvatarProps {
  displayName: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ displayName }) => {
  const { warriorProfilePic } = useWarriorAndDate();
  return (
    <Avatar>
      <AvatarImage src={warriorProfilePic} />
      <AvatarFallback>
        {displayName && displayName[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

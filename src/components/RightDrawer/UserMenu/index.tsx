import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/database/prisma';
import { WarriorSettings } from '../WarriorItems/WarriorSettings';
import { Notification } from '../WarriorItems/notifications/notification';

import { friendRequest } from '@/types/friend';
import { FriendRequestsProvider } from '@/stores/friend-request-store';
import { UserAvatar } from './user-avatar';
import { UserType } from '@/types/page/auth/user';
import { TrainerSettings } from '../TrainerItems/TrainerSettings';

const UserMenu: React.FC = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.user_id;
  const email = session?.user?.email;

  const userType = session?.user?.user_type as UserType;
  // get usernmae from userId
  const user = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      username: true,
      profile_pic: true,
    },
  });

  const displayName = user?.username || email;
  const profilePic = user?.profile_pic;

  const finalFriendRequests: friendRequest[] = [];

  if (userType === UserType.WazaWarrior) {
    const warrior = await prisma.waza_warriors.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        warrior_id: true,
      },
    });

    const warriorId = warrior?.warrior_id;

    // get friend requests for user
    const friendRequests = await prisma.friends.findMany({
      where: {
        accepter_id: warriorId,
        status: 'pending',
      },
    });

    // get username and profile pic of the requester
    for (const request of friendRequests) {
      const requester = await prisma.waza_warriors.findUnique({
        where: {
          warrior_id: request.requester_id!,
        },
        include: {
          users: {
            select: {
              username: true,
              profile_pic: true,
            },
          },
        },
      });
      finalFriendRequests.push({
        username: requester?.users?.username,
        profile_pic: requester?.users?.profile_pic,
        ...request,
      });
    }
  }

  return (
    <div className='w-full m-2 flex flex-row justify-end items-center p-2 gap-3 border border-gray-300 rounded-full'>
      {userType === UserType.WazaWarrior ? (
        <>
          <WarriorSettings />
          <FriendRequestsProvider friendRequests={finalFriendRequests}>
            <Notification />
          </FriendRequestsProvider>
        </>
      ) : (
        <TrainerSettings />
      )}
      <div className='max-w-[160px] font-bold overflow-clip text-ellipsis whitespace-nowrap'>
        {displayName}
      </div>
      <div>
        <UserAvatar
          profilePic={profilePic ?? ''}
          displayName={displayName || 'U'}
        />
      </div>
    </div>
  );
};

export default UserMenu;

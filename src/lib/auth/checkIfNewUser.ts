import { UserType } from '@/src/types/page/auth/user';
import prisma from '../database/prisma';

async function checkIfNewUser(user: any) {
  if (UserType.WazaWarrior === user.user_type) {
    const warrior = await prisma.waza_warriors.findUnique({
      where: { user_id: user.user_id },
      select: {
        user_id: true,
      },
    });
    if (!warrior?.user_id) return true;
  } else if (UserType.WazaTrainer === user.user_type) {
    const trainer = await prisma.waza_trainers.findUnique({
      where: { user_id: user.user_id },
      select: {
        user_id: true,
      },
    });
    if (!trainer?.user_id) return true;
  }
  return false;
}

export default checkIfNewUser;

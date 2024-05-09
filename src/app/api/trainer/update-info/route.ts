import { NextResponse } from 'next/server';
import prisma from '@/lib/database/prisma';

export const PATCH = async (request: Request) => {
  // get data from req.body
  const body = await request.json();

  const profilePic = body.profilePic;
  const userId = body.userId;
  const bio = body.bio;
  const hourlyRate = body.hourlyRate;

  console.log(body);

  if (!userId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  if (bio) {
    //update the bio of the trainer
    try {
      await prisma.waza_trainers.update({
        where: { user_id: userId },
        data: {
          bio: bio,
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  if (hourlyRate) {
    //update hourly rate of trainer
    try {
      await prisma.waza_trainers.update({
        where: { user_id: userId },
        data: {
          hourly_rate: parseFloat(hourlyRate),
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  if (profilePic) {
    //update profile pic of user
    try {
      await prisma.users.update({
        where: { user_id: userId },
        data: {
          profile_pic: profilePic,
        },
      });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Data updated successfully' });
};

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { sendErrorResponse } from '../../../utils/errorHandler';

export default async function listTrainers(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const specializationQuery = (
      req.query.specialization as string
    )?.toLowerCase();
    const locationQuery = (req.query.location as string)?.toLowerCase();
    const genderQuery = (req.query.gender as string)?.toLowerCase();
    const hourlyRateMin = parseFloat(req.query.hourlyRateMin as string);
    const hourlyRateMax = parseFloat(req.query.hourlyRateMax as string);
    const ageMin = parseInt(req.query.ageMin as string);
    const ageMax = parseInt(req.query.ageMax as string);
    const experienceMin = parseInt(req.query.experienceMin as string);
    const experienceMax = parseInt(req.query.experienceMax as string);

    const whereConditions: any = {};
    if (specializationQuery) {
      whereConditions.trainer_specializations = {
        some: {
          specializations: {
            specialization_name: {
              contains: specializationQuery,
              mode: 'insensitive',
            },
          },
        },
      };
    }
    if (locationQuery)
      whereConditions.location = {
        contains: locationQuery,
        mode: 'insensitive',
      };
    if (genderQuery)
      whereConditions.users = {
        gender: { contains: genderQuery, mode: 'insensitive' },
      };
    if (hourlyRateMin || hourlyRateMax) {
      whereConditions.hourly_rate = {};

      if (!isNaN(hourlyRateMin)) {
        whereConditions.hourly_rate.gte = hourlyRateMin;
      }

      if (!isNaN(hourlyRateMax)) {
        whereConditions.hourly_rate.lte = hourlyRateMax;
      }
    }
    if (!isNaN(ageMin) || !isNaN(ageMax)) {
      whereConditions.users = whereConditions.users || {};

      if (!isNaN(ageMin)) {
        whereConditions.users.age = whereConditions.users.age || {};
        whereConditions.users.age.gte = ageMin;
      }

      if (!isNaN(ageMax)) {
        whereConditions.users.age = whereConditions.users.age || {};
        whereConditions.users.age.lte = ageMax;
      }
    }
    if (experienceMin) whereConditions.experience = { gte: experienceMin };
    if (experienceMax) whereConditions.experience = { lte: experienceMax };

    const trainers = await prisma.waza_trainers.findMany({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        trainer_id: true,
        hourly_rate: true,
        bio: true,
        location: true,
        experience: true,
        users: {
          select: {
            name: true,
            profile_pic: true,
            age: true,
            gender: true,
          },
        },
        trainer_specializations: {
          select: {
            specializations: {
              select: {
                specialization_name: true,
              },
            },
          },
        },
      },
    });

    // Fetch total count for pagination metadata
    const totalCount = await prisma.waza_trainers.count({
      where: whereConditions,
    });

    // Construct response with pagination metadata
    const response = {
      trainers,
      pagination: {
        total: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
      },
    };

    return res.status(200).json(response);
  } catch (e: unknown) {
    console.error('Error in listTrainers:', e);
    return sendErrorResponse(res, 500, 'Internal Server Error', e);
  }
}

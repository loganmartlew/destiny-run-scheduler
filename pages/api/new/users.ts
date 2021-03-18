import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  // const usersInSchedule =
  //   'SELECT u.name FROM user u, schedule s, user_schedule us WHERE u.id = us.userid AND s.id = us.scheduleid AND s.id = 2';

  // const schedulesByUser =
  //   'SELECT s.* FROM schedule s, user_schedule us WHERE s.id = us.scheduleid AND us.userid = 2';

  // const query = await db.all(schedulesByUser);

  let schedules: any[] = await db.all(
    'SELECT s.* FROM schedule s, user_schedule us WHERE s.id = us.scheduleid AND us.userid = 1'
  );

  schedules = schedules.map(async (schedule, i) => {
    const usersInSchedule = await db.all(
      `SELECT u.* FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${
        i + 1
      }`
    );

    return {
      ...schedule,
      users: usersInSchedule,
    };
  });

  return res.json(await Promise.all(schedules));
};

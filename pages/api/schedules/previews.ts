import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

/*
methods: GET
url query params: {
  userid: auth0 id of user
}
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method !== 'GET') {
    return res.status(400).json({
      message: 'Bad request. Only GET requests are allowed at this endpoint.',
    });
  }

  const { userid } = req.query;

  if (!userid) return res.status(400).json({ message: 'No user id provided' });

  let schedules: any[];

  schedules = await db.all(
    `SELECT s.* FROM schedule s, user_schedule us WHERE s.id = us.scheduleid AND us.userid = ${userid}`
  );

  schedules = schedules.map(async schedule => {
    const usersInSchedule = await db.all(
      `SELECT u.* FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${schedule.id}`
    );

    return {
      ...schedule,
      users: usersInSchedule,
    };
  });

  return res.json(await Promise.all(schedules));
};

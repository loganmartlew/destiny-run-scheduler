import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

/*
methods: GET
route param: {
  id: id of requested schedule
}
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method !== 'GET') {
    return res.status(400).json({
      message: 'Bad request. Only GET requests are allowed at this endpoint.',
    });
  }

  const { id: scheduleid } = req.query;

  let schedule: any = await db.get(
    `SELECT * FROM schedule WHERE id = ${scheduleid}`
  );

  const usersInSchedule = await db.all(
    `SELECT u.* FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${schedule.id}`
  );

  const daysInSchedule = await db.all(
    `SELECT id, date FROM day WHERE scheduleid = ${schedule.id}`
  );

  schedule = {
    ...schedule,
    users: usersInSchedule,
    days: await Promise.all(
      daysInSchedule.map(async day => {
        const rangesInDay = await db.all(
          `SELECT id, start, end, userid FROM runrange WHERE dayid = ${day.id}`
        );

        return {
          ...day,
          ranges: await Promise.all(
            rangesInDay.map(async range => {
              const userInRange = await db.get(
                `SELECT u.* FROM user u, runrange r WHERE r.userid = u.id AND r.id = ${range.id}`
              );

              return {
                id: range.id,
                start: range.start,
                end: range.end,
                user: userInRange,
              };
            })
          ),
        };
      })
    ),
  };

  return res.json(schedule);
};

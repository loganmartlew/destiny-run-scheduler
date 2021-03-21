import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

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

    const daysInSchedule = await db.all(
      `SELECT id, date FROM day WHERE scheduleid = ${schedule.id}`
    );

    return {
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
  });

  return res.json(await Promise.all(schedules));
};

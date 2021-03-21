import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  let schedule: any = await db.get(
    `SELECT * FROM schedule WHERE id = ${req.query.id}`
  );

  const usersInSchedule = await db.all(
    `SELECT u.name FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${schedule.id}`
  );

  schedule = {
    ...schedule,
    users: usersInSchedule.map(user => user.name),
  };

  return res.json(schedule);
};

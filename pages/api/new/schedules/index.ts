import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Bad request. Only POST requests are allowed at this endpoint.',
    });
  }

  const { name, userid } = req.body;

  if (!name || !userid) {
    return res.status(400).json({
      message:
        'Bad request. Name or userid not provided, unable to create user',
    });
  }

  await db.exec(`INSERT INTO schedule (name) VALUES ("${name}")`);

  const { 'last_insert_rowid()': newScheduleId } = await db.get(
    `SELECT last_insert_rowid()`
  );

  await db.exec(
    `INSERT INTO user_schedule (userid, scheduleid) VALUES (${userid}, ${newScheduleId})`
  );

  const newSchedule = await db.get(
    `SELECT * FROM schedule WHERE id = ${newScheduleId}`
  );

  return res.json(newSchedule);
};

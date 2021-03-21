import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Bad request. Only POST requests are allowed at this endpoint.',
    });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Bad request. Name or email not provided, unable to create user',
    });
  }

  await db.exec(
    `INSERT INTO user (name, email) VALUES ("${name}", "${email}")`
  );

  const { 'last_insert_rowid()': newUserId } = await db.get(
    `SELECT last_insert_rowid()`
  );

  const newUser = await db.get(`SELECT * FROM user WHERE id = ${newUserId}`);

  return res.json(newUser);
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method === 'GET') {
    const users = await db.all('SELECT * FROM user');
    return res.json(users);
  }

  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'Bad request. Only POST requests are allowed at this endpoint.',
    });
  }

  const { userid, name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Bad request. Name or email not provided, unable to create user',
    });
  }

  await db.exec(
    `INSERT INTO user (id, name, email) VALUES ("${userid}", "${name}", "${email}")`
  );

  const newUser = await db.get(`SELECT * FROM user WHERE id = "${userid}"`);

  return res.json(newUser);
};

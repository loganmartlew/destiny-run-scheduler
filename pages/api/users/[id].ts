import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  if (req.method !== 'GET') {
    return res.status(400).json({
      message: 'Bad request. Only GET requests are allowed at this endpoint.',
    });
  }

  const { id: userid } = req.query;

  const user = await db.get(`SELECT * FROM user WHERE id = ${userid}`);

  return res.json(user);
};

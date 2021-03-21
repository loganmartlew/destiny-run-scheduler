import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await useDb();

  let users: any = await db.get(
    `SELECT * FROM user WHERE id = ${req.query.id}`
  );

  return res.json(users);
};

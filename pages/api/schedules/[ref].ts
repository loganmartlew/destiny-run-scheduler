import type { NextApiRequest, NextApiResponse } from 'next';
import { q, client } from '@/utils/fauna';
import { populateSchedule } from '@/utils/populateQueryData';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { ref } = req.query;

  const schedule = await client.query(
    q.Get(q.Ref(q.Collection('schedules'), ref))
  );

  const formattedSchedule = await populateSchedule(schedule);

  res.json(formattedSchedule);
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { q, client } from '@/utils/fauna';
import { populateSchedule } from '@/utils/populateQueryData';
import { Schedule } from '@/types/ScheduleTypes';

// interface User {
//   ref: string;
//   ts: number;
//   name: string;
//   email: string;
// }

// interface RunRange {
//   ref: string;
//   ts: number;
//   user: User;
//   start: number;
//   end: number;
// }

// interface Day {
//   ref: string;
//   ts: number;
//   date: string;
//   ranges: RunRange[];
// }

// interface Schedule {
//   ref: string;
//   ts: number;
//   name: string;
//   users: User[];
//   days: Day[];
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userref } = req.query;

  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Invalid request method' });
  }

  if (!userref) {
    return res.status(400).json({ message: 'Userref not provided' });
  }

  // Get all schedules
  const allSchedulesData: any = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('all_schedules'))),
      q.Lambda('x', q.Get(q.Var('x')))
    )
  );

  const allSchedules: any[] = allSchedulesData.data;

  // Filter schedules by provided user ref
  const userSchedules: any[] = [];

  allSchedules.forEach(schedule => {
    schedule.data.users.forEach((user: any) => {
      if (user.value.id === userref) {
        userSchedules.push(schedule);
      }
    });
  });

  // Check for schedules found
  if (userSchedules.length < 1) {
    return res.status(200).json({ message: 'No schedules found' });
  }

  // Format schedules and populate subfields
  const formattedSchedules: Schedule[] = await Promise.all(
    userSchedules.map<Promise<Schedule>>(
      async schedule => await populateSchedule(schedule)
    )
  );

  return res.status(200).json(formattedSchedules);
};

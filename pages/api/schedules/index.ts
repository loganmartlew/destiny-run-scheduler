import type { NextApiRequest, NextApiResponse } from 'next';
import { q, client } from '@/utils/fauna';

interface User {
  ref: string;
  ts: number;
  name: string;
  email: string;
}

interface RunRange {
  ref: string;
  ts: number;
  user: User;
  start: number;
  end: number;
}

interface Day {
  ref: string;
  ts: number;
  date: string;
  ranges: RunRange[];
}

interface Schedule {
  ref: string;
  ts: number;
  name: string;
  users: User[];
  days: Day[];
}

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
    userSchedules.map<Promise<Schedule>>(async schedule => ({
      ref: schedule.ref.value.id,
      ts: schedule.ts,
      name: schedule.data.name,
      users: await Promise.all(
        schedule.data.users.map(async (user: any) => {
          const fullUser: any = await client.query(
            q.Get(q.Ref(q.Collection('users'), user.value.id))
          );

          return {
            ref: fullUser.ref.value.id,
            ts: fullUser.ts,
            name: fullUser.data.name,
            email: fullUser.data.email,
          };
        })
      ),
      days: await Promise.all(
        schedule.data.days.map(
          async (day: any): Promise<Day> => {
            const fullDay: any = await client.query(
              q.Get(q.Ref(q.Collection('day'), day.value.id))
            );

            return {
              ref: fullDay.ref.value.id,
              ts: fullDay.ts,
              date: fullDay.data.date,
              ranges: await Promise.all(
                fullDay.data.ranges.map(
                  async (range: any): Promise<RunRange> => {
                    const fullRange: any = await client.query(
                      q.Get(q.Ref(q.Collection('runRange'), range.value.id))
                    );

                    const rangeUser: any = await client.query(
                      q.Get(
                        q.Ref(
                          q.Collection('users'),
                          fullRange.data.user.value.id
                        )
                      )
                    );

                    return {
                      ref: fullRange.ref.value.id,
                      ts: fullRange.ts,
                      user: {
                        ref: rangeUser.ref.value.id,
                        ts: rangeUser.ts,
                        name: rangeUser.data.name,
                        email: rangeUser.data.email,
                      },
                      start: fullRange.data.start,
                      end: fullRange.data.end,
                    };
                  }
                )
              ),
            };
          }
        )
      ),
    }))
  );

  return res.status(200).json(formattedSchedules);
};

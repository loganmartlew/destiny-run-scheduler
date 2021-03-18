import { q, client } from '@/utils/fauna';
import { Schedule, Day, RunRange } from '@/types/ScheduleTypes';

export const populateSchedule = async (schedule: any): Promise<Schedule> => {
  return {
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
                      q.Ref(q.Collection('users'), fullRange.data.user.value.id)
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
  };
};

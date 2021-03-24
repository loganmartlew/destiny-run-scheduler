import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { useDb } from '@/utils/db';

/*
methods: GET
route param: {
  id: id of requested schedule
}
*/

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await useDb();

    const { id: scheduleid } = req.query;

    if (req.method === 'GET') {
      let schedule = await db.get(
        `SELECT * FROM schedule WHERE id = ${scheduleid}`
      );

      const usersInSchedule = await db.all(
        `SELECT u.* FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${schedule.id}`
      );

      const daysInSchedule = await db.all(
        `SELECT id, date FROM day WHERE scheduleid = ${schedule.id}`
      );

      schedule = {
        ...schedule,
        users: usersInSchedule,
        days: await Promise.all(
          daysInSchedule.map(async day => {
            const rangesInDay = await db.all(
              `SELECT id, start, end, userid FROM runrange WHERE dayid = ${day.id}`
            );

            return {
              ...day,
              ranges: await Promise.all(
                rangesInDay.map(async range => {
                  const userInRange = await db.get(
                    `SELECT u.* FROM user u, runrange r WHERE r.userid = u.id AND r.id = ${range.id}`
                  );

                  return {
                    id: range.id,
                    start: range.start,
                    end: range.end,
                    user: userInRange,
                  };
                })
              ),
            };
          })
        ),
      };

      return res.json(schedule);
    }

    if (req.method === 'DELETE') {
      const session = getSession(req, res);

      const { userid } = req.body;

      if (!userid) {
        return res.status(400).json({
          message: 'Bad request. User id not provided.',
        });
      }

      if (session?.user.sub !== userid) {
        return res.status(400).json({
          message: 'Bad request. User is not authorized to make this request.',
        });
      }

      await db.exec(
        `DELETE FROM user_schedule WHERE scheduleid = ${scheduleid} AND userid = "${session?.user.sub}"`
      );

      const usersInSchedule = await db.all(
        `SELECT * FROM user_schedule WHERE scheduleid = ${scheduleid}`
      );

      if (usersInSchedule.length <= 0) {
        await db.exec(`DELETE FROM schedule WHERE id = ${scheduleid}`);
      }

      return res.json({
        message: 'User removed from schedule',
      });
    }

    return res.status(400).json({
      message:
        'Bad request. Only GET and DELETE requests are allowed at this endpoint.',
    });
  }
);

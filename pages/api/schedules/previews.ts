import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { useDb } from '@/utils/db';

/*
methods: GET
url query params: {
  userid: auth0 id of user
}
*/

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await useDb();

    if (req.method !== 'GET') {
      return res.status(400).json({
        message: 'Bad request. Only GET requests are allowed at this endpoint.',
      });
    }

    const { userid } = req.query;

    const session = getSession(req, res);

    if (!userid)
      return res.status(400).json({ message: 'No user id provided' });

    if (session?.user.sub !== userid) {
      return res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      });
    }

    let schedules: any[];

    schedules = await db.all(
      `SELECT s.* FROM schedule s, user_schedule us WHERE s.id = us.scheduleid AND us.userid = "${userid}"`
    );

    schedules = schedules.map(async schedule => {
      const usersInSchedule = await db.all(
        `SELECT u.* FROM user u, user_schedule us WHERE u.id = us.userid AND us.scheduleid = ${schedule.id}`
      );

      return {
        ...schedule,
        users: usersInSchedule,
      };
    });

    return res.json(await Promise.all(schedules));
  }
);

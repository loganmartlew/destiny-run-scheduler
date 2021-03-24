import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { useDb } from '@/utils/db';

/*
methods: POST
body: {
  name: schedule name
  user: {
    id: auth0 id
    name: auth0 username
    email: auth0 email
  }
}
*/

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await useDb();

    if (req.method !== 'POST') {
      return res.status(400).json({
        message:
          'Bad request. Only POST requests are allowed at this endpoint.',
      });
    }

    const { name, user } = req.body;

    if (!name || !user) {
      return res.status(400).json({
        message:
          'Bad request. Schedule name or user not provided, unable to create user',
      });
    }

    const session = getSession(req, res);

    if (session?.user.sub !== user.id) {
      return res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      });
    }

    const existingUser = await db.get(
      `SELECT * FROM user WHERE id = "${user.id}"`
    );

    // Create user if there is no record of the supplied user
    if (!existingUser) {
      await db.exec(
        `INSERT INTO user (id, name, email) VALUES ("${user.id}", "${user.name}", "${user.email}")`
      );
    }

    await db.exec(`INSERT INTO schedule (name) VALUES ("${name}")`);

    const { 'last_insert_rowid()': newScheduleId } = await db.get(
      `SELECT last_insert_rowid()`
    );

    await db.exec(
      `INSERT INTO user_schedule (userid, scheduleid) VALUES ("${user.id}", ${newScheduleId})`
    );

    const newSchedule = await db.get(
      `SELECT * FROM schedule WHERE id = ${newScheduleId}`
    );

    return res.json(newSchedule);
  }
);

import { q, client } from '../../../utils/fauna';
import DbUser from '../../../types/DbUser';
import User from '../../../types/User';

export default async (req, res) => {
  const { email, name } = req.query;

  if (req.method === 'GET') {
    if (email) {
      try {
        const user: DbUser = await client.query(q.Get(q.Match(q.Index('user_by_email'), email)));
        res.status(200).json(<User>{
          ref: user.ref,
          ts: user.ts,
          name: user.data.name,
          email: user.data.email,
        });
      } catch {
        res.status(500).send();
      }
    } else {
      try {
        const user: DbUser = await client.query(q.Get(q.Match(q.Index('user_by_name'), name)));
        res.status(200).json(<User>{
          ref: user.ref,
          ts: user.ts,
          name: user.data.name,
          email: user.data.email,
        });
      } catch {
        res.status(500).send();
      }
    }
  }

  if (req.method === 'POST') {
    const { username, email } = req.body;

    try {
      const user: DbUser = await client.query(
        q.Create(q.Collection('users'), {
          data: {
            name: username,
            email,
          },
        })
      );
      res.status(200).json(<User>{
        ref: user.ref,
        ts: user.ts,
        name: user.data.name,
        email: user.data.email,
      });
    } catch {
      res.status(500).send();
    }
  }

  res.status(400).send();
};

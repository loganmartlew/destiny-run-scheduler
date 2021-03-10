import type { NextApiRequest, NextApiResponse } from 'next';
import { q, client } from '@/utils/fauna';
import DbUser from '@/types/DbUser';
import User from '@/types/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name } = req.query;

  if (req.method === 'GET') {
    if (email) {
      try {
        const user: DbUser = await client.query(
          q.Get(q.Match(q.Index('user_by_email'), email))
        );
        return res.status(200).json(<User>{
          ref: user.ref,
          ts: user.ts,
          name: user.data.name,
          email: user.data.email,
        });
      } catch (err) {
        return res
          .status(500)
          .json({ message: err.message || 'An unknown error occurred' });
      }
    } else {
      try {
        const user: DbUser = await client.query(
          q.Get(q.Match(q.Index('user_by_name'), name))
        );
        return res.status(200).json(<User>{
          ref: user.ref,
          ts: user.ts,
          name: user.data.name,
          email: user.data.email,
        });
      } catch (err) {
        return res
          .status(500)
          .json({ message: err.message || 'An unknown error occurred' });
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
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message || 'An unknown error occurred' });
    }
  }

  res.status(400).json({ message: 'Invalid request method' });
};

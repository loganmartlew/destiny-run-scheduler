import type { NextApiRequest, NextApiResponse } from 'next';
import { useDb } from '@/utils/db';

/*
methods: PATCH
body: {
  id: Auth0 user id
  username: new username
}
*/

const url = process.env.AUTH0_API_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    return res.status(400).json({
      message: 'Bad request. Only PATCH requests are allowed at this endpoint.',
    });
  }

  const { id: userid } = req.query;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      message:
        'Bad request. New username not provided, unable to update username.',
    });
  }

  // Update username in db

  const response = await fetch(`${process.env.AUTH0_API_TOKEN_URL}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_API_CLIENT_ID,
      client_secret: process.env.AUTH0_API_CLIENT_SECRET,
      audience: `${process.env.AUTH0_API_URL}/`,
      grant_type: 'client_credentials',
    }),
  });

  const { access_token } = await response.json();

  await fetch(`${url}/users/${userid}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${access_token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user_metadata: {
        user_name: username,
      },
    }),
  });

  res.status(200).send('Username changed');
};

const { q, client } = require('../../../utils/fauna');

module.exports = async (req, res) => {
  const { username, email } = req.body;

  if (req.method !== 'POST') {
    res.status(400).send();
  }

  try {
    const user = await client.query(
      q.Create(q.Collection('users'), {
        data: {
          name: username,
          email,
        },
      })
    );
    res.status(200).json({
      ref: user.ref,
      ts: user.ts,
      name: user.data.name,
      email: user.data.email,
    });
  } catch {
    res.status(500).send();
  }
};

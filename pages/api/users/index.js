const { q, client } = require('../../../utils/fauna');

module.exports = async (req, res) => {
  const { username, email } = req.body;

  if (req.method !== 'POST') {
    res.status(400).send();
  }

  try {
    await client.query(
      q.Create(q.Collection('users'), {
        data: {
          name: username,
          email,
        },
      })
    );
  } catch {
    res.status(500).send();
  }

  res.status(200).send();
};

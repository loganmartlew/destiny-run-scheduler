const { q, client } = require('../../../utils/fauna');

module.exports = async (req, res) => {
  const { email } = req.query;

  if (req.method !== 'GET') {
    res.status(400).send();
  }

  try {
    const user = await client.query(q.Get(q.Match(q.Index('user_by_email'), email)));
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

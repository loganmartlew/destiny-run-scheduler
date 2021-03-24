import type { NextApiRequest } from 'next';
import { handleAuth, handleLogin, LoginOptions } from '@auth0/nextjs-auth0';

const getLoginState = (req: NextApiRequest) => {
  if (req.query.profile === '1') {
    return {
      returnTo: `${process.env.AUTH0_BASE_URL}/profile`,
    };
  }
  return {};
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { getLoginState });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

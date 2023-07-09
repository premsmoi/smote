import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { authOptions } from './auth/[...nextauth]';
import { unauthorized } from './response';

const apiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { path } } = req;

  if (!path || typeof path === 'string') {
    return res.status(500);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) return unauthorized(res);

  const { data } = await axios.request({
    ...req,
    url: `http://localhost:8080/${path.join('/')}`,
    data: req.body,
    params: req.query,
    headers: {
      Authorization: session.idToken,
    },
    withCredentials: true,
  });

  res.json(data);
};
export default apiRoute;

import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { authOptions } from './auth/[...nextauth]';
import { unauthorized } from './response';
import { hostname } from '@src/const';

const apiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { path } } = req;

  if (!path || typeof path === 'string') {
    return res.status(500);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) return unauthorized(res);

  try {
    const { data } = await axios.request({
      ...req,
      url: `${hostname}/${path.join('/')}`,
      data: req.method === 'GET' ? undefined : req.body,
      params: req.query,
      withCredentials: true,
      headers: {
        'uid': session.user?.uid,
        'google-token': session.googleToken,
        'facebook-token': session.facebookToken,
      }
    })

    res.json(data);
  } catch(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        const { status, data } = error.response;
        return res.status(status).send(data);
      }
    }

    return res.status(500).send(null);
  }
};
export default apiRoute;

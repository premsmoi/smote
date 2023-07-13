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
    url: `https://smote-service-yq7g2xs3nq-as.a.run.app/${path.join('/')}`,
    data: req.method === 'GET' ? undefined : req.body,
    params: req.query,
    withCredentials: true,
    headers: {
      'uid': session.user?.uid,
      'google-token': session.googleToken,
      'facebook-token': session.facebookToken,
    }
  });

  res.json(data);
};
export default apiRoute;

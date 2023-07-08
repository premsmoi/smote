import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next/types';

const apiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: { path } } = req;

  if (!path || typeof path === 'string') {
    return res.status(500);
  }

  console.log(req.body)

  const { data } = await axios.request({ ...req, url: `http://localhost:8080/${path.join('/')}`, data: req.body });

  res.json(data);
};
export default apiRoute;

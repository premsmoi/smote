import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectToDatabase } from '../../utils/database';

const COLLECTION_NAME = 'boards';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
        const boards = await db
            .collection(COLLECTION_NAME)
            .aggregate([ { $project: { boardId: "$_id", _id: 0, notes: 1, boardName: 1 }} ])
            .toArray();

        res.json(boards);
        break;
    case 'POST':
      await db.collection(COLLECTION_NAME).insertOne(JSON.parse(req.body));
      res.status(200);
      break;
    }
};
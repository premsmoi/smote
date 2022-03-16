import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method } = req;

  if (method === 'GET') {
    const boards = await db
        .collection(COLLECTION.BOARDS).find().toArray();

    res.json({ boards });
  } else if (method === 'POST') {
    const { insertedId } = await db.collection(COLLECTION.BOARDS).insertOne(req.body);
    const board = await db.collection(COLLECTION.BOARDS).findOne({ _id: insertedId });

    console.log({ board })

    // delete board?._id;

    res.json({ board });
  }
};

export const getBoardById = async (boardId: number) => {
  const { db } = await connectToDatabase();
  const boards = await db.collection(COLLECTION.BOARDS).aggregate([{ $project: { _id: 0 } }, { $match: { boardId } }]).toArray();

  return boards[0];
}
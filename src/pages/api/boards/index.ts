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
    const boarId = await getBoardId();
    const payload = req.body;

    payload.boardId = boarId;

    const { insertedId } = await db.collection(COLLECTION.BOARDS).insertOne(payload);
    const board = await db.collection(COLLECTION.BOARDS).findOne({ _id: insertedId }) as any;

    delete board._id;

    res.json({ board });
  }
};

export const getBoardById = async (boardId: number) => {
  const { db } = await connectToDatabase();
  const boards = await db.collection(COLLECTION.BOARDS).aggregate([{ $project: { _id: 0 } }, { $match: { boardId } }]).toArray();

  return boards[0];
}

const getBoardId = async (): Promise<number> => {
  const { db } = await connectToDatabase();

  await db.collection(COLLECTION.COUTERS).updateOne({ collection: COLLECTION.BOARDS }, { $inc: { seq_value: 1 } });

  const boardsCounter = await db.collection(COLLECTION.COUTERS).findOne({ collection: COLLECTION.BOARDS });
  const seq_value = boardsCounter?.seq_value as number;

  return seq_value;
}
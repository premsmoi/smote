import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION, USER_TYPE } from '../../../const';
import { connectToDatabase } from '../../../utils/database';
import { unauthorized } from '../response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const boardAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.uid) return unauthorized(res);

  const { uid } = session.user;

  if (method === 'GET') {
    const boards = await db.collection(COLLECTION.BOARDS).find(getBoardsQuery(uid)).toArray();

    res.json({ boards });
  } else if (method === 'POST') {
    const boardId = await getBoardId();
    const payload = req.body as Board;

    payload.boardId = boardId;
    payload.isPublic = uid === USER_TYPE.GUEST ? true : false;
    payload.members = [{
      uid,
      permissions: ['read', 'write']
    }];

    const { insertedId } = await db.collection(COLLECTION.BOARDS).insertOne(payload);
    const board = await db.collection(COLLECTION.BOARDS).findOne({ _id: insertedId }) as any;

    delete board._id;

    res.json({ board });
  } else if (method === 'PUT') {
    const payload = req.body;
    const board: Board = payload.board;
    const { boardId } = board;

    await db.collection(COLLECTION.BOARDS).updateOne({ boardId }, { $set: board });

    res.json({ success: true });
  }
};

export const getBoardById = async (boardId: number) => {
  const { db } = await connectToDatabase();
  const boards = await db.collection(COLLECTION.BOARDS).aggregate([{ $project: { _id: 0 } }, { $match: { boardId } }]).toArray();

  return boards[0];
};

export const getBoardsQuery = (uid: string) => {
  return { $or: [{ 'members.uid': { $eq: uid  }}, { isPublic: true }]};
};

const getBoardId = async (): Promise<number> => {
  const { db } = await connectToDatabase();

  await db.collection(COLLECTION.COUTERS).updateOne({ collection: COLLECTION.BOARDS }, { $inc: { seq_value: 1 } });

  const boardsCounter = await db.collection(COLLECTION.COUTERS).findOne({ collection: COLLECTION.BOARDS });
  const seq_value = boardsCounter?.seq_value as number;

  return seq_value;
};

export default boardAPI;
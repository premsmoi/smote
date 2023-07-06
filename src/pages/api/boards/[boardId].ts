import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';
import { queryStringToNumber } from '../../../utils/request';
import { getNotesByBoardId } from '../notes';
import { getBoardsQuery } from './index';
import { unauthorized } from '../response';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const boardWithIdAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method, query } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!query.boardId) {
    return res.json({ success: false });
  }

  const boardId = queryStringToNumber(query.boardId);

  if (!session?.user?.uid) return unauthorized(res);

  if (method === 'GET') {
    const { uid } = session.user;
    const aggregate = [ { $project: { _id: 0 } }, { $match: { ...getBoardsQuery(uid), boardId } } ]
    const boards = await db.collection(COLLECTION.BOARDS).aggregate(aggregate).toArray() as Board[];
    const notes = await getNotesByBoardId(boardId) as Note[];
    const board = boards[0];

    if (board) {
      board.notes = notes;
    } else {
      return unauthorized(res);
    }

    res.json({ board });
  } else if (method === 'DELETE') {
    await db.collection(COLLECTION.NOTES).deleteMany({ boardId });
    await db.collection(COLLECTION.BOARDS).deleteOne({ boardId });

    return res.json({ success: true });
  }
};

export default boardWithIdAPI;
import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';
import { queryStringToNumber } from '../../../utils/request';
import { getNotesByBoardId } from '../notes';

const boardWithIdAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method, query } = req;
  const boardId = queryStringToNumber(query.boardId);

  if (method === 'GET') {
    const boards = await db.collection(COLLECTION.BOARDS).aggregate([ { $project: { _id: 0 } }, { $match: { boardId } } ]).toArray();
    const notes = await getNotesByBoardId(boardId);
    const board = boards[0];

    if (board) {
      board.notes = notes;
    }

    res.json({ board });
  } else if (method === 'DELETE') {
    await db.collection(COLLECTION.NOTES).deleteMany({ boardId });
    await db.collection(COLLECTION.BOARDS).deleteOne({ boardId });

    res.json({ success: true });
  }
};

export default boardWithIdAPI;
import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method, body: payload } = req;
  const noteId = payload.noteId;

  if (method === 'POST') {
    const { insertedId } = await db.collection(COLLECTION.NOTES).insertOne({ ...payload });
    const note = await db.collection(COLLECTION.NOTES).findOne({ _id: insertedId }) as any;

    delete note._id;

    res.json({ note });
  }
  else if (method === 'PUT') {
    await db.collection(COLLECTION.NOTES).updateOne({ noteId }, payload);
    const note = await getNoteById(noteId);

    res.json({ note });
  }
};

export const getNoteById = async (noteId: number) => {
  const { db } = await connectToDatabase();
  const notes = await db.collection(COLLECTION.NOTES).aggregate([{ $project: { _id: 0 } }, { $match: { noteId } }]).toArray();

  return notes[0];
}

export const getNotesByBoardId = async (boardId: number) => {
  const { db } = await connectToDatabase();
  const notes = await db.collection(COLLECTION.NOTES).aggregate([{ $project: { _id: 0 } }, { $match: { boardId } }]).toArray();

  return notes;
}
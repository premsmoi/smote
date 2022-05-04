import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';

const noteAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method, body: payload } = req;

  if (method === 'POST') {
    const noteId = await getNoteId();

    payload.noteId = noteId;
    
    const { insertedId } = await db.collection(COLLECTION.NOTES).insertOne(payload);
    const note = await db.collection(COLLECTION.NOTES).findOne({ _id: insertedId }) as any;

    delete note._id;

    res.json({ note });
  }
  else if (method === 'PUT') {
    let note = payload.note;
    const noteId = note.noteId;

    await db.collection(COLLECTION.NOTES).updateOne({ noteId }, { $set: note });

    note = await getNoteById(noteId);

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

const getNoteId = async (): Promise<number> => {
  const { db } = await connectToDatabase();

  await db.collection(COLLECTION.COUTERS).updateOne({ collection: COLLECTION.NOTES }, { $inc: { seq_value: 1 } });
    const notesCounter = await db.collection(COLLECTION.COUTERS).findOne({ collection: COLLECTION.NOTES });
    const seq_value = notesCounter?.seq_value as number;

  return seq_value;
}

export default noteAPI;
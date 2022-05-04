import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method, body: payload } = req;

  if (method === 'POST') {
    
  }
  else if (method === 'PUT') {

  }
};

export const addNewUserProfile = async (user: UserProfile): Promise<boolean> => {
  const { db } = await connectToDatabase();
  const checkedUser = await db.collection(COLLECTION.USERS).findOne({ uid: user.uid }) as any;

  if (checkedUser) {
    return false;
  }

  await db.collection(COLLECTION.USERS).insertOne({ ...user });

  return true;
}

export const getUserByUid = async (uid: string) => {
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
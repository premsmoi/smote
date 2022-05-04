import { NextApiRequest, NextApiResponse } from 'next/types';
import { COLLECTION } from '../../../const';
import { connectToDatabase } from '../../../utils/database';

const userAPI = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default userAPI;

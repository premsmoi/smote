import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectToDatabase } from '../../../utils/database';

const COLLECTION_NAME = 'notes';

const noteWithIdAPI = async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    const { method, query: { noteId } } = req;

    if (method === 'DELETE') {
        if (typeof noteId !== 'string') return;

        const a = await db.collection(COLLECTION_NAME).deleteOne({ noteId: parseInt(noteId) });
        res.status(200).json({ success: true });
    }
};

export default noteWithIdAPI;
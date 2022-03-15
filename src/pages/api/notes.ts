import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectToDatabase } from '../../utils/database';

const COLLECTION_NAME = 'notes';
const AGGREGATE = [ { $project: { noteId: "$_id", _id: 0, text: 1, color: 1 }} ];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { method } = req;
  let payload: any = {};

  try {
    payload = JSON.parse(req.body);
  } catch(e) {

  }

  if (method === 'GET') {
    const notes = await db
        .collection(COLLECTION_NAME)
        .aggregate(AGGREGATE)
        .toArray();

    res.json(notes);
  } else if (method === 'POST') {
    const { insertedId } = await db.collection(COLLECTION_NAME).insertOne({ ...payload });
    const notes = await db
        .collection(COLLECTION_NAME).aggregate([ ...AGGREGATE, { $match: { noteId: insertedId } }]).toArray()

    res.json({ note: notes[0] })
  } else if (method === 'PUT') {
    const { upsertedId } = await db.collection(COLLECTION_NAME).updateOne({ _id: payload.noteId }, payload);
    const notes = await db
        .collection(COLLECTION_NAME).aggregate([ ...AGGREGATE, { $match: { _id: upsertedId } }]).toArray()
    res.json({ note: notes[0] })
  }

};
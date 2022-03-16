import { Db, MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://premsmoi:prem393390@cluster0.vnb6g.mongodb.net';
const MONGODB_DB = 'smote';

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
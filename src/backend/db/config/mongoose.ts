import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://codeconnect123:codeconnect123@cluster0.ocxugzh.mongodb.net/mydatabase?retryWrites=true&w=majority';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

interface MongooseOptions {
  serverSelectionTimeoutMS?: number;
  socketTimeoutMS?: number;
  family?: number;
  connectTimeoutMS?: number;
}

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = { conn: null, promise: null };

const dbConnect = async (retries = 5): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: MongooseOptions = {
      serverSelectionTimeoutMS: 30000, // Increased to 30 seconds
      socketTimeoutMS: 75000, // Increased to 75 seconds
      family: 4,
      connectTimeoutMS: 30000 // Added connect timeout
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    if (retries > 0) {
      console.log(`Connection attempt failed. Retrying... (${retries} attempts left)`);
      cached.promise = null;
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      return dbConnect(retries - 1);
    }
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  return cached.conn;
};

export default dbConnect;
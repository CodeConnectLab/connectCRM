import mongoose from 'mongoose';

interface MongooseOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  serverSelectionTimeoutMS?: number;
  socketTimeoutMS?: number;
  family?: number;
}
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nextcrm';
console.log('MONGO_URI', MONGO_URI);

const dbConnect = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }
  return mongoose.connect(MONGO_URI!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  });
};

export default dbConnect;

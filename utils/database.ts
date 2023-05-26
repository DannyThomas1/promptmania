import mongoose from 'mongoose';

let isConnected = false; //track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Mongodb is already connected');
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error('No mongodb uri provided');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

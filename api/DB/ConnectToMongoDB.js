import mongoose from 'mongoose';
export const ConnectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};
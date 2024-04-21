import express from 'express';
import dotenv from 'dotenv';
import { ConnectToMongoDB } from './DB/ConnectToMongoDB.js';
import userRouter from './Routers/User.route.js';


dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get('/', (_, res) => {

    // server is running in http://localhost:5050
    res.send('Welcome to Users API');
});

app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    ConnectToMongoDB();
});
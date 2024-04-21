import express from 'express';
import { login, logout, signup } from '../Controllers/User.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;
import { Router } from 'express';
// import authMiddleware from '../middleware/auth.middleware';
import {authController,signIn,signUp} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/signIn', signIn);
authRouter.post('/signUp', signUp);

export default authRouter;
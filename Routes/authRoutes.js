import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/authController.js';

const authRouter = Router();

// Register Route
authRouter.post('/register', registerUser);

// Login Route
authRouter.post('/login', loginUser);

export default authRouter;

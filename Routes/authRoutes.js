import { Router } from 'express';
import { registerUser, loginUser, verifyOtp } from '../Controllers/authController.js';

const authRouter = Router();

// Register Route
authRouter.post('/register', registerUser);

// Login Route
authRouter.post('/login', loginUser);

// verify OTP Route
authRouter.post('/verify', verifyOtp);

export default authRouter;

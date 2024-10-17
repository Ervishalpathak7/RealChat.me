import { Router } from 'express';
import {
    registerUser,
    loginUser,
    verifyOtp,
    checkAuth
} from '../Controllers/authController.js';
import useAuth from '../Middlewares/authMiddleware.js';

const authRouter = Router();

// Register Route
authRouter.post('/register', registerUser);

// Login Route
authRouter.post('/login', loginUser);

// Check Auth Status Route
authRouter.get('/status', useAuth, checkAuth); // More explicit naming

// Verify OTP Route
authRouter.post('/verify', verifyOtp); // More explicit naming

export default authRouter;

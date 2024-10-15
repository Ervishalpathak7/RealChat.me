import jwt from 'jsonwebtoken';
import User from '../Schemas/User.js'; // Ensure the correct path to your User model

// Middleware to check if the user is authenticated
export const authenticateUser = async (req, res, next) => {
    const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

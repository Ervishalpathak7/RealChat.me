import { verifyToken } from '../Utils/Jwt.js';


const useAuth = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // Verify the token
        const user = verifyToken(token);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Move to the next middleware/route handler

    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Token verification failed" });
    }
};

export default useAuth;

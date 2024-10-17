import jwt from 'jsonwebtoken';

// Generate a JWT token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
    
        throw new Error("Invalid or expired token");
    }
};


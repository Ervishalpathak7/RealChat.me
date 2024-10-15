import User from '../Schemas/User.js';
import { generateToken } from '../Utils/Jwt.js';



// Register User
export const registerUser = async (req, res) => {
  const { name , username, email, password } = req.body;
  try {

    // Check if all fields are entered
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Check for existing user by email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // Create a new user
    const user = await User.create({ name , username, email, password });

    // Generate JWT token
    const token = generateToken(user._id);


    // Send the token in a cookie and return success
    res.status(201)
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ user: { id: user._id, name : user.name ,  username: user.username, email: user.email } });


  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if all fields are entered
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Check if user exists by email
    const user = await User.findOne({ email }).select('+password'); // Ensure password is selected for comparison
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the entered password with the hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send the token in a cookie and return success
    res.status(200)
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600000, // 1 hour
      })
      .json({ user: { id: user._id, name : user.name , username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    // Clear the authToken cookie
    res.clearCookie('authToken').json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

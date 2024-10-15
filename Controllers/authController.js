import User from "../Schemas/User.js";
import { generateToken } from "../Utils/Jwt.js";
import { generateOtp } from "../Utils/otp.js";
import { sendEmail } from "../Utils/mail.js";

// Register User
export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, username, email, password });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    try {
      await sendEmail({ to: user.email, otp : otp });
    } catch (err) {
      console.error("Error sending email:", err);
      return res.status(500).json({ message: "Error sending OTP. Please try again." });
    }

    res.status(201).json({ message: "User registered, OTP sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if OTP is expired
    if (Date.now() > user.otpExpires) {
      const newOtp = generateOtp();
      user.otp = newOtp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // New OTP expires in 10 minutes
      await user.save();


      // Send new OTP
      try {
        await sendEmail({ to: user.email, otp: otp });
      } catch (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending OTP. Please try again." });
      }

      // Return error message
      return res
        .status(400)
        .json({
          message: "OTP expired. A new OTP has been sent to your email.",
        });
    }

    // Check if OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // clear OTP and OTP expiry
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);


    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Email verified successfully!",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      // Send OTP to email
      const otp = generateOtp();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      await user.save();

      try {
        await sendEmail({ to: user.email, otp });
      }
      catch (err) {
        console.error("Error sending email:", err);
        return res.status(500).json({ message: "Error sending OTP. Please try again." });
      }

      return res
        .status(403)
        .json({ message: "User not verified. Please verify your email." });
    }
    
    const token = generateToken(user._id);

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      })
      .json({
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

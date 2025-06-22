import Auth from "../model/auth.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Redis from "ioredis";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signUp = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  try {
    // Validate input
    if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

   

    // Create and save the user
    const newUser = await Auth.create({
      email,
      firstname,
      lastname,
      password
    });

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    // Return success response
    return res.status(201).json({ success: true, 
      _id: newUser._id, 
      email: newUser.email, 
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      role: newUser.role
    });

  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({success: false, message: "Internal Server Error", error: error.message });
  }
};

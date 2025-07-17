import Auth from "../model/auth.model.js";
import jwt from 'jsonwebtoken';

import { redis } from '../lib/redis.js';


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
  try {
    const { email, name, password } = req.body;
    
    // Check if user exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({message: "Email already exists"});
    }
    // Create and save the user
    const newUser = await Auth.create({
      email,
      name,
      password,
      status: 'online',
      lastLogin: new Date(),
    });

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);

    setCookies(res, accessToken, refreshToken);


    // Return success response
    return res.status(201).json({ success: true, 
      _id: newUser._id, 
      email: newUser.email, 
      username: newUser.name,
      role: newUser.role,
      status: 'online',
      lastLogin: new Date(),
    });

  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({success: false, message: "Internal Server Error", error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email , password} = req.body;

    const user = await Auth.findOne({ email});

    if(user && (await user.comparePassword(password))) {

		user.lastLogin = new Date();
    await user.save();

      await Auth.findByIdAndUpdate(user._id, {
        status: 'online',
        lastLogin: new Date(),
      });

      const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}  
  } catch (error) {
    console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		
			await Auth.findByIdAndUpdate(decoded.userId, { status: 'offline'});
		}
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		await Auth.findByIdAndUpdate(decoded.userId, { lastLogin: new Date() });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getActiveUsersAndAllUsers = async (req, res) => {
  try {

    const [activeUsers, allUsers] = await Promise.all([
      Auth.find({ status: "online" }),
      Auth.find({})
    ]);

    // make this to not count the admin
    /* const activeUsers = activeUsersRaw.filter(user => user.role !== "admin"); */

    res.status(200).json({
      success: true,
      totalUsers: allUsers.length,
      activeUserCount: activeUsers.length,
      activeUsers,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getNewUsers = async (req, res) => {
  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const newUsers = await Auth.find({
      createdAt: { $gte: startOfThisMonth }
    });

    res.status(200).json({
      success: true,
      newUserCount: newUsers.length,
      users: newUsers
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



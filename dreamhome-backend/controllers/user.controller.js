import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// ================= CREATE TOKEN =================

const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};


// ================= REGISTER =================

export const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      password,
      city
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      city
    });

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city
      }
    });

  } catch (error) {

    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= LOGIN =================

export const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city
      }
    });

  } catch (error) {

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET PROFILE =================

export const getProfile = async (req, res) => {

  return res.json({
    success: true,
    user: req.user
  });

};


// ================= UPDATE PROFILE =================

export const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phone,
      city
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.city = city || user.city;

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city
      }
    });

  } catch (error) {

    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= LOGOUT =================

export const logoutUser = (req, res) => {

  res.clearCookie("token");

  return res.json({
    success: true,
    message: "Logout successful"
  });

};
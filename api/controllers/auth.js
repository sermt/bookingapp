import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Encrypt password
    const hashedPassword = hashPassword(password);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User has been created" });
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      next(createError(400, "Wrong password or username"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      next(createError(400, "Wrong password or username"));
    }
    const { password, isAdmin, ...otherDetails } = user._doc;
    const token = jwt.sign({ id: user._id, isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};

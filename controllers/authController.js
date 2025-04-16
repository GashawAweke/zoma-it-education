import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js"

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, grade } = req.body

  // Check if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new BadRequestError("Email already in use")
  }

  // Create user
  const user = await User.create({ name, email, password, grade })

  // Create token
  const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  })

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      grade: user.grade,
    },
    token,
  })
}

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body

  // Check if email and password are provided
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }

  // Find user
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  // Check password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  // Create token
  const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  })

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      grade: user.grade,
    },
    token,
  })
}

// Get current user
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password")

  res.status(200).json({ user })
}

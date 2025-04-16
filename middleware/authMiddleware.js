import jwt from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/customErrors.js"

const authMiddleware = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid")
  }

  const token = authHeader.split(" ")[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    // Attach user to request object
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid")
  }
}

export default authMiddleware

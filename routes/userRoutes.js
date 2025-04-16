import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Mock controller functions for development
const updateUserProgress = async (req, res) => {
  const { userId } = req.user
  const { lessonId, completed } = req.body

  // This would normally update the database

  res.status(200).json({ message: "Progress updated successfully" })
}

const getUserAchievements = async (req, res) => {
  const { userId } = req.user

  // Mock data
  const achievements = [
    { id: 1, title: "First Login", description: "Logged in for the first time", date: "2025-04-15", icon: "🏆" },
    { id: 2, title: "Chapter Completed", description: "Completed your first chapter", date: "2025-04-15", icon: "🎯" },
  ]

  res.status(200).json({ achievements })
}

router.put("/progress", authMiddleware, updateUserProgress)
router.get("/achievements", authMiddleware, getUserAchievements)

export default router

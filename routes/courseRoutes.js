import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Mock controller functions for development
const getAllCourses = async (req, res) => {
  // This would normally fetch from the database
  const { grade } = req.query

  // Mock data
  const courses = [
    {
      id: "1",
      title: "Introduction to Computers",
      description: "Learn about basic computer components and their functions.",
      grade: "1-2",
      progress: 75,
      chapters: [
        { id: "1-1", title: "What is a computer?", completed: true },
        { id: "1-2", title: "Computer parts", completed: true },
        { id: "1-3", title: "Using mouse and keyboard", completed: true },
        { id: "1-4", title: "Windows desktop interface", completed: false },
      ],
    },
    {
      id: "2",
      title: "Basic Typing Tutorials",
      description: "Learn proper typing techniques and practice with fun exercises.",
      grade: "1-2",
      progress: 30,
      chapters: [
        { id: "2-1", title: "Keyboard layout", completed: true },
        { id: "2-2", title: "Home row keys", completed: true },
        { id: "2-3", title: "Top row keys", completed: false },
        { id: "2-4", title: "Bottom row keys", completed: false },
      ],
    },
    {
      id: "3",
      title: "Folder Management",
      description: "Learn how to organize your files and folders effectively.",
      grade: "1-2",
      progress: 0,
      chapters: [
        { id: "3-1", title: "Introduction to File Explorer", completed: false },
        { id: "3-2", title: "Creating and saving files", completed: false },
        { id: "3-3", title: "Organizing folders", completed: false },
        { id: "3-4", title: "Copying and moving files", completed: false },
      ],
    },
  ]

  const filteredCourses = grade ? courses.filter((course) => course.grade === grade) : courses

  res.status(200).json({ courses: filteredCourses })
}

const getCourseById = async (req, res) => {
  const { id } = req.params

  // Mock data
  const course = {
    id,
    title: "Introduction to Computers",
    description: "Learn about basic computer components and their functions.",
    chapters: [
      {
        id: "1",
        title: "What is a computer?",
        description: "Understanding the basics of what makes a computer.",
        lessons: [
          { id: "1-1", title: "Definition of a computer", completed: true, duration: "5 min" },
          { id: "1-2", title: "History of computers", completed: false, duration: "8 min" },
          { id: "1-3", title: "Types of computers", completed: false, duration: "6 min" },
        ],
      },
      {
        id: "2",
        title: "Computer parts",
        description: "Identifying the main components of a computer system.",
        lessons: [
          { id: "2-1", title: "Monitor", completed: false, duration: "4 min" },
          { id: "2-2", title: "Keyboard", completed: false, duration: "5 min" },
          { id: "2-3", title: "Mouse", completed: false, duration: "3 min" },
          { id: "2-4", title: "CPU", completed: false, duration: "7 min" },
        ],
      },
      {
        id: "3",
        title: "Using mouse and keyboard",
        description: "Learn how to effectively use input devices.",
        lessons: [
          { id: "3-1", title: "Mouse clicks and movements", completed: false, duration: "6 min" },
          { id: "3-2", title: "Keyboard typing basics", completed: false, duration: "8 min" },
          { id: "3-3", title: "Practice exercises", completed: false, duration: "10 min" },
        ],
      },
    ],
  }

  res.status(200).json({ course })
}

router.get("/", authMiddleware, getAllCourses)
router.get("/:id", authMiddleware, getCourseById)

export default router

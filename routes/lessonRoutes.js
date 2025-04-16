import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Mock controller functions for development
const getLessonById = async (req, res) => {
  const { id } = req.params

  // Mock data
  const lesson = {
    id,
    title: "What is a computer?",
    description: "Learn about the basic definition and purpose of computers.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    content: `
      <p>A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data.</p>
      <p>You may already know that you can use a computer to type documents, send email, play games, and browse the Web. You can also use it to edit or create spreadsheets, presentations, and even videos.</p>
    `,
    quiz: {
      questions: [
        {
          id: "q1",
          text: "What is a computer?",
          options: [
            { id: "a", text: "A mechanical device" },
            { id: "b", text: "An electronic device that processes data" },
            { id: "c", text: "A type of television" },
            { id: "d", text: "A communication tool only" },
          ],
          correctAnswer: "b",
        },
        {
          id: "q2",
          text: "Which of these is NOT something a computer can do?",
          options: [
            { id: "a", text: "Store data" },
            { id: "b", text: "Process information" },
            { id: "c", text: "Think creatively on its own" },
            { id: "d", text: "Display videos" },
          ],
          correctAnswer: "c",
        },
      ],
    },
    nextLessonId: "1-2",
  }

  res.status(200).json({ lesson })
}

router.get("/:id", authMiddleware, getLessonById)

export default router

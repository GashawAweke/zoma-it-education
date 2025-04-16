"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import Button from "../components/ui/button"
import { useToast } from "../components/ui/toaster"

const fetchLesson = async (lessonId) => {
  const { data } = await axios.get(`/api/lessons/${lessonId}`)
  return data.lesson
}

const LessonView = () => {
  const { lessonId } = useParams()
  const { toast } = useToast()
  const [videoCompleted, setVideoCompleted] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showConfetti, setShowConfetti] = useState(false)

  // Mock data for development
  const mockLesson = {
    id: lessonId,
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

  const {
    data: lesson,
    isLoading,
    error,
  } = useQuery(["lesson", lessonId], () => fetchLesson(lessonId), {
    initialData: mockLesson,
    enabled: !!lessonId,
  })

  const handleVideoEnd = () => {
    setVideoCompleted(true)
    toast("Video completed! Now try the quiz.", "success")
  }

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    })
  }

  const handleQuizSubmit = () => {
    const allCorrect = lesson.quiz.questions.every(
      (question) => selectedAnswers[question.id] === question.correctAnswer,
    )

    if (allCorrect) {
      setQuizCompleted(true)
      setShowConfetti(true)
      toast("Congratulations! You completed the quiz successfully!", "success")

      // Create confetti effect
      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
      for (let i = 0; i < 100; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)])
      }

      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    } else {
      toast("Some answers are incorrect. Try again!", "error")
    }
  }

  const createConfetti = (color) => {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.backgroundColor = color
    confetti.style.left = `${Math.random() * 100}vw`
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`
    document.body.appendChild(confetti)

    setTimeout(() => {
      confetti.remove()
    }, 5000)
  }

  const allQuestionsAnswered = lesson?.quiz?.questions?.every((question) => selectedAnswers[question.id])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">Loading lesson...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error loading lesson</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Link to={`/course/${lesson.id.split("-")[0]}`}>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to Course
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Section */}
                <div className="aspect-video">
                  <iframe
                    src={lesson.videoUrl}
                    className="w-full h-full rounded-md"
                    title={lesson.title}
                    allowFullScreen
                    onEnded={handleVideoEnd}
                  ></iframe>
                </div>

                {/* Content Section */}
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                ></div>

                {/* Quiz Section */}
                {videoCompleted && !quizStarted && (
                  <div className="bg-secondary/30 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-semibold mb-4">Ready to test your knowledge?</h3>
                    <Button onClick={() => setQuizStarted(true)}>Start Quiz</Button>
                  </div>
                )}

                {quizStarted && !quizCompleted && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Quiz</h3>

                    {lesson.quiz.questions.map((question) => (
                      <div key={question.id} className="space-y-3">
                        <h4 className="font-medium">{question.text}</h4>
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`p-3 border rounded-md cursor-pointer ${
                                selectedAnswers[question.id] === option.id
                                  ? "border-primary bg-primary/10"
                                  : "hover:bg-secondary/50"
                              }`}
                              onClick={() => handleAnswerSelect(question.id, option.id)}
                            >
                              {option.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Button onClick={handleQuizSubmit} disabled={!allQuestionsAnswered}>
                      Submit Answers
                    </Button>
                  </div>
                )}

                {quizCompleted && (
                  <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-lg text-center">
                    <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
                    <p className="mb-4">You've successfully completed this lesson.</p>

                    {lesson.nextLessonId && (
                      <Link to={`/lesson/${lesson.nextLessonId}`}>
                        <Button>Continue to Next Lesson</Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

export default LessonView

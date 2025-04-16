"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useQuery } from "react-query"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Card, CardContent } from "../components/ui/card"
import Button from "../components/ui/button"

const fetchCourse = async (courseId) => {
  const { data } = await axios.get(`/api/courses/${courseId}`)
  return data.course
}

const CourseView = () => {
  const { gradeId } = useParams()

  // Mock data for development
  const mockCourse = {
    id: gradeId,
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

  const {
    data: course,
    isLoading,
    error,
  } = useQuery(["course", gradeId], () => fetchCourse(gradeId), {
    initialData: mockCourse,
    enabled: !!gradeId,
  })

  const [expandedChapter, setExpandedChapter] = useState(null)

  const toggleChapter = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">Loading course...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">Error loading course</div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
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
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            <div className="space-y-4">
              {course.chapters.map((chapter) => (
                <Card key={chapter.id} className="overflow-hidden">
                  <div
                    className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{chapter.title}</h3>
                      <p className="text-muted-foreground">{chapter.description}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform ${expandedChapter === chapter.id ? "transform rotate-180" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {expandedChapter === chapter.id && (
                    <CardContent>
                      <div className="space-y-3">
                        {chapter.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/lesson/${lesson.id}`}
                            className={`block p-3 border rounded-md hover:bg-secondary/50 transition-colors ${
                              lesson.completed ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-muted-foreground"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CourseView

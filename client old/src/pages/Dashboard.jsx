"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import Button from "../components/ui/button"

const fetchGradeCourses = async (gradeLevel) => {
  const { data } = await axios.get(`/api/courses?grade=${gradeLevel}`)
  return data.courses
}

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("courses")

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery(["courses", user?.grade], () => fetchGradeCourses(user?.grade), {
    // Mock data for development
    initialData: [
      {
        id: "1",
        title: "Introduction to Computers",
        description: "Learn about basic computer components and their functions.",
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
        progress: 0,
        chapters: [
          { id: "3-1", title: "Introduction to File Explorer", completed: false },
          { id: "3-2", title: "Creating and saving files", completed: false },
          { id: "3-3", title: "Organizing folders", completed: false },
          { id: "3-4", title: "Copying and moving files", completed: false },
        ],
      },
    ],
    enabled: !!user?.grade,
  })

  const [achievements, setAchievements] = useState([
    { id: 1, title: "First Login", description: "Logged in for the first time", date: "2025-04-15", icon: "🏆" },
    { id: 2, title: "Chapter Completed", description: "Completed your first chapter", date: "2025-04-15", icon: "🎯" },
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome, {user?.name || "Student"}!</CardTitle>
                <CardDescription>Grade Level: {user?.grade || "Not set"}</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "courses" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    My Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("achievements")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "achievements" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    Achievements
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    Settings
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <div className="md:w-3/4">
            {activeTab === "courses" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Learning Journey</h2>

                {isLoading ? (
                  <div className="text-center py-8">Loading courses...</div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">Error loading courses</div>
                ) : (
                  <div className="space-y-6 learning-path">
                    {courses.map((course, index) => (
                      <div key={course.id} className="learning-node">
                        <Card className={`${course.progress === 0 && index > 0 ? "opacity-70" : ""}`}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle>{course.title}</CardTitle>
                              <div className="text-sm font-medium">{course.progress}% Complete</div>
                            </div>
                            <CardDescription>{course.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              {course.chapters.map((chapter) => (
                                <div
                                  key={chapter.id}
                                  className={`p-3 border rounded-md flex items-center gap-3 ${
                                    chapter.completed ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""
                                  }`}
                                >
                                  {chapter.completed ? (
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
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                  <span>{chapter.title}</span>
                                </div>
                              ))}
                            </div>

                            <div className="mt-6">
                              <Link to={`/course/${course.id}`}>
                                <Button>{course.progress > 0 ? "Continue Learning" : "Start Learning"}</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Achievements</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className="overflow-hidden">
                      <div className="bg-primary/10 p-4 flex items-center justify-center">
                        <span className="text-4xl">{achievement.icon}</span>
                      </div>
                      <CardHeader>
                        <CardTitle>{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Earned on {achievement.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          defaultValue={user?.name}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          defaultValue={user?.email}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="grade" className="text-sm font-medium">
                          Grade Level
                        </label>
                        <select
                          id="grade"
                          defaultValue={user?.grade}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="1-2">Grades 1-2</option>
                          <option value="3-4">Grades 3-4</option>
                          <option value="5-6">Grades 5-6</option>
                        </select>
                      </div>

                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

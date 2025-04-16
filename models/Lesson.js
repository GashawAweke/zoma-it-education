import mongoose from "mongoose"

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a lesson title"],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Please provide a lesson description"],
    maxlength: 500,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  chapterId: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  quiz: {
    questions: [
      {
        text: {
          type: String,
          required: true,
        },
        options: [
          {
            id: String,
            text: String,
          },
        ],
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  nextLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Lesson", LessonSchema)

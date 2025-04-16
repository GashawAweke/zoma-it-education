import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a course title"],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Please provide a course description"],
    maxlength: 500,
  },
  grade: {
    type: String,
    enum: ["1-2", "3-4", "5-6"],
    required: [true, "Please specify a grade level"],
  },
  order: {
    type: Number,
    required: true,
  },
  chapters: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("Course", CourseSchema)

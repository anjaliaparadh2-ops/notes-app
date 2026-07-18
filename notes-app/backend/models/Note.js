const mongoose = require("mongoose");

// The exact 4 subjects supported by the app.
// Keeping this centralized means adding a subject later is a one-line change.
const SUBJECTS = [
  "Electrical Circuit Analysis",
  "Signals & Systems",
  "Analog and Digital Electronics",
  "Numerical Methods for Computer Programming",
];

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Display title is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      enum: SUBJECTS,
    },
    chapter: {
      type: String,
      required: [true, "Chapter name is required"],
      trim: true, // e.g. "Chapter 1", "Chapter 2: Network Theorems"
    },
    fileName: {
      type: String, // the name the file is stored under on disk
      required: true,
    },
    originalName: {
      type: String, // the original uploaded file name
      required: true,
    },
    fileUrl: {
      type: String, // full public URL to fetch/view the PDF
      required: true,
    },
    fileSize: {
      type: Number, // bytes
      default: 0,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Helpful index for the most common query pattern (filter by subject, sort by chapter)
NoteSchema.index({ subject: 1, chapter: 1 });

module.exports = mongoose.model("Note", NoteSchema);
module.exports.SUBJECTS = SUBJECTS;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const notesRoutes = require("./routes/notes");

const app = express();

// ---------------------------------------------------------------------------
// Connect to MongoDB
// ---------------------------------------------------------------------------
connectDB();

// ---------------------------------------------------------------------------
// Core middleware
// ---------------------------------------------------------------------------
app.use(cors()); // In production, restrict this to your frontend's origin
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ extended: true, limit: "1gb" }));

// Serve uploaded PDFs statically so the frontend can view/download them directly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use("/api", notesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "📚 Notes Sharing API is running" });
});

// ---------------------------------------------------------------------------
// Central error handler (catches Multer "file too large" and other errors
// that slip past the route-level try/catch)
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ---------------------------------------------------------------------------
// IMPORTANT for large (up to 1GB) uploads:
// Node's default HTTP header/socket timeouts can kill slow uploads over
// slower connections. These raise the ceiling so big files have time to finish.
// ---------------------------------------------------------------------------
server.timeout = 30 * 60 * 1000; // 30 minutes
server.headersTimeout = 30 * 60 * 1000 + 5000;
server.requestTimeout = 30 * 60 * 1000;

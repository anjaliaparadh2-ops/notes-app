const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Note = require("../models/Note");
const upload = require("../config/upload");

// ---------------------------------------------------------------------------
// POST /api/upload
// Admin uploads a PDF + assigns Subject, Chapter, Display Title.
// Protected with a simple shared-secret header (x-admin-secret) — swap this
// for real auth (JWT/session) later without touching the rest of the route.
// ---------------------------------------------------------------------------
router.post("/upload", (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) {
      // Multer errors (file too large, wrong type, etc.) land here
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const adminSecret = req.headers["x-admin-secret"];
      if (adminSecret !== process.env.ADMIN_SECRET) {
        // Clean up the file that was already written to disk before rejecting
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(401).json({ success: false, message: "Invalid admin credentials" });
      }

      const { title, subject, chapter } = req.body;

      if (!req.file) {
        return res.status(400).json({ success: false, message: "PDF file is required" });
      }
      if (!title || !subject || !chapter) {
        fs.unlink(req.file.path, () => {});
        return res
          .status(400)
          .json({ success: false, message: "title, subject, and chapter are all required" });
      }

      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

      const note = await Note.create({
        title,
        subject,
        chapter,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        fileUrl,
        fileSize: req.file.size,
      });

      return res.status(201).json({ success: true, data: note });
    } catch (error) {
      if (req.file) fs.unlink(req.file.path, () => {});
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error while saving note" });
    }
  });
});

// ---------------------------------------------------------------------------
// GET /api/notes/:subject
// Fetch all notes for a given subject, grouped by chapter.
// Subject is passed URL-encoded from the frontend dropdown.
// ---------------------------------------------------------------------------
router.get("/notes/:subject", async (req, res) => {
  try {
    const subject = decodeURIComponent(req.params.subject);

    const notes = await Note.find({ subject }).sort({ chapter: 1, createdAt: -1 });

    // Group flat note list into { "Chapter 1": [...], "Chapter 2": [...] }
    const grouped = notes.reduce((acc, note) => {
      if (!acc[note.chapter]) acc[note.chapter] = [];
      acc[note.chapter].push(note);
      return acc;
    }, {});

    return res.json({ success: true, subject, count: notes.length, chapters: grouped });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error while fetching notes" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/notes
// Fetch every note (useful for an admin dashboard / overview).
// ---------------------------------------------------------------------------
router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error while fetching notes" });
  }
});

// ---------------------------------------------------------------------------
// DELETE /api/notes/:id
// Optional admin utility to remove a note + its file.
// ---------------------------------------------------------------------------
router.delete("/notes/:id", async (req, res) => {
  try {
    const adminSecret = req.headers["x-admin-secret"];
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const filePath = path.join(__dirname, "..", "uploads", note.fileName);
    fs.unlink(filePath, () => {}); // best-effort cleanup

    return res.json({ success: true, message: "Note deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error while deleting note" });
  }
});

module.exports = router;

import axios from "axios";

// Point this at your deployed backend URL in production
// (e.g. via an .env file: VITE_API_BASE_URL=https://api.yourdomain.com/api)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getNotesBySubject = (subject) =>
  api.get(`/notes/${encodeURIComponent(subject)}`);

export const getAllNotes = () => api.get("/notes");

export const uploadNote = (formData, adminSecret, onUploadProgress) =>
  api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-admin-secret": adminSecret,
    },
    onUploadProgress,
  });

export const deleteNote = (id, adminSecret) =>
  api.delete(`/notes/${id}`, {
    headers: { "x-admin-secret": adminSecret },
  });

export default api;

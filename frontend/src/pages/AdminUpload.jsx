import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadNote } from "../api/api";
import { SUBJECTS } from "../config/subjects";
import { ui } from "../config/uiConfig";

const initialForm = { title: "", subject: SUBJECTS[0], chapter: "", adminSecret: "" };

export default function AdminUpload() {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!file) {
      setStatus({ type: "error", message: "Please choose a PDF file." });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", form.title);
    formData.append("subject", form.subject);
    formData.append("chapter", form.chapter);

    setSubmitting(true);
    setProgress(0);

    try {
      await uploadNote(formData, form.adminSecret, (evt) => {
        if (evt.total) {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        }
      });
      setStatus({ type: "success", message: "Note uploaded successfully!" });
      setForm(initialForm);
      setFile(null);
      e.target.reset?.();
    } catch (err) {
      const message = err.response?.data?.message || "Upload failed. Please try again.";
      setStatus({ type: "error", message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${ui.container} py-10 sm:py-14 flex-1 max-w-2xl`}>
      <h1 className={ui.heading1}>Admin: Upload Notes</h1>
      <p className={`${ui.mutedText} mt-2`}>
        Upload a PDF and assign its subject, chapter, and display title. Files up to 1GB are
        supported.
      </p>

      <form onSubmit={handleSubmit} className={`${ui.card} ${ui.cardPadding} mt-8 space-y-5`}>
        <div>
          <label className={ui.label}>Display Title</label>
          <input
            className={ui.input}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Node Voltage Analysis - Full Notes"
            required
          />
        </div>

        <div>
          <label className={ui.label}>Subject</label>
          <select
            className={ui.input}
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={ui.label}>Chapter Name</label>
          <input
            className={ui.input}
            name="chapter"
            value={form.chapter}
            onChange={handleChange}
            placeholder="e.g. Chapter 1"
            required
          />
        </div>

        <div>
          <label className={ui.label}>PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className={ui.input}
            required
          />
        </div>

        <div>
          <label className={ui.label}>Admin Secret</label>
          <input
            type="password"
            className={ui.input}
            name="adminSecret"
            value={form.adminSecret}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
          />
        </div>

        {submitting && (
          <div>
            <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={`${ui.mutedText} mt-1`}>{progress}% uploaded — large files may take a while</p>
          </div>
        )}

        {status.message && (
          <p className={status.type === "error" ? "text-red-600 text-sm" : "text-green-600 text-sm"}>
            {status.message}
          </p>
        )}

        <button type="submit" disabled={submitting} className={`${ui.btnAccent} w-full`}>
          <FaCloudUploadAlt />
          {submitting ? "Uploading…" : "Upload Note"}
        </button>
      </form>
    </div>
  );
}

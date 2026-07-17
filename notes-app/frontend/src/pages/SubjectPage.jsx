import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaFilePdf, FaDownload, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { getNotesBySubject } from "../api/api";
import { fromSlug } from "../config/subjects";
import { ui } from "../config/uiConfig";

function formatBytes(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export default function SubjectPage() {
  const { subjectSlug } = useParams();
  const subject = fromSlug(subjectSlug);

  const [chapters, setChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!subject) return;

    let isMounted = true;
    setLoading(true);
    setError("");

    getNotesBySubject(subject)
      .then((res) => {
        if (isMounted) setChapters(res.data.chapters || {});
      })
      .catch(() => {
        if (isMounted) setError("Couldn't load notes right now. Please try again shortly.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [subject]);

  if (!subject) {
    return (
      <div className={`${ui.container} py-16 text-center`}>
        <h1 className={ui.heading1}>Subject not found</h1>
        <Link to="/" className={`${ui.btnPrimary} mt-6 inline-flex`}>
          <FaArrowLeft /> Back to home
        </Link>
      </div>
    );
  }

  const chapterNames = Object.keys(chapters).sort();

  return (
    <div className={`${ui.container} py-10 sm:py-14 flex-1`}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-primary mb-4">
        <FaArrowLeft size={12} /> Back to all subjects
      </Link>

      <h1 className={ui.heading1}>{subject}</h1>
      <p className={`${ui.mutedText} mt-2`}>Notes organized by chapter</p>

      <div className="mt-8 space-y-8">
        {loading && (
          <div className={`${ui.card} ${ui.cardPadding} text-center ${ui.mutedText}`}>
            Loading notes…
          </div>
        )}

        {!loading && error && (
          <div className={`${ui.card} ${ui.cardPadding} text-center text-red-600`}>{error}</div>
        )}

        {!loading && !error && chapterNames.length === 0 && (
          <div className={`${ui.card} ${ui.cardPadding} text-center ${ui.mutedText}`}>
            No notes have been uploaded for this subject yet. Check back soon!
          </div>
        )}

        {!loading &&
          !error &&
          chapterNames.map((chapterName) => (
            <div key={chapterName}>
              <h2 className={`${ui.heading2} mb-3`}>{chapterName}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters[chapterName].map((note) => (
                  <div
                    key={note._id}
                    className={`${ui.card} ${ui.cardPadding} flex items-start justify-between gap-4`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                        <FaFilePdf size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-text-main truncate">{note.title}</p>
                        <p className={ui.mutedText}>{formatBytes(note.fileSize)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                      <a
                        href={note.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ui.btnOutline} !px-3 !py-2 text-xs`}
                        title="View PDF"
                      >
                        <FaExternalLinkAlt size={12} /> View
                      </a>
                      <a
                        href={note.fileUrl}
                        download={note.originalName}
                        className={`${ui.btnPrimary} !px-3 !py-2 text-xs`}
                        title="Download PDF"
                      >
                        <FaDownload size={12} /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

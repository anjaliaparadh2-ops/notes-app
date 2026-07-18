import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";
import { SUBJECTS, toSlug } from "../config/subjects";
import { ui } from "../config/uiConfig";

/**
 * variant:
 *  - "navbar": compact button + dropdown panel, for desktop top nav
 *  - "mobile": flat list of links, used inside the burger menu
 *  - "hero"  : large, prominent <select>-style dropdown for the homepage
 */
export default function SubjectDropdown({ variant = "navbar", onNavigate }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSubject = (subject) => {
    setOpen(false);
    if (onNavigate) onNavigate();
    navigate(`/subject/${toSlug(subject)}`);
  };

  // --- Mobile: flat stacked links ---
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2 pl-1">
        <span className={`${ui.mutedText} uppercase tracking-wide text-xs font-semibold`}>
          Subjects
        </span>
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            onClick={() => goToSubject(subject)}
            className="text-left text-white/90 hover:text-white text-sm py-1"
          >
            {subject}
          </button>
        ))}
      </div>
    );
  }

  // --- Hero: large prominent dropdown for the homepage ---
  if (variant === "hero") {
    return (
      <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between rounded-xl border-2 border-primary/20 bg-white px-5 py-4 text-left shadow-card hover:shadow-card-hover transition"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-primary font-heading font-semibold text-base sm:text-lg">
            Select your subject to get started
          </span>
          <HiChevronDown
            className={`text-primary text-xl transition-transform shrink-0 ml-2 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-30 mt-2 w-full rounded-xl border border-border bg-surface shadow-card-hover overflow-hidden"
          >
            {SUBJECTS.map((subject) => (
              <li key={subject}>
                <button
                  onClick={() => goToSubject(subject)}
                  className="w-full text-left px-5 py-3.5 text-sm sm:text-base text-text-main hover:bg-surface-alt border-b border-border last:border-b-0 transition-colors"
                >
                  {subject}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // --- Navbar (default): compact dropdown for desktop ---
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Subjects
        <HiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-3 w-72 rounded-lg border border-border bg-surface shadow-card-hover overflow-hidden"
        >
          {SUBJECTS.map((subject) => (
            <li key={subject}>
              <button
                onClick={() => goToSubject(subject)}
                className="w-full text-left px-4 py-3 text-sm text-text-main hover:bg-surface-alt border-b border-border last:border-b-0 transition-colors"
              >
                {subject}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

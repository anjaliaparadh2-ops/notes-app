import { ui } from "../config/uiConfig";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className={`${ui.container} py-6 flex flex-col sm:flex-row items-center justify-between gap-2`}>
        <p className={ui.mutedText}>© {new Date().getFullYear()} StudyShelf. Built for students.</p>
        <p className={ui.mutedText}>Notes shared for academic use only.</p>
      </div>
    </footer>
  );
}

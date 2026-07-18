import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa";
import SubjectDropdown from "./SubjectDropdown";
import { ui } from "../config/uiConfig";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className={`${ui.container} flex items-center justify-between h-16`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-heading font-bold text-lg">
          <FaBookOpen className="text-xl" />
          <span>StudyShelf</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-white/90 hover:text-white transition">
            Home
          </Link>
          <SubjectDropdown variant="navbar" />
          <Link
            to="/admin/upload"
            className="text-sm font-medium text-white/90 hover:text-white transition"
          >
            Admin
          </Link>
        </nav>

        {/* Mobile burger button */}
        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile collapsible menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary-dark border-t border-white/10">
          <div className={`${ui.container} py-4 flex flex-col gap-4`}>
            <Link
              to="/"
              className="text-white/90 hover:text-white text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <SubjectDropdown variant="mobile" onNavigate={() => setMobileOpen(false)} />

            <Link
              to="/admin/upload"
              className="text-white/90 hover:text-white text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Admin Upload
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

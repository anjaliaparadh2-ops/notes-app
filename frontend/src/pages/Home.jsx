import { Link } from "react-router-dom";
import { FaBook, FaBolt, FaChartLine } from "react-icons/fa";
import SubjectDropdown from "../components/SubjectDropdown";
import { SUBJECTS, toSlug } from "../config/subjects";
import { ui } from "../config/uiConfig";

const icons = [FaBolt, FaChartLine, FaBook, FaBook];

export default function Home() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className={`${ui.container} py-14 sm:py-20 text-center`}>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need, one shelf away.
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Clean, organized lecture notes and chapter PDFs for your core engineering
            subjects — find what you need in seconds.
          </p>

          <div className="mt-8 sm:mt-10">
            <SubjectDropdown variant="hero" />
          </div>
        </div>
      </section>

      {/* Subject grid */}
      <section className={`${ui.container} py-12 sm:py-16`}>
        <h2 className={`${ui.heading2} mb-6 text-center sm:text-left`}>Browse by Subject</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {SUBJECTS.map((subject, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Link
                key={subject}
                to={`/subject/${toSlug(subject)}`}
                className={`${ui.card} ${ui.cardPadding} flex items-start gap-4 group`}
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text-main">{subject}</h3>
                  <p className={`${ui.mutedText} mt-1`}>
                    Chapter-wise notes, formulas & solved problems.
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

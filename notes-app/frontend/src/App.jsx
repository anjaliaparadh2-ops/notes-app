import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SubjectPage from "./pages/SubjectPage";
import AdminUpload from "./pages/AdminUpload";
import { ui } from "./config/uiConfig";

export default function App() {
  return (
    <div className={ui.page}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:subjectSlug" element={<SubjectPage />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route
          path="*"
          element={
            <div className={`${ui.container} py-20 text-center flex-1`}>
              <h1 className={ui.heading1}>404 — Page not found</h1>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col overscroll-y-none">
      <Header showPhotos showAbout />

      <div className="pt-28 sm:pt-14 pb-16 flex-1 flex items-center">
        <Projects />
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

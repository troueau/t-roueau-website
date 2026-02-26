import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";

const projectList: {
  title: string;
  url: string;
  descriptionKey: TranslationKey;
}[] = [
  {
    title: "Flavie Herbreteau",
    url: "https://flavieherbreteau.com",
    descriptionKey: "projects.flavie.description",
  },
  {
    title: "Shana Herbreteau",
    url: "https://shanaherbreteau.com",
    descriptionKey: "projects.shana.description",
  },
  {
    title: "Martin Adeline",
    url: "https://martinadeline.com",
    descriptionKey: "projects.martin.description",
  },
];

const ProjectCard = ({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition duration-300 card-shadow hover:glow-shadow">
      <div className="relative w-full h-44 overflow-hidden bg-muted">
        <div
          style={{
            width: "400%",
            height: "400%",
            transform: "scale(0.25)",
            transformOrigin: "top left",
          }}>
          <iframe
            src={url}
            title={`Aperçu de ${title}`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
            sandbox="allow-same-origin"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/80 pointer-events-none" />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300 pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ touchAction: "none", pointerEvents: "auto" }}
        />
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
            {title}
          </span>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
          <p className="text-xs text-primary/60 mt-2 truncate">
            {url.replace("https://", "")}
          </p>
        </div>
        <ExternalLink className="shrink-0 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
      </div>
    </a>
  );
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto px-6">
      <span className="flex justify-center font-semibold text-3xl text-center mb-2 text-foreground">
        {t("projects.title")}
      </span>
      <p className="text-center text-muted-foreground text-sm mb-20">
        {t("projects.subtitle")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {projectList.map((project) => (
          <ProjectCard
            key={project.url}
            title={project.title}
            url={project.url}
            description={t(project.descriptionKey)}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;

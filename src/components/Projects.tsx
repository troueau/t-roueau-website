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
  {
    title: "Github",
    url: "https://github.com/troueau",
    descriptionKey: "projects.github.description",
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
        {url.includes("github.com") ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 98 96"
              className="w-20 h-20 text-foreground/80 fill-current"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
          </div>
        ) : (
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
        )}
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
      <p className="text-center text-muted-foreground text-sm mb-20 line-clamp-1">
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

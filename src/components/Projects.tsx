import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";

const projectList: {
  title: string;
  url: string;
  descriptionKey: TranslationKey;
  screenshot?: string;
}[] = [
  {
    title: "Flavie Herbreteau",
    url: "https://flavieherbreteau.com",
    descriptionKey: "projects.flavie.description",
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/flavie-website-screenshot.webp",
  },
  {
    title: "Shana Herbreteau",
    url: "https://shanaherbreteau.com",
    descriptionKey: "projects.shana.description",
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/shana-website-screenshot.webp",
  },
  {
    title: "Martin Adeline",
    url: "https://martinadeline.com",
    descriptionKey: "projects.martin.description",
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/martin-website-screenshot.webp",
  },
  {
    title: "Github",
    url: "https://github.com/troueau",
    descriptionKey: "projects.github.description",
  },
];

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const ProjectCard = ({
  title,
  url,
  description,
  screenshot,
}: {
  title: string;
  url: string;
  description: string;
  screenshot?: string;
}) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition duration-300 card-shadow hover:glow-shadow"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}>
      <div className="relative w-full aspect-[8/5] overflow-hidden bg-muted">
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
          <img
            src={screenshot}
            alt={`Aperçu de ${title}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/40 pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ touchAction: "none", pointerEvents: "auto" }}
        />
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-lg text-foreground leading-tight">
            {title}
          </span>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">
            {description}
          </p>
          <p className="text-xs text-primary/60 mt-2 truncate">
            {url.replace("https://", "")}
          </p>
        </div>
        <ExternalLink className="shrink-0 w-4 h-4 text-muted-foreground mt-1" />
      </div>
    </motion.a>
  );
};

const titleVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

const subtitleVariants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay: 0.1 },
  },
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6">
      <div className="overflow-hidden">
        <motion.span
          className="flex justify-center font-semibold text-3xl text-center mb-2 text-foreground"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}>
          {t("projects.title")}
        </motion.span>
      </div>
      <div className="overflow-hidden">
        <motion.p
          className="text-center text-muted-foreground text-sm mb-20 line-clamp-1"
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}>
          {t("projects.subtitle")}
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
        {projectList.map((project) => (
          <ProjectCard
            key={project.url}
            title={project.title}
            url={project.url}
            description={t(project.descriptionKey)}
            screenshot={project.screenshot}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;

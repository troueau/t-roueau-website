import { useEffect, useState } from "react";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { ExternalLink, ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";

// ── Project data ──────────────────────────────────────────────────────────────

type ProjectEntry = {
  title: string;
  number: string;
  url: string;
  year: string;
  type: string;
  tags: string[];
  screenshot?: string;
  descriptionKey: TranslationKey;
  longKey: TranslationKey;
  nextSlug: string | null;
};

const PROJECTS: Record<string, ProjectEntry> = {
  "la-turcane": {
    title: "La Turcane",
    number: "01",
    url: "https://la-turcane.fr",
    year: "2026",
    type: "Website",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    screenshot: "https://ddrrqia38iv2z.cloudfront.net/projects/la-turcane.webp",
    descriptionKey: "projects.turcane.description",
    longKey: "projects.turcane.long",
    nextSlug: "flavie-herbreteau",
  },
  "flavie-herbreteau": {
    title: "Flavie Herbreteau",
    number: "02",
    url: "https://flavieherbreteau.com",
    year: "2025",
    type: "Portfolio",
    tags: ["Next.js", "CSS", "TypeScript"],
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/flavie-website-screenshot.webp",
    descriptionKey: "projects.flavie.description",
    longKey: "projects.flavie.long",
    nextSlug: "poche",
  },
  poche: {
    title: "Poche APP",
    number: "03",
    url: "https://poche-app.space",
    year: "2026",
    type: "Web App",
    tags: ["React", "Tailwind CSS", "TypeScript", "Finance"],
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/poche-app.space_mobile.webp",
    descriptionKey: "projects.poche.description",
    longKey: "projects.poche.long",
    nextSlug: "shana-herbreteau",
  },
  "shana-herbreteau": {
    title: "Shana Herbreteau",
    number: "04",
    url: "https://shanaherbreteau.com",
    year: "2025",
    type: "Portfolio",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/shana-website-screenshot.webp",
    descriptionKey: "projects.shana.description",
    longKey: "projects.shana.long",
    nextSlug: "martin-adeline",
  },
  "martin-adeline": {
    title: "Martin Adeline",
    number: "05",
    url: "https://martinadeline.com",
    year: "2024",
    type: "Portfolio",
    tags: ["Next.js", "CSS", "TypeScript"],
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/martin-website-screenshot.webp",
    descriptionKey: "projects.martin.description",
    longKey: "projects.martin.long",
    nextSlug: "la-turcane",
  },
};

// ── Typewriter TLD ────────────────────────────────────────────────────────────

const TLDS = [".com", ".fr", ".de", ".io", ".dev", ".net"];

const TypewriterTld = () => {
  const [displayed, setDisplayed] = useState("");
  const [tldIdx, setTldIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "erasing">("idle");

  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const tld = TLDS[tldIdx];
    if (phase === "typing") {
      if (displayed.length < tld.length) {
        const t = setTimeout(
          () => setDisplayed(tld.slice(0, displayed.length + 1)),
          100,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("erasing"), 1600);
        return () => clearTimeout(t);
      }
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 65);
        return () => clearTimeout(t);
      } else {
        setTldIdx((i) => (i + 1) % TLDS.length);
        setPhase("typing");
      }
    }
  }, [phase, displayed, tldIdx]);

  return (
    <span className="text-[4vw] sm:text-[3.5vw] font-semibold leading-none tracking-tight text-foreground/30">
      {displayed}
      {phase !== "idle" && (
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            times: [0, 0.48, 0.5, 1],
            ease: "linear",
          }}>
          |
        </motion.span>
      )}
    </span>
  );
};

// ── 3D tilt hook ──────────────────────────────────────────────────────────────

function useTilt(reduced: boolean, maxRot = 10) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 25 });
  const sy = useSpring(my, { stiffness: 80, damping: 25 });
  const rotateY = useTransform(
    sx,
    [-0.5, 0.5],
    reduced ? [0, 0] : [-maxRot, maxRot],
  );
  const rotateX = useTransform(
    sy,
    [-0.5, 0.5],
    reduced ? [0, 0] : [maxRot * 0.65, -maxRot * 0.65],
  );
  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };
  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ── Scroll progress ───────────────────────────────────────────────────────────

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{ scaleX, backgroundColor: "hsl(var(--primary))" }}
    />
  );
};

// ── Browser mockup ────────────────────────────────────────────────────────────

const BrowserMockup = ({
  screenshot,
  url,
  title,
  scrollY,
  reduced,
}: {
  screenshot?: string;
  url: string;
  title: string;
  scrollY: MotionValue<number>;
  reduced: boolean;
}) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(reduced, 4);

  const mockupY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -40]);
  const mockupScale = useTransform(scrollY, [0, 700], [1, reduced ? 1 : 0.8]);
  const mockupRotateX = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 16]);

  const displayUrl = url.replace("https://", "");

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        className="relative"
        style={{ y: mockupY, scale: mockupScale, rotateX: mockupRotateX }}>
        {/* Perspective container for mouse tilt */}
        <div style={{ perspective: "1400px" }}>
          <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY }}
            initial={
              reduced
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 0, rotateY: 18, rotateX: -8, scale: 0.88 }
            }
            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_40px_80px_hsl(0_0%_0%/0.6)]">
            {/* Browser chrome */}
            <div className="h-10 bg-card/90 backdrop-blur flex items-center gap-1.5 px-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="w-3 h-3 rounded-full bg-foreground/10" />
              <div className="ml-4 flex-1 h-5 bg-foreground/5 rounded-md flex items-center px-3">
                <span className="text-[11px] text-foreground/30 truncate">
                  {displayUrl}
                </span>
              </div>
            </div>

            {/* Screenshot */}
            {screenshot ? (
              <img
                src={screenshot}
                alt={`${title} screenshot`}
                className="w-full block"
                draggable={false}
              />
            ) : (
              <div className="w-full aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  No preview
                </span>
              </div>
            )}

            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Glow shadow under mockup */}
        <motion.div
          className="mx-auto mt-6 h-16 rounded-full blur-3xl opacity-20"
          style={{ width: "70%", background: "hsl(220 70% 62% / 0.8)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.div>
    </div>
  );
};

// ── Next project card ─────────────────────────────────────────────────────────

const NextProjectCard = ({
  slug,
  project,
  reduced,
}: {
  slug: string;
  project: ProjectEntry;
  reduced: boolean;
}) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(reduced, 2);
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Small delay so the scroll starts before the route change
    setTimeout(() => navigate(`/project/${slug}`), 300);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div
          className="group relative rounded-2xl border border-border bg-card overflow-hidden p-8 sm:p-12 hover:border-primary/30 transition-colors duration-300 cursor-pointer"
          onClick={handleClick}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY }}>
          <p className="text-xs font-mono text-muted-foreground/40 tracking-widest mb-4">
            Next project
          </p>
          <h3 className="text-4xl sm:text-5xl font-semibold leading-none tracking-tight text-foreground mb-3">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">{project.type}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
            View project
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const reduced = useReducedMotion() ?? false;
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = slug ? PROJECTS[slug] : undefined;
  if (!project) return <Navigate to="/" replace />;

  const nextProject = project.nextSlug ? PROJECTS[project.nextSlug] : null;

  return (
    <div className="bg-background overflow-x-hidden">
      <ScrollProgress />
      <Header hideNav />

      {/* ── Hero ── */}
      <section className="relative flex flex-col px-8 sm:px-16 pt-44 pb-4 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(220 70% 62% / 0.07) 0%, transparent 60%)",
          }}
        />

        {/* Back link */}
        {/*         <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </motion.div> */}

        {/* Title */}
        <div className="flex flex-wrap items-baseline gap-2 mb-2">
          <div className="overflow-hidden">
            <motion.h1
              className="text-[6vw] sm:text-[7vw] font-semibold leading-none tracking-tight text-foreground whitespace-nowrap"
              initial={{ y: "105%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}>
              {project.title}
            </motion.h1>
          </div>
          <TypewriterTld />
        </div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-20"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}>
          <span className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-card">
            {project.type}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground bg-card">
              {tag}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── 3D Screenshot mockup ── */}
      <section className="px-8 sm:px-16 pt-10 sm:pb-32">
        <div className="max-w-5xl mx-auto">
          <BrowserMockup
            screenshot={project.screenshot}
            url={project.url}
            title={project.title}
            scrollY={scrollY}
            reduced={reduced}
          />
        </div>
      </section>

      {/* ── Description + meta ── */}
      <section className="px-8 sm:px-16 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">
          {/* Long description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-mono text-muted-foreground/40 tracking-widest mb-6">
              {t("projects.title.about") || "About this project"}
            </p>
            <p className="text-xl sm:text-2xl text-foreground/80 leading-relaxed">
              {t(project.longKey)}
            </p>
          </motion.div>

          {/* Metadata */}
          <motion.div
            className="flex flex-col gap-4 content-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">
                {t("projects.year.label") || "Year"}
              </p>
              <p className="text-foreground">{project.year}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">
                {t("projects.type.label") || "Type"}
              </p>
              <p className="text-foreground">{project.type}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">
                {t("projects.live.label") || "Live"}
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors w-fit">
                {t("projects.live.link") || "View site"}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next project ── */}
      {nextProject && project.nextSlug && (
        <section className="px-4 sm:px-8 pb-24 sm:pb-32">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="h-px bg-border mb-16" />
            <NextProjectCard
              slug={project.nextSlug}
              project={nextProject}
              reduced={reduced}
            />
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;

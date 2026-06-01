import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "La Turcane",
    href: "/project/la-turcane",
    externalUrl: "https://la-turcane.fr",
    descriptionKey: "projects.turcane.description" as TranslationKey,
    screenshot: "https://ddrrqia38iv2z.cloudfront.net/projects/la-turcane.webp",
  },
  {
    title: "Flavie Herbreteau",
    href: "/project/flavie-herbreteau",
    externalUrl: "https://flavieherbreteau.com",
    descriptionKey: "projects.flavie.description" as TranslationKey,
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/flavie-website-screenshot.webp",
  },
  {
    title: "Poche APP",
    href: "/project/poche",
    externalUrl: "https://poche-app.space",
    descriptionKey: "projects.poche.description" as TranslationKey,
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/poche-app.space_mobile.webp",
  },
  {
    title: "Shana Herbreteau",
    href: "/project/shana-herbreteau",
    externalUrl: "https://shanaherbreteau.com",
    descriptionKey: "projects.shana.description" as TranslationKey,
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/shana-website-screenshot.webp",
  },
  {
    title: "Martin Adeline",
    href: "/project/martin-adeline",
    externalUrl: "https://martinadeline.com",
    descriptionKey: "projects.martin.description" as TranslationKey,
    screenshot:
      "https://ddrrqia38iv2z.cloudfront.net/projects/martin-website-screenshot.webp",
  },
  {
    title: "Github",
    href: "https://github.com/troueau",
    externalUrl: "https://github.com/troueau",
    descriptionKey: "projects.github.description" as TranslationKey,
    screenshot: undefined,
  },
];

// ── Scroll progress bar ───────────────────────────────────────────────────────

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

// ── 3D tilt hook ──────────────────────────────────────────────────────────────

function useTilt(reduced: boolean, maxRot = 10) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateY = useTransform(
    sx,
    [-0.5, 0.5],
    reduced ? [0, 0] : [-maxRot, maxRot],
  );
  const rotateX = useTransform(
    sy,
    [-0.5, 0.5],
    reduced ? [0, 0] : [maxRot * 0.7, -maxRot * 0.7],
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

// ── GitHub icon ───────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg
    viewBox="0 0 98 96"
    className="w-20 h-20 fill-current text-foreground/40"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
    />
  </svg>
);

// ── Floating 3D cards in hero ─────────────────────────────────────────────────
// Each card is a mini project preview floating in 3D space on the right side.

type FloatingCardDef = {
  screenshot: string;
  title: string;
  top: string;
  right: string;
  rotateY: number;
  rotateX: number;
  scale: number;
  floatDuration: number;
  floatAmplitude: number;
  delay: number;
  parallaxFactor: number; // how much it reacts to scroll & mouse
};

const FLOATING_CARDS: FloatingCardDef[] = [
  {
    screenshot: projects[0].screenshot!,
    title: projects[0].title,
    top: "18%",
    right: "4%",
    rotateY: -22,
    rotateX: 6,
    scale: 0.72,
    floatDuration: 5.5,
    floatAmplitude: 14,
    delay: 1.1,
    parallaxFactor: 1,
  },
  {
    screenshot: projects[1].screenshot!,
    title: projects[1].title,
    top: "38%",
    right: "22%",
    rotateY: -18,
    rotateX: 3,
    scale: 0.62,
    floatDuration: 6.8,
    floatAmplitude: 10,
    delay: 1.35,
    parallaxFactor: 1.6,
  },
  {
    screenshot: projects[2].screenshot!,
    title: projects[2].title,
    top: "58%",
    right: "7%",
    rotateY: -25,
    rotateX: 8,
    scale: 0.55,
    floatDuration: 7.5,
    floatAmplitude: 16,
    delay: 1.55,
    parallaxFactor: 0.7,
  },
];

// Each floating card is its own component so hooks are called at the top level.
const SingleFloatingCard = ({
  card,
  smMouseX,
  smMouseY,
  scrollY,
  reduced,
}: {
  card: FloatingCardDef;
  smMouseX: MotionValue<number>;
  smMouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
  reduced: boolean;
}) => {
  const cardX = useTransform(
    smMouseX,
    [-0.5, 0.5],
    reduced ? [0, 0] : [-20 * card.parallaxFactor, 20 * card.parallaxFactor],
  );
  const cardMouseY = useTransform(
    smMouseY,
    [-0.5, 0.5],
    reduced ? [0, 0] : [-12 * card.parallaxFactor, 12 * card.parallaxFactor],
  );
  const cardScrollY = useTransform(
    scrollY,
    [0, 700],
    [0, reduced ? 0 : -80 * card.parallaxFactor],
  );

  return (
    <motion.div
      className="absolute"
      style={{
        top: card.top,
        right: card.right,
        x: cardX,
        y: cardScrollY,
        transformPerspective: 900,
        rotateY: card.rotateY,
        rotateX: card.rotateX,
        scale: card.scale,
      }}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: card.delay,
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}>
      <motion.div
        animate={{
          y: [
            -card.floatAmplitude / 2,
            card.floatAmplitude / 2,
            -card.floatAmplitude / 2,
          ],
          rotateZ: [-1, 1, -1],
        }}
        transition={{
          duration: card.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}>
        <motion.div style={{ y: cardMouseY }}>
          <div className="w-52 rounded-xl overflow-hidden shadow-2xl border border-white/[0.06] bg-card">
            <img
              src={card.screenshot}
              alt={card.title}
              className="w-full aspect-[4/3] object-cover"
              draggable={false}
            />
            <div className="px-3 py-2">
              <span className="text-xs text-foreground/60 font-medium truncate block">
                {card.title}
              </span>
            </div>
          </div>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl opacity-30"
            style={{ background: "hsl(220 70% 62% / 0.5)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HeroFloatingCards = ({
  scrollY,
  smMouseX,
  smMouseY,
  reduced,
}: {
  scrollY: MotionValue<number>;
  smMouseX: MotionValue<number>;
  smMouseY: MotionValue<number>;
  reduced: boolean;
}) => {
  const containerOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none hidden lg:block"
      style={{ opacity: containerOpacity }}>
      {FLOATING_CARDS.map((card, i) => (
        <SingleFloatingCard
          key={i}
          card={card}
          smMouseX={smMouseX}
          smMouseY={smMouseY}
          scrollY={scrollY}
          reduced={reduced}
        />
      ))}
    </motion.div>
  );
};

// ── Project card ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  title,
  href,
  externalUrl,
  description,
  screenshot,
  index,
  reduced,
}: {
  title: string;
  href: string;
  externalUrl: string;
  description: string;
  screenshot?: string;
  index: number;
  reduced: boolean;
}) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(reduced, 12);
  const fromLeft = index % 2 === 0;
  const isExternal = href.startsWith("http");

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        initial={
          reduced
            ? { opacity: 0, y: 30 }
            : {
                opacity: 0,
                x: fromLeft ? -90 : 90,
                rotateY: fromLeft ? -30 : 30,
                rotateX: 10,
                scale: 0.88,
              }
        }
        whileInView={{
          opacity: 1,
          x: 0,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          y: 0,
        }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 1.0,
          delay: (index % 3) * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}>
        <div style={{ perspective: "900px" }}>
          <motion.a
            href={href}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors duration-300 cursor-pointer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY }}
            whileTap={{ scale: 0.97 }}>
            <div className="relative w-full aspect-[8/5] overflow-hidden bg-muted">
              {screenshot ? (
                <img
                  src={screenshot}
                  alt={`${title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 "
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <GithubIcon />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/40 pointer-events-none" />
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
                  {externalUrl.replace("https://", "")}
                </p>
              </div>
              <ExternalLink className="shrink-0 w-4 h-4 text-muted-foreground mt-1" />
            </div>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = ({
  scrollY,
  reduced,
}: {
  scrollY: MotionValue<number>;
  reduced: boolean;
}) => {
  const { t } = useLanguage();
  const [charsDone, setCharsDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setCharsDone(true), 2000);
    return () => clearTimeout(id);
  }, []);

  // Three parallax layers at different speeds
  const bgY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -220]);
  const titleY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -130]);
  // Title also tilts back in 3D as you scroll — like folding into the page
  const titleRotateX = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -18]);
  const subtitleY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -60]);
  const indicatorOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center px-8 sm:px-16 overflow-hidden"
      onMouseMove={handleMouseMove}>
      {/* ── Background parallax layer (slowest) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}>
        <div
          className="absolute -top-48 -right-32 w-[750px] h-[750px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(220 70% 62% / 0.09) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-48 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(220 70% 62% / 0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.025) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.025) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-1/2 right-[7%] -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-foreground/[0.04]" />
        <div className="absolute top-1/2 right-[7%] -translate-y-1/2 w-[780px] h-[780px] rounded-full border border-foreground/[0.025]" />
      </motion.div>

      {/* ── Floating 3D project cards (large screens only) ── */}
      <HeroFloatingCards
        scrollY={scrollY}
        smMouseX={smMouseX}
        smMouseY={smMouseY}
        reduced={reduced}
      />

      {/* ── Title with scroll-linked Y + rotateX ── */}
      <motion.div
        style={{
          y: titleY,
          rotateX: titleRotateX,
          transformPerspective: 600,
          transformOrigin: "center bottom",
        }}>
        <p className="text-[13vw] sm:text-[9vw] font-semibold leading-none tracking-tight text-foreground mb-8 overflow-visible">
          {charsDone
            ? t("index.hero.title")
            : t("index.hero.title")
                .split("")
                .map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}>
                    {char}
                  </motion.span>
                ))}
        </p>
      </motion.div>

      {/* ── Subtitle ── */}
      <motion.p
        className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
        style={{ y: subtitleY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {t("index.hero.subtitle")}
      </motion.p>
    </section>
  );
};

// ── Projects section ──────────────────────────────────────────────────────────

const ProjectsSection = ({ reduced }: { reduced: boolean }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end end"],
  });
  const gridY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduced ? 0 : 60, reduced ? 0 : -40],
  );

  return (
    <section ref={ref} className="relative px-8 sm:px-16 py-24 sm:py-36">
      <div className="mb-8 sm:mb-12">
        <div className="overflow-hidden">
          <motion.h2
            className="text-[12vw] sm:text-[7vw] font-semibold leading-none tracking-tight text-foreground"
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
            {t("index.projects.title")}
          </motion.h2>
        </div>
        <motion.p
          className="text-muted-foreground mt-5 max-w-sm leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}>
          {t("index.projects.description")}
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{ y: gridY }}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.href}
            title={p.title}
            href={p.href}
            externalUrl={p.externalUrl}
            description={t(p.descriptionKey)}
            screenshot={p.screenshot}
            index={i}
            reduced={reduced}
          />
        ))}
      </motion.div>
    </section>
  );
};

// ── About section ─────────────────────────────────────────────────────────────

const AboutSection = ({ reduced }: { reduced: boolean }) => {
  const { t } = useLanguage();
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, hsl(220 70% 62% / 0.11), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-999);
    mouseY.set(-999);
  };

  return (
    <section className="px-8 sm:px-16 pb-24 sm:pb-36">
      <motion.a
        href="/about"
        className="group relative block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors duration-300 cursor-pointer px-8 py-12 sm:px-16 sm:py-16"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        {/* Spotlight cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: spotlight }}
        />

        {/* Background — grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Background — blobs */}
        <div
          className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(220 70% 62% / 0.13) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(260 70% 65% / 0.09) 0%, transparent 65%)",
          }}
        />
        {/* Top edge glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(220 70% 62% / 0.4), transparent)",
          }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <h2 className="text-[11vw] sm:text-[6.5vw] font-semibold leading-none tracking-tight text-foreground mb-5">
              {t("index.about.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {t("index.about.description")}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-3 text-base font-medium text-primary group-hover:gap-4 transition-all duration-300">
            {t("index.about.label")}
            <Arrow />
          </span>
        </div>
      </motion.a>
    </section>
  );
};

// ── Booking section ───────────────────────────────────────────────────────────

const BookingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-8 sm:px-16 pb-24 sm:pb-36">
      <motion.div
        className="border-t border-border pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
              {t("index.booking.label")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
            {t("index.booking.title")}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            {t("index.booking.description")}
          </p>
        </div>
        <motion.a
          href="https://calendly.com/tomrousseau/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-opacity duration-200"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}>
          {t("index.booking.cta")}
          <Arrow />
        </motion.a>
      </motion.div>
    </section>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────

const IndexScroll = () => {
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  return (
    <div className="bg-background overflow-x-hidden">
      <ScrollProgress />
      <Header hideNav />

      <Hero scrollY={scrollY} reduced={reduced} />
      <ProjectsSection reduced={reduced} />
      <AboutSection reduced={reduced} />
      <BookingSection />

      <Footer />
    </div>
  );
};

export default IndexScroll;

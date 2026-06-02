import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import { Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { useLanguage } from "@/hooks/useLanguage";

// ── 3D tilt hook ──────────────────────────────────────────────────────────────

function useTilt(reduced: boolean, maxRot = 14) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 18 });
  const sy = useSpring(my, { stiffness: 110, damping: 18 });
  const rotateY = useTransform(
    sx,
    [-0.5, 0.5],
    reduced ? [0, 0] : [-maxRot, maxRot],
  );
  const rotateX = useTransform(
    sy,
    [-0.5, 0.5],
    reduced ? [0, 0] : [maxRot * 0.6, -maxRot * 0.6],
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

// ── Photo card ─────────────────────────────────────────────────────────────────

const PhotoCard = ({ reduced }: { reduced: boolean }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(reduced, 14);

  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <motion.div
        animate={reduced ? {} : { y: [0, -16, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY }}
          initial={
            reduced
              ? { opacity: 0, scale: 0.92 }
              : { opacity: 0, rotateY: 24, rotateX: -10, scale: 0.85 }
          }
          animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative">
          {/* Main frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_50px_100px_hsl(0_0%_0%/0.55)]">
            <OptimizedImage
              src="me/tom.webp"
              alt="Tom Rousseau"
              aspectRatio="3/4"
              wrapperClassName="w-full"
            />
            {/* Shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07] pointer-events-none" />
          </div>

          {/* Floating badge — role */}
          <motion.div
            className="absolute -left-10 top-1/4 hidden sm:block bg-card/90 backdrop-blur border border-border rounded-xl px-4 py-2.5 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.3,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}>
            <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase mb-0.5">
              Role
            </p>
            <p className="text-sm font-semibold text-foreground whitespace-nowrap">
              Front-end Dev
            </p>
          </motion.div>

          {/* Floating badge — location */}
          <motion.div
            className="absolute -right-10 bottom-1/4 hidden sm:block bg-card/90 backdrop-blur border border-border rounded-xl px-4 py-2.5 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.5,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}>
            <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase mb-0.5">
              Location
            </p>
            <p className="text-sm font-semibold text-foreground">Paris, FR</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── Info card ─────────────────────────────────────────────────────────────────

const InfoCard = ({
  icon,
  label,
  value,
  href,
  reduced,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  reduced: boolean;
  delay: number;
}) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(reduced, 6);

  const inner = (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono text-muted-foreground/40 tracking-widest uppercase">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      <div style={{ perspective: "800px" }}>
        <motion.div
          className="rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/30 transition-colors duration-300"
          style={{ rotateX, rotateY }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}>
          {href ? (
            <a href={href} className="block">
              {inner}
            </a>
          ) : (
            inner
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const BIRTH_DATE = new Date(2000, 7, 28);

function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > BIRTH_DATE.getMonth() ||
    (today.getMonth() === BIRTH_DATE.getMonth() &&
      today.getDate() >= BIRTH_DATE.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
}

const EMAIL = "tomrousseau@hotmail.fr";

const About = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion() ?? false;

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowBg = useMotionTemplate`radial-gradient(700px at ${glowX}px ${glowY}px, hsl(220 70% 62% / 0.09), transparent 85%)`;

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };
    if (!reduced) window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [reduced, glowX, glowY]);

  const age = getAge();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!reduced && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 mix-blend-plus-lighter dark:mix-blend-normal"
          style={{ background: glowBg }}
        />
      )}

      <Header hideNav />

      {/* ── Hero ── */}
      <section className="relative flex items-start px-8 sm:px-16 pt-24 pb-14 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">
          {/* Left — text */}
          <div className="pt-16">
            {/* Label */}
            <p
              className="text-xs font-mono text-primary/70 tracking-[0.25em] uppercase mb-4"
              style={{
                animation:
                  "name-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both",
              }}>
              {t("about.title")}
            </p>

            {/* Name */}
            <div className="animate-name-reveal">
              {["Tom", "Rousseau"].map((word) => (
                <h1
                  key={word}
                  className="text-[16vw] sm:text-[10vw] lg:text-[7vw] xl:text-8xl font-semibold leading-[0.9] tracking-tight text-foreground">
                  {word}
                </h1>
              ))}
            </div>

            {/* Age pill */}
            <motion.div
              className="mt-6 mb-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground font-mono"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.55,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
              {age} {t("about.years_old")} — Paris
            </motion.div>

            {/* Paragraphs */}
            <div className="space-y-4 max-w-md">
              {(["about.p1", "about.p2", "about.p3"] as const).map((key, i) => (
                <motion.p
                  key={key}
                  className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}>
                  {t(key)}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right — 3D photo + info cards */}
          <div className="flex flex-col gap-2 items-center lg:items-end px-4 sm:px-8 lg:px-0 lg:pt-10">
            <div className="w-full max-w-[320px] sm:max-w-[380px]">
              <PhotoCard reduced={reduced} />
            </div>
            <div className="w-full max-w-[320px] sm:max-w-[380px] flex flex-col gap-1.5">
              <InfoCard
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                reduced={reduced}
                delay={1.0}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

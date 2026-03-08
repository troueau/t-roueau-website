import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Arrow from "@/components/Arrow";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";
import Footer from "@/components/Footer";

const sections = [
  {
    href: "/projects",
    titleKey: "index.projects.title" as TranslationKey,
    descriptionKey: "index.projects.description" as TranslationKey,
    labelKey: "index.projects.label" as TranslationKey,
    number: "01",
  },
  {
    href: "/gallery",
    titleKey: "index.photos.title" as TranslationKey,
    descriptionKey: "index.photos.description" as TranslationKey,
    labelKey: "index.photos.label" as TranslationKey,
    number: "02",
  },
  {
    href: "/about",
    titleKey: "index.about.title" as TranslationKey,
    descriptionKey: "index.about.description" as TranslationKey,
    labelKey: "index.about.label" as TranslationKey,
    number: "03",
  },
];

const AnimatedTitle = ({ text }: { text: string }) => {
  return (
    <span aria-label={text} className="inline-flex flex-wrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          initial={{ opacity: 0, y: 40, rotateX: -60 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}>
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const DotNav = ({
  total,
  active,
  onDotClick,
}: {
  total: number;
  active: number;
  onDotClick: (i: number) => void;
}) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden sm:flex">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDotClick(i)}
        aria-label={`Section ${i + 1}`}
        className="w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer"
        style={{
          backgroundColor:
            i === active
              ? "hsl(var(--foreground))"
              : "hsl(var(--muted-foreground) / 0.3)",
          transform: i === active ? "scale(1.6)" : "scale(1)",
        }}
      />
    ))}
  </div>
);

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
      style={{
        scaleX,
        backgroundColor: "hsl(var(--primary))",
      }}
    />
  );
};

const Section = ({
  href,
  title,
  description,
  label,
  number,
  sectionRef,
}: {
  href: string;
  title: string;
  description: string;
  label: string;
  number: string;
  sectionRef: (el: HTMLElement | null) => void;
}) => {
  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center px-8 sm:px-16 overflow-hidden border-b border-border/30 scroll-snap-start">
      <motion.span
        className="absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none font-semibold leading-none text-[20vw] text-foreground/[0.03]"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        {number}
      </motion.span>

      <div className="w-full max-w-3xl">
        <motion.span
          className="block text-xs font-mono text-muted-foreground/40 tracking-widest mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {number}
        </motion.span>

        <p className="text-[12vw] sm:text-[8vw] font-semibold leading-none tracking-tight text-foreground mb-8 overflow-visible">
          <AnimatedTitle text={title} />
        </p>

        <motion.p
          className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          {description}
        </motion.p>

        <motion.a
          href={href}
          className="group inline-flex items-center gap-3 text-sm font-medium text-primary border border-primary/30 rounded-full px-5 py-2.5 hover:bg-primary/5 transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          {label}
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            <Arrow />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

const IndexScroll = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState(-1); // -1 = hero
  const [heroAnimationDone, setHeroAnimationDone] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLElement | null>(null);

  // After the initial letter-by-letter animation completes, switch to static text
  // so language switches don't trigger the staggered animation again
  useEffect(() => {
    const timeout = setTimeout(() => setHeroAnimationDone(true), 1800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const allRefs = [heroRef.current, ...sectionRefs.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = allRefs.indexOf(entry.target as HTMLElement);
            setActiveSection(index - 1); // -1 for hero, 0/1/2 for sections
          }
        });
      },
      { threshold: 0.5 },
    );

    allRefs.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (i: number) => {
    const allRefs = [heroRef.current, ...sectionRefs.current];
    allRefs[i + 1]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background" style={{ scrollSnapType: "y mandatory" }}>
      <ScrollProgress />
      <Header hideNav />

      <DotNav
        total={sections.length + 1}
        active={activeSection + 1}
        onDotClick={(i) => scrollToSection(i - 1)}
      />

      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center px-8 sm:px-16 overflow-hidden"
        style={{ scrollSnapAlign: "start" }}>
        <p className="text-[13vw] sm:text-[9vw] font-semibold leading-none tracking-tight text-foreground mb-8 overflow-visible">
          {heroAnimationDone
            ? t("index.hero.title")
            : t("index.hero.title")
                .split("")
                .map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
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

        <motion.p
          className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          {t("index.hero.subtitle")}
        </motion.p>
      </section>

      {sections.map((s, i) => (
        <Section
          key={s.href}
          href={s.href}
          title={t(s.titleKey)}
          description={t(s.descriptionKey)}
          label={t(s.labelKey)}
          number={s.number}
          sectionRef={(el) => {
            sectionRefs.current[i] = el;
          }}
        />
      ))}

      <Footer />
    </div>
  );
};

export default IndexScroll;

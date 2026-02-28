import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";
import DecorativeLine from "@/components/DecorativeLine";

const cardKeys: {
  href: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  labelKey: TranslationKey;
  delay: number;
}[] = [
  {
    href: "/projects",
    titleKey: "index.projects.title",
    descriptionKey: "index.projects.description",
    labelKey: "index.projects.label",
    delay: 0,
  },
  {
    href: "/gallery",
    titleKey: "index.photos.title",
    descriptionKey: "index.photos.description",
    labelKey: "index.photos.label",
    delay: 120,
  },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header hideNav />

      <DecorativeLine />

      <div className="flex-1 flex items-center justify-center px-6 pt-12 sm:pt-8">
        <div className="w-full">
          {cardKeys.map(
            ({ href, titleKey, descriptionKey, labelKey, delay }, i) => (
              <a
                key={href}
                href={href}
                style={{ animationDelay: `${delay}ms` }}
                className="group block py-8 border-t border-border/50 last:border-b animate-fade-in opacity-0 bg-background">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xl sm:text-5xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500 leading-none tracking-tight">
                    {t(titleKey)}
                  </span>
                  <div className="flex flex-col items-end gap-3 shrink-0 pt-1">
                    <span className="text-xs text-muted-foreground/30 font-mono tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-medium text-primary inline-flex items-center gap-1.5 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:gap-2.5 transition-all duration-300">
                      {t(labelKey)}
                      <Arrow />
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground sm:mt-4 leading-relaxed">
                  {t(descriptionKey)}
                </p>
              </a>
            ),
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;

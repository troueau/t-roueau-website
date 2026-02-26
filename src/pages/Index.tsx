import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { TranslationKey } from "@/lib/i18n";

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

      <div className="flex-1 flex items-center justify-center px-6 pt-12 sm:pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {cardKeys.map(({ href, titleKey, descriptionKey, labelKey, delay }) => (
            <a
              key={href}
              href={href}
              style={{ animationDelay: `${delay}ms` }}
              className="group flex flex-col gap-3 p-8 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-accent/20 transition-all duration-300 animate-fade-in opacity-0">
              <span className="text-2xl font-semibold text-foreground">
                {t(titleKey)}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {t(descriptionKey)}
              </p>
              <span className="mt-2 text-sm font-medium text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                {t(labelKey)}
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 6.5h11M7 1.5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;

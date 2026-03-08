import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { Particles } from "@/components/ui/particles";
import { Briefcase, Mail, MapPinHouse } from "lucide-react";

const BIRTH_DATE = new Date(2000, 6, 28); // July 28, 2000

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header showProjects showPhotos />

      <div className="relative flex-1 flex items-center justify-center px-6 pt-12 sm:pt-8 text-justify">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          color="#5a87e2"
        />
        <div className="relative z-10 w-full max-w-xl">
          <p
            className="text-xl sm:text-5xl font-semibold text-foreground tracking-tight leading-none mb-12 animate-fade-in opacity-0"
            style={{ animationDelay: "60ms" }}>
            {t("about.title")}
          </p>

          <div
            className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "180ms" }}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          <div
            className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row gap-3 sm:gap-10 text-sm text-muted-foreground animate-fade-in opacity-0 sm:justify-center sm:items-center"
            style={{ animationDelay: "300ms" }}>
            <div className="flex gap-2">
              <Mail className="w-5 h-5" />
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-foreground transition-colors underline underline-offset-2">
                {EMAIL}
              </a>
            </div>
            <div className="flex gap-2">
              <Briefcase className="w-5 h-5" />
              <p>{t("about.job.label")}</p>
            </div>
            <div className="flex gap-2">
              <MapPinHouse className="w-5 h-5" />
              <p>{t("about.based.label")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

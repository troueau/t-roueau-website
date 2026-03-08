import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { LucideMoon, LucideSun, LucideSettings2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = ({
  hideNav = false,
  showProjects = false,
  showPhotos = false,
  showAbout = false,
}: {
  hideNav?: boolean;
  showProjects?: boolean;
  showPhotos?: boolean;
  showAbout?: boolean;
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-primary/10 px-2 py-1 rounded">
          <a
            href="/"
            className="text-sm sm:text-lg font-semibold tracking-wide text-foreground">
            Tom Rousseau
          </a>
        </div>
        {!hideNav && (
          <nav className="flex items-center gap-4 sm:gap-6 absolute right-8 sm:right-auto sm:left-1/2 -translate-x-1/2">
            {showProjects && (
              <a
                href="/projects"
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("header.projects")}
              </a>
            )}
            {showPhotos && (
              <a
                href="/gallery"
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("header.photos")}
              </a>
            )}
            {showAbout && (
              <a
                href="/about"
                className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {t("header.about")}
              </a>
            )}
          </nav>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="hidden sm:flex px-2 py-1 items-center justify-center text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
            aria-label="Toggle theme">
            {theme === "dark" ? (
              <LucideSun size={16} />
            ) : (
              <LucideMoon size={16} />
            )}
          </button>
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex px-2 py-1 items-center justify-center text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded transition-colors">
            {language === "en" ? "FR" : "EN"}
          </button>

          <div className="relative sm:hidden" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="px-2 py-1 flex items-center justify-center text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded transition-colors"
              aria-label="Settings">
              <LucideSettings2 size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 flex flex-col gap-1 bg-background border border-border rounded shadow-md p-2 min-w-[80px]">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-2">
                  {language === "en" ? "FR" : "EN"}
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground rounded transition-colors">
                  {theme === "dark" ? (
                    <LucideSun size={14} />
                  ) : (
                    <LucideMoon size={14} />
                  )}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

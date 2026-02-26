const Header = ({
  hideNav = false,
  showProjects = false,
  showPhotos = false,
}: {
  hideNav?: boolean;
  showProjects?: boolean;
  showPhotos?: boolean;
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-8xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-primary/10 px-2 py-1 rounded">
          <a
            href="/"
            className="text-l font-semibold tracking-wide text-foreground">
            Tom Rousseau
          </a>
        </div>
        {!hideNav && (
          <nav className="flex items-center gap-6">
            {showProjects ? (
              <a
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
            ) : (
              <></>
            )}
            {showPhotos ? (
              <a
                href="/gallery"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Photos
              </a>
            ) : (
              <></>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-primary/10 px-2 py-1 rounded">
          <span className="text-l font-semibold tracking-wide text-foreground">
            Tom Rousseau
          </span>
        </div>
        <nav className="flex items-center">
          <a
            href="#gallery"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

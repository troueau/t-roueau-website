import { Camera } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-primary" />
          <span className="text-display text-xl font-semibold tracking-wide text-foreground">
            Portfolio
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#gallery" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </a>
          <a href="#upload" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Upload
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cards = [
  {
    href: "/projects",
    title: "Projects",
    description: "Side projects, experiments & things I built.",
    label: "View projects",
    delay: 0,
  },
  {
    href: "/gallery",
    title: "Photos",
    description: "A collection of moments captured along the way.",
    label: "Browse photos gallery",
    delay: 120,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header hideNav />

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {cards.map(({ href, title, description, label, delay }) => (
            <a
              key={href}
              href={href}
              style={{ animationDelay: `${delay}ms` }}
              className="group flex flex-col gap-3 p-8 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-accent/20 transition-all duration-300 animate-fade-in opacity-0">
              <span className="text-2xl font-semibold text-foreground">
                {title}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
              <span className="mt-2 text-sm font-medium text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                {label}
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

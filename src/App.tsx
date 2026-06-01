import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageProvider";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import IndexScroll from "./pages/IndexScroll";
import ProjectDetail from "./pages/ProjectDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexScroll />} />
          <Route path="/about" element={<About />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

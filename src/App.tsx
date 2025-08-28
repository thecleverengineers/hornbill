
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Artists from "./pages/Artists";
import Auditions from "./pages/Auditions";
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen native-bg flex flex-col status-bar-dark">
          <Navigation />
          <main className="native-page-content flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/auditions" element={<Auditions />} />
              <Route path="/about" element={<About />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

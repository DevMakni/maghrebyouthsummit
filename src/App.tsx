import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Partnership from "./pages/Partnership.tsx";
import Hackathon from "./pages/Hackathon.tsx";
import ProgrammeEntrepreneuriat from "./pages/ProgrammeEntrepreneuriat.tsx";
import DigitalIA from "./pages/DigitalIA.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/paths/entrepreneuriat" element={<ProgrammeEntrepreneuriat />} />
          <Route path="/paths/hackathon" element={<Hackathon />} />
          <Route path="/paths/digital-ia" element={<DigitalIA />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </LanguageProvider>
);

export default App;

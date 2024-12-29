import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reservation from "./pages/ReservationForm";
import ActivityDetail from "./pages/ActivityDetails";
import TYpages from "./pages/TYpages";
import Calendrier from "./pages/Calendrier";
import FormuleSelection from "./pages/FormuleSelection";
import { ReservationProvider } from "./contexts/ReservationContext";

const queryClient = new QueryClient();

const App = () => (
  <ReservationProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/formules/:sport" element={<FormuleSelection />} />
            <Route path="/reservation/:sport/:formule" element={<Reservation />} />
            <Route path="/:activity" element={<ActivityDetail />} />
            <Route path="/TYpages" element={<TYpages />} />
            <Route path="/Calendar" element={<Calendrier />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ReservationProvider>
);

export default App;

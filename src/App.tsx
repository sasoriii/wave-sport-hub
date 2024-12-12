import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reservation from "./pages/ReservationForm";
import ActivityDetail from "./pages/ActivityDetails";
import TYpages from "./pages/TYpages";
import CalendarPage from "./pages/Calendarpage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reservation/:activity" element={<Reservation />} />
          <Route path="/:activity" element={<ActivityDetail />} />
          <Route path="/TYpages" element={<TYpages />} />
          <Route path="/Calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// import React from "react";
// import BookingForm from "./components/BookingForm";
// import GoogleCalendar from "./components/GoogleCalendar";

// const App = () => {
//   return (
//     <div>
//       <h1>Wave Sport Hub</h1>
//       <GoogleCalendar />
//       <BookingForm />
//     </div>
//   );
// };

// export default App;

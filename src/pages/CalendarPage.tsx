import React from "react";
import BookingForm from "../components/BookingForm";
import GoogleCalendar from "../components/GoogleCalendar";

const CalendarPage = () => {
  return (
    <div className="mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Réservez votre expérience</h1>
      <div className="space-y-8">
        {/* Formulaire de réservation */}
        <BookingForm />

        {/* Intégration avec Google Calendar */}
        <GoogleCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;

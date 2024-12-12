import React, { useState } from "react";
import { addEvent, getEventsByDate } from "../utils/calendarUtils";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const events = await getEventsByDate(selectedDate);
      let totalAttendees = 0;

      events.forEach((event) => {
        totalAttendees += event.attendees?.length || 0;
      });

      if (totalAttendees >= 12) {
        alert("Ce jour est déjà complet.");
        return;
      }

      await addEvent(selectedDate, email);
      alert("Réservation réussie ! Une invitation a été envoyée.");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Choisissez une date :
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Votre email :
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Réserver
      </button>
    </form>
  );
};

export default BookingForm;

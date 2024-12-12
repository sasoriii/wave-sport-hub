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
    <form onSubmit={handleSubmit}>
      <label>
        Choisissez une date :
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </label>
      <label>
        Votre email :
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Réserver</button>
    </form>
  );
};

export default BookingForm;

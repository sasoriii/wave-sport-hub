import { gapi } from "gapi-script";

// Ajouter un événement dans Google Calendar
export const addEvent = async (date, email) => {
  const event = {
    summary: "Réservation - Wave Sport Hub",
    description: "Une journée de sport nautique !",
    start: {
      dateTime: `${date}T09:00:00+01:00`, // Exemple : début à 9h
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: `${date}T18:00:00+01:00`, // Exemple : fin à 18h
      timeZone: "Europe/Paris",
    },
    attendees: [{ email }],
  };

  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
    throw error;
  }
};

// Récupérer les événements d'une date
export const getEventsByDate = async (date) => {
  const startDate = `${date}T00:00:00+01:00`;
  const endDate = `${date}T23:59:59+01:00`;

  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
    });
    return response.result.items;
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    throw error;
  }
};

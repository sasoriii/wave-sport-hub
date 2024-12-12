import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const GoogleCalendar = () => {
  const CLIENT_ID = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
  const API_KEY = import.meta.env.REACT_APP_GOOGLE_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      <button
        onClick={handleAuthClick}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Connecter Google Calendar
      </button>
      <button
        onClick={handleSignOutClick}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ml-4"
      >
        Déconnecter
      </button>
    </div>
  );
};

export default GoogleCalendar;

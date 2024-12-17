import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../contexts/ReservationContext"; // Fixed import path

const CalendrierForm = () => {
  const { data, updateData } = useReservation(); // Récupérer les données et la fonction de mise à jour
  const navigate = useNavigate();

  const handleDateChange = (date: Date) => {
    updateData({ selectedDate: date }); // Mettre à jour la date sélectionnée dans le contexte
  };

  const handleConfirm = async () => {
    if (data.selectedDate) {
      try {
        // Prepare the info string with all collected data
        const info = `
          Reservation: ${data.firstNameReservation} ${data.lastNameReservation}
          Address: ${data.address}, ${data.city}
          Phone: ${data.phone}
          Rider: ${data.firstNameRider} ${data.lastNameRider}
          Birth Date: ${data.birthDay}/${data.birthMonth}/${data.birthYear}
          Height: ${data.height}cm
          Weight: ${data.weight}kg
          Suit Size: ${data.suitSize}
          Shoe Size: ${data.shoeSize}
          Level: ${data.level}
        `.trim();

        // Format the date as YYYY-MM-DD
        const formattedDate = data.selectedDate.toISOString().split('T')[0];

        const response = await fetch('https://back.jeremgabriel.com/HiptoForm/index.php/API/addEvent', {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sport: data.sport.toLowerCase(), // Utiliser le champ sport
            email: data.email,
            date: formattedDate,
            info: info
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit reservation');
        }

        // If successful, navigate to confirmation page
        navigate("/confirmation");
      } catch (error) {
        console.error('Error submitting reservation:', error);
        alert("Une erreur s'est produite lors de la réservation. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez sélectionner une date.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Choisissez une date</h2>
      <div className="flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={data.selectedDate}
          minDate={new Date()}
          locale="fr-FR"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleConfirm}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default CalendrierForm;

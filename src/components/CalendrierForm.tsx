import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { useReservation } from "@/context/ReservationContext"; // Utiliser le contexte partagé

const CalendrierForm = () => {
  const { data, updateData } = useReservation(); // Récupérer les données et la fonction de mise à jour
  const navigate = useNavigate();

  const handleDateChange = (date: Date) => {
    updateData({ selectedDate: date }); // Mettre à jour la date sélectionnée dans le contexte
  };

  const handleConfirm = () => {
    if (data.selectedDate) {
      navigate("/confirmation"); // Naviguer vers la page de confirmation
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
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
};

export default CalendrierForm;

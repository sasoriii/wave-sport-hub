import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { useReservation } from "../contexts/ReservationContext";
import { motion } from "framer-motion";

const CalendrierForm = () => {
  const { data, updateData } = useReservation();
  const navigate = useNavigate();

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      updateData({ selectedDate: date });
    }
  };

  const handleConfirm = async () => {
    if (data.selectedDate) {
      try {
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

        const formattedDate = data.selectedDate.toISOString().split('T')[0];

        const response = await fetch('https://back.jeremgabriel.com/HiptoForm/index.php/API/addEvent', {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sport: data.sport.toLowerCase(),
            email: data.email,
            date: formattedDate,
            info: info
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit reservation');
        }

        navigate("/confirmation");
      } catch (error) {
        console.error('Error submitting reservation:', error);
        alert("Une erreur s'est produite lors de la réservation. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez sélectionner une date.");
    }
  };

  const css = `
    .rdp {
      --rdp-cell-size: clamp(32px, 7vw, 45px);
      --rdp-accent-color: #3b82f6;
      --rdp-background-color: #e0e7ff;
      margin: 0;
    }
    @media (max-width: 640px) {
      .rdp {
        font-size: 14px;
      }
      .rdp-caption {
        padding: 0 0.5rem;
      }
      .rdp-nav {
        padding: 0;
      }
    }
    .rdp-day_selected:not([disabled]) { 
      background-color: var(--rdp-accent-color);
      color: white;
      font-weight: bold;
    }
    .rdp-day_selected:hover:not([disabled]) {
      background-color: #2563eb;
    }
    .rdp-day:hover:not([disabled]) {
      background-color: #dbeafe;
    }
    .rdp-button:hover:not([disabled]) {
      background-color: #dbeafe;
    }
    .rdp-nav_button:hover:not([disabled]) {
      background-color: #dbeafe;
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-3 sm:p-8 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl"
    >
      <style>{css}</style>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 text-gray-800 text-center"
      >
        Choisissez une date
      </motion.h2>
      
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div className="w-full max-w-[350px] mx-auto">
          <DayPicker
            mode="single"
            selected={data.selectedDate}
            onSelect={handleDateChange}
            locale={fr}
            className="mx-auto"
            modifiers={{
              disabled: [
                { before: new Date() }
              ]
            }}
            modifiersStyles={{
              disabled: { opacity: 0.5 }
            }}
          />
        </div>
        
        {data.selectedDate && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base text-gray-600 text-center"
          >
            Date sélectionnée : {format(data.selectedDate, 'dd/MM/yyyy', { locale: fr })}
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleConfirm}
          disabled={!data.selectedDate}
          className="w-full sm:w-auto py-3 sm:py-2 px-6 text-base sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          Confirmer la réservation
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CalendrierForm;

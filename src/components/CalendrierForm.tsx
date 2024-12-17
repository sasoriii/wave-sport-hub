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
      --rdp-cell-size: 45px;
      --rdp-accent-color: #3b82f6;
      --rdp-background-color: #e0e7ff;
      margin: 0;
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
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl"
    >
      <style>{css}</style>
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-8 text-gray-800"
      >
        Choisissez une date
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="p-4 bg-white rounded-xl shadow-lg">
          <DayPicker
            mode="single"
            selected={data.selectedDate}
            onSelect={handleDateChange}
            locale={fr}
            fromDate={new Date()}
            modifiers={{
              disabled: [
                { before: new Date() }
              ]
            }}
            modifiersStyles={{
              disabled: { color: '#ddd' }
            }}
          />
        </div>

        {data.selectedDate && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-gray-800"
          >
            Date sélectionnée : {format(data.selectedDate, 'dd MMMM yyyy', { locale: fr })}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          Confirmer la réservation
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CalendrierForm;

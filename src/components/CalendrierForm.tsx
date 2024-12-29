import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { fr } from 'date-fns/locale';
import { addDays, format } from 'date-fns';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReservation } from "../contexts/ReservationContext";

const CalendrierForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, updateData } = useReservation();
  const formData = location.state?.formData;
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleConfirm = async () => {
    if (selectedDate) {
      try {
        const info = `
          Reservation: ${formData.firstNameReservation} ${formData.lastNameReservation}
          Address: ${formData.address}, ${formData.city}
          Phone: ${formData.phone}
          Rider: ${formData.firstNameRider} ${formData.lastNameRider}
          Birth Date: ${format(formData.birthDate, 'dd/MM/yyyy')}
          Height: ${formData.height}cm
          Weight: ${formData.weight}kg
          Suit Size: ${formData.suitSize}
          Shoe Size: ${formData.shoeSize}
          Level: ${formData.level}
        `.trim();

        const formattedDate = selectedDate.toISOString().split('T')[0];

        const response = await fetch('https://back.jeremgabriel.com/HiptoForm/index.php/API/addEvent', {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sport: formData.sport.toLowerCase(),
            email: formData.email,
            date: formattedDate,
            info: info
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit reservation');
        }

        navigate("/confirmation", { replace: true });
      } catch (error) {
        console.error('Error submitting reservation:', error);
        alert("Une erreur s'est produite lors de la réservation. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez sélectionner une date.");
    }
  };

  return (
    <div className="relative z-10 container mx-auto py-12 px-4">
      <motion.div 
        className="max-w-3xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Sélectionnez votre date
        </h2>

        <div className="space-y-8">
          {/* Calendrier */}
          <div className="flex justify-center bg-white/80 backdrop-blur-none rounded-xl p-8 shadow-lg">
            <style>{`
              .rdp {
                --rdp-cell-size: 60px !important;
                --rdp-accent-color: #3b82f6 !important;
                --rdp-background-color: rgba(255, 255, 255, 0.1) !important;
                margin: 0 auto !important;
              }
              .rdp-button:hover:not([disabled]) {
                background-color: rgba(59, 130, 246, 0.5) !important;
              }
              .rdp-day_selected {
                background-color: #3b82f6 !important;
                font-weight: bold;
              }
              .rdp-day_selected:hover {
                background-color: #2563eb !important;
              }
              .rdp-day {
                color: #1a1a1a !important;
                font-size: 1.25rem !important;
                font-weight: 500 !important;
              }
              .rdp-nav_button, .rdp-head_cell {
                color: #1a1a1a !important;
                font-weight: 600 !important;
                font-size: 1.1rem !important;
              }
              .rdp-nav_button:hover {
                background-color: rgba(59, 130, 246, 0.1) !important;
              }
              .rdp-caption {
                font-size: 1.4rem !important;
                color: #1a1a1a !important;
                font-weight: 600 !important;
                margin-bottom: 1rem !important;
                text-align: center !important;
              }
              .rdp-day[disabled] {
                opacity: 0.35 !important;
              }
              .rdp-head_cell {
                font-size: 1rem !important;
                text-transform: uppercase !important;
                font-weight: 600 !important;
                text-align: center !important;
              }
              .rdp-table {
                margin: 0 auto !important;
              }
            `}</style>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              locale={fr}
              className="mx-auto"
              fromDate={new Date()}
              toDate={addDays(new Date(), 60)}
              modifiers={{
                disabled: [{ before: new Date() }],
                highlighted: selectedDate ? [selectedDate] : []
              }}
            />
          </div>

          {/* Résumé et confirmation */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/80 backdrop-blur-none rounded-xl p-8 shadow-lg"
            >
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                Résumé de votre réservation
              </h4>
              <p className="text-gray-800 text-xl mb-6">
                Date sélectionnée : {format(selectedDate, 'dd MMMM yyyy', { locale: fr })}
              </p>
              <button
                onClick={handleConfirm}
                className="w-full px-8 py-4 bg-blue-600 text-white text-xl rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Confirmer la réservation
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CalendrierForm;

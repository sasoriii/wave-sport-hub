import Navbar from "@/components/Navbar";
import ReservationForm from "@/components/ReservationForm";

const Reservation = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="relative">
        <h1 className="text-4xl font-bold text-center w-full absolute text-white">Réservation</h1>
        <ReservationForm />
      </main>
    </div>
  );
};

export default Reservation;
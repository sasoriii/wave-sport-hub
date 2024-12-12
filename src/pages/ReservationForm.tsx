import Navbar from "@/components/Navbar";
import ReservationForm from "@/components/ReservationForm";

const Reservation = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Réservation</h1>
        <ReservationForm />
      </main>
    </div>
  );
};

export default Reservation;
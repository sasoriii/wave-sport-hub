import Navbar from "@/components/Navbar";
import ReservationForm from "@/components/ReservationForm";
import { useParams } from "react-router-dom";
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";
import portImg from "@/assets/images/port.jpg";

const Reservation = () => {
  const { sport } = useParams();
  
  const getBackgroundImage = (sport: string) => {
    switch (sport?.toLowerCase()) {
      case 'kitesurf':
        return kitesurfImg;
      case 'wingfoil':
        return wingfoilImg;
      case 'efoil':
        return efoilImg;
      default:
        return portImg;
    }
  };

  const backgroundImage = getBackgroundImage(sport || '');

  return (
    <div className="min-h-screen">
      <Navbar />
      <main 
        className="min-h-[calc(100vh-64px)] relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center w-full text-white"></h1>
          <ReservationForm />
        </div>
      </main>
    </div>
  );
};

export default Reservation;
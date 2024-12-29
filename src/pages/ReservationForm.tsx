import Navbar from "@/components/Navbar";
import ReservationForm from "@/components/ReservationForm";
import { useParams, useLocation } from "react-router-dom";
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";
import portImg from "@/assets/images/port.jpg";

const Reservation = () => {
  const { sport } = useParams();
  const location = useLocation();
  const sportFromState = location.state?.sport;

  const getBackgroundImage = (sport: string) => {
    switch (sport?.toLowerCase()) {
      case 'kitesurf':
        return portImg;
      case 'wingfoil':
        return portImg;
      case 'efoil':
        return portImg;
      default:
        return portImg;
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${getBackgroundImage(sport || sportFromState)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center w-full text-white"></h1>
        <ReservationForm />
      </div>
    </div>
  );
};

export default Reservation;
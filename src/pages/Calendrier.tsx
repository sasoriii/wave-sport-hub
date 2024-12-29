import Navbar from "@/components/Navbar";
import CalendrierForm from "../components/CalendrierForm";
import { useLocation } from "react-router-dom";
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";
import portImg from "@/assets/images/port.jpg";

const Calendrier = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  
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

  const backgroundImage = getBackgroundImage(formData?.sport);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container mx-auto py-12 px-4">
          <CalendrierForm />
        </div>
      </main>
    </div>
  );
};

export default Calendrier;

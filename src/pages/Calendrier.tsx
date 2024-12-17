import Navbar from "@/components/Navbar";
import CalendrierForm from "../components/CalendrierForm";
import { useLocation } from "react-router-dom";
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";

const Calendrier = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  
  const getBackgroundImage = (sport: string) => {
    switch (sport?.toLowerCase()) {
      case 'kitesurf':
        return kitesurfImg;
      case 'wingfoil':
        return wingfoilImg;
      case 'efoil':
        return efoilImg;
      default:
        return kitesurfImg;
    }
  };

  const backgroundImage = getBackgroundImage(formData?.sport);

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
          <CalendrierForm />
        </div>
      </main>
    </div>
  );
};

export default Calendrier;

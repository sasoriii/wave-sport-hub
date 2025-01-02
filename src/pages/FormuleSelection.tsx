import { useNavigate, useParams } from 'react-router-dom';
import portImg from "@/assets/images/port.jpg";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface Formule {
  id: string;
  title: string;
  description: string;
  priceLowSeason?: string;
  priceHighSeason?: string;
  duration?: string;
  icon?: string;
}

const FormuleSelection = () => {
  const navigate = useNavigate();
  const { sport } = useParams();

  const getFormules = (sport: string): Formule[] => {
    switch (sport?.toLowerCase()) {
      case 'kitesurf':
      case 'wingfoil':
        return [
          { 
            id: '1jour', 
            title: 'Cours 1 jour', 
            description: 'Une journée intensive pour découvrir ou progresser',
            duration: '3h',
            priceLowSeason: '110,00 €',
            priceHighSeason: '150,00 €',
            icon: '🌅'
          },
          { 
            id: '3jours', 
            title: 'Cours 3 jours', 
            description: 'Programme sur 3 jours pour une meilleure maîtrise',
            duration: '3h/jour',
            priceLowSeason: '330,00 €',
            priceHighSeason: '420,00 €',
            icon: '🌊'
          },
          { 
            id: '5jours', 
            title: 'Cours 5 jours', 
            description: 'Formation complète sur 5 jours',
            duration: '3h/jour',
            priceLowSeason: '530,00 €',
            priceHighSeason: '650,00 €',
            icon: '🏄‍♂️'
          },
          { 
            id: 'surveillance', 
            title: 'Navigation surveillée', 
            description: 'Navigation en autonomie avec surveillance',
            duration: '3h',
            priceLowSeason: '90,00 €',
            priceHighSeason: '90,00 €',
            icon: '👀'
          }
        ];
      case 'efoil':
        return [
          { 
            id: '1jour', 
            title: 'Cours 1 jour', 
            description: 'Initiation à l\'eFoil sur une journée',
            duration: '1h',
            priceLowSeason: '120,00 €',
            priceHighSeason: '120,00 €',
            icon: '🌅'
          },
          { 
            id: '3jours', 
            title: 'Cours 3 jours', 
            description: 'Programme approfondi sur 3 jours',
            duration: '1h/jour',
            priceLowSeason: '330,00 €',
            priceHighSeason: '330,00 €',
            icon: '🌊'
          },
          { 
            id: '5jours', 
            title: 'Cours 5 jours', 
            description: 'Maîtrise complète sur 5 jours',
            duration: '1h/jour',
            priceLowSeason: '500,00 €',
            priceHighSeason: '500,00 €',
            icon: '🏄‍♂️'
          },
          { 
            id: 'duo', 
            title: 'Session Duo', 
            description: 'Partagez l\'expérience à deux',
            duration: '1h',
            priceLowSeason: '160,00 € soit 80,00 € par personne',
            priceHighSeason: '160,00 €',
            icon: '👥'
          },
          { 
            id: 'apero2', 
            title: 'Apéro/Sunset 2 personnes', 
            description: 'Session sunset pour 2 personnes',
            duration: '3h',
            priceLowSeason: '300,00 € soit 150,00 € par personne',
            priceHighSeason: '300,00 € soit 150,00 € par personne',
            icon: '🌅'
          },
          { 
            id: 'apero4', 
            title: 'Apéro/Sunset 4 personnes', 
            description: 'Session sunset pour 4 personnes',
            duration: '3h',
            priceLowSeason: '550,00 € soit 137,50 € par personne',
            priceHighSeason: '550,00 € soit 137,50 € par personne',
            icon: '🎉'
          }
        ];
      default:
        return [];
    }
  };

  const handleFormuleSelect = (formuleId: string) => {
    navigate(`/reservation/${sport}/${formuleId}`);
  };

  const formules = getFormules(sport || '');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${portImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
          <motion.h1 
            className="text-6xl font-bold text-white mb-12 text-center pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Formules {sport?.charAt(0).toUpperCase() + sport?.slice(1)}
          </motion.h1>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 max-w-6xl mx-auto w-full px-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {formules.map((formule) => (
              <motion.div
                key={formule.id}
                variants={item}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md p-8 hover:bg-white/90 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
                onClick={() => handleFormuleSelect(formule.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute top-0 right-0 p-6 text-5xl">
                  {formule.icon}
                </div>
                
                <h3 className="text-3xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {formule.title}
                </h3>
                
                {formule.duration && (
                  <div className="inline-block px-4 py-2 mb-4 rounded-full bg-blue-600 text-white text-base font-medium">
                    {formule.duration}
                  </div>
                )}
                
                <p className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors">
                  {formule.description}
                </p>
                
                <div className="mt-6 flex flex-col space-y-2">
                  {formule.priceLowSeason && formule.priceHighSeason ? (
                    <>
                      <div className="text-lg">
                        <span className="font-semibold text-blue-700">Basse saison : </span>
                        <span className="font-bold">{formule.priceLowSeason}</span>
                      </div>
                      <div className="text-lg">
                        <span className="font-semibold text-blue-700">Haute saison : </span>
                        <span className="font-bold">{formule.priceHighSeason}</span>
                      </div>
                    </>
                  ) : formule.priceLowSeason && (
                    <div className="text-2xl font-bold text-blue-700">
                      {formule.priceLowSeason}
                    </div>
                  )}
                  <div className="text-2xl transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 text-right">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FormuleSelection;

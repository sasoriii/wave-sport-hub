import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ActivityCardProps {
  title: string;
  imageUrl: string;
}

const getActivityDescription = (title: string) => {
  switch (title.toLowerCase()) {
    case 'kitesurf':
      return "Discipline incontournable de nos jours, découvrez ce qui séduit tant les pratiquants : l'art de danser avec le vent.";
    case 'wingfoil':
      return "Nouvelle discipline en plein essor, le wingfoil vous invite à jouer avec les éléments et à voler au-dessus de l’eau grâce au foil.";
    case 'efoil':
      return "Révolutionnaire et silencieux, le e-foil vous offre la sensation unique de voler au-dessus de l’eau en toute légèreté.";
    default:
      return "";
  }
};

const ActivityCard = ({ title, imageUrl }: ActivityCardProps) => {
  const description = getActivityDescription(title);
  
  return (
    <motion.div 
      className="relative h-[33vh] md:h-screen flex-1 overflow-hidden pt-16 md:pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300" />
      
      <motion.div 
        className="relative h-full flex flex-col items-center md:justify-center justify-between pt-4 pb-6 md:py-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider text-center drop-shadow-lg md:mb-8">
          {title}
        </h2>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row md:flex-col gap-3 justify-center px-4 w-full md:max-w-[180px]">
            <Link
              to={`/formules/${title.toLowerCase()}`}
              state={{ sport: title.toLowerCase() }}
              className="w-28 md:w-full"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors duration-300 text-sm md:text-base whitespace-nowrap md:whitespace-normal"
              >
                Réserver
              </motion.button>
            </Link>
            
            <Link to={`/${title.toLowerCase()}`} className="w-28 md:w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium shadow-lg hover:bg-white/20 transition-colors duration-300 border border-white/30 text-sm md:text-base whitespace-nowrap md:whitespace-normal"
              >
                En savoir +
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 text-center pb-4 md:pb-8 z-10">
        <p className="text-white/90 text-sm md:text-base max-w-[280px] mx-auto px-4">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
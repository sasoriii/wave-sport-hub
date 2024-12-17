import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ActivityCardProps {
  title: string;
  imageUrl: string;
}

const ActivityCard = ({ title, imageUrl }: ActivityCardProps) => {
  return (
    <motion.div 
      className="relative h-screen flex-1 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 transition-opacity duration-300" />
      
      <motion.div 
        className="relative h-full flex flex-col items-center justify-center space-y-8 px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-5xl font-bold text-white tracking-wider text-center drop-shadow-lg">
          {title}
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to={`/reservation/${title.toLowerCase()}`}
            state={{ sport: title.toLowerCase() }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Réserver maintenant
            </motion.button>
          </Link>
          
          <Link to={`/${title.toLowerCase()}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium shadow-lg hover:bg-white/20 transition-colors duration-300 border border-white/30"
            >
              En savoir plus
            </motion.button>
          </Link>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-0 right-0 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-white/80 text-sm">
            Découvrez l'expérience unique du {title}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ActivityCard;
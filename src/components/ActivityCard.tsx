import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  title: string;
  imageUrl: string;
}

const ActivityCard = ({ title, imageUrl }: ActivityCardProps) => {
  return (
    <div className="relative h-screen flex-1 group">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
      
      <div className="relative h-full flex flex-col items-center justify-center space-y-8">
        <h2 className="text-4xl font-bold text-white tracking-wider">{title}</h2>
        
        <div className="space-x-4">
          <Link
            to={`/reservation/${title.toLowerCase()}`}
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Réserver
          </Link>
          <Link
            to={`/${title.toLowerCase()}`}
            className="inline-block bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
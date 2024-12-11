import { Button } from "@/components/ui/button";

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
        
        <div className="space-y-4">
          <Button
            className="w-40 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          >
            Réserver
          </Button>
          
          <Button
            variant="outline"
            className="w-40 border-white text-white hover:bg-white/10 transition-colors duration-200"
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
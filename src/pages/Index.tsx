import Navbar from "@/components/Navbar";
import ActivityCard from "@/components/ActivityCard";
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";


const activities = [
  {
    title: "Kitesurf",
    imageUrl: kitesurfImg,
  },
  {
    title: "Wingfoil",
    imageUrl: wingfoilImg,
  },
  {
    title: "Efoil",
    imageUrl: efoilImg,
  },
];



const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.title}
            title={activity.title}
            imageUrl={activity.imageUrl}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
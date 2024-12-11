import Navbar from "@/components/Navbar";
import ActivityCard from "@/components/ActivityCard";

const activities = [
  {
    title: "Kitesurf",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
  },
  {
    title: "Wingfoil",
    imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&q=80",
  },
  {
    title: "Efoil",
    imageUrl: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&q=80",
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
import Navbar from "@/components/Navbar";
import CalendrierForm from "../components/CalendrierForm";

const Calendrier = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Choisissez une date</h1>
        <CalendrierForm />
      </main>
    </div>
  );
};

export default Calendrier;

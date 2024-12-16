import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReservation } from "../contexts/ReservationContext.tsx"; // Import the ReservationContext

const ReservationForm = () => {
  const navigate = useNavigate();
  const { sport } = useParams();
  const { updateData } = useReservation(); // Use the updateData function from the ReservationContext
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstNameReservation: "",
    lastNameReservation: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    firstNameRider: "",
    lastNameRider: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    height: "",
    weight: "",
    suitSize: "",
    shoeSize: "",
    level: "",
    sport: "",  // Ajout du champ sport
    sports: [] as string[],
  });

  useEffect(() => {
    if (sport) {
      setFormData(prev => ({ ...prev, sport: sport.toLowerCase() }));
      updateData({ selectedSport: sport.toLowerCase() });
    }
  }, [sport, updateData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Sauvegarder toutes les données dans le contexte avant de naviguer
      updateData({
        firstNameReservation: formData.firstNameReservation,
        lastNameReservation: formData.lastNameReservation,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        firstNameRider: formData.firstNameRider,
        lastNameRider: formData.lastNameRider,
        birthDay: formData.birthDay,
        birthMonth: formData.birthMonth,
        birthYear: formData.birthYear,
        height: formData.height,
        weight: formData.weight,
        suitSize: formData.suitSize,
        shoeSize: formData.shoeSize,
        level: formData.level,
        sport: formData.sport,  // Ajout du sport dans la mise à jour
        sports: formData.sports
      });
      navigate("/Calendar");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom *</label>
                <input
                  type="text"
                  name="firstNameReservation"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.firstNameReservation}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  name="lastNameReservation"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.lastNameReservation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Adresse *</label>
              <input
                type="text"
                name="address"
                required
                className="w-full p-2 border rounded"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ville *</label>
              <input
                type="text"
                name="city"
                required
                className="w-full p-2 border rounded"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone *</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Informations personnelles du participant</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Prénom *</label>
                <input
                  type="text"
                  name="firstNameRider"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.firstNameRider}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  name="lastNameRider"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.lastNameRider}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Jour *</label>
                <input
                  type="text"
                  name="birthDay"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.birthDay}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mois *</label>
                <input
                  type="text"
                  name="birthMonth"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.birthMonth}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Année *</label>
                <input
                  type="text"
                  name="birthYear"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.birthYear}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Taille (cm) *</label>
                <input
                  type="number"
                  name="height"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Poids (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Taille combinaison *</label>
              <select
                name="suitSize"
                required
                className="w-full p-2 border rounded"
                value={formData.suitSize}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="J'ai ma combinaison">J'ai ma combinaison</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pointure *</label>
              <input
                type="number"
                name="shoeSize"
                required
                className="w-full p-2 border rounded"
                value={formData.shoeSize}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Niveau *</label>
              <select
                name="level"
                required
                className="w-full p-2 border rounded"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="never">Jamais pratiqué</option>
                <option value="piloting">Pilotage</option>
                <option value="swimming">Nage tractée</option>
                <option value="firstGlide">Première glisse</option>
                <option value="bothSides">Tire mes bords des deux côtés</option>
                <option value="upwind">Remonte au vent</option>
              </select>
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {step === 1 ? "Suivant" : "Voir le calendrier"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
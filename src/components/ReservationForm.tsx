import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstNameReservation: "",
    lastNameReservation: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    firstNameRider: "",
    LastNameRider: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    height: "",
    weight: "",
    suitSize: "",
    shoeSize: "",
    level: "",
    sports: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/Calendar"); // You'll need to implement the calendar page
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
                  name="firstName"
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
                  name="lastName"
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
                  name="participantFirstName"
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
                  name="participantLastName"
                  required
                  className="w-full p-2 border rounded"
                  value={formData.LastNameRider}
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
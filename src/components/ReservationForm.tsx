import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useReservation } from "../contexts/ReservationContext.tsx";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale/fr';
import kitesurfImg from "@/assets/images/kitesurf.jpg";
import wingfoilImg from "@/assets/images/wingfoil.jpg";
import efoilImg from "@/assets/images/efoil.jpg";

registerLocale('fr', fr);

// Définition du schéma de validation avec Zod
const step1Schema = z.object({
  firstNameReservation: z.string().min(1, "Le prénom est requis"),
  lastNameReservation: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Format de téléphone invalide"),
  sport: z.string(),
  sports: z.array(z.string()),
  // Les champs de l'étape 2 sont optionnels pour l'étape 1
  firstNameRider: z.string().optional(),
  lastNameRider: z.string().optional(),
  birthDate: z.date().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  suitSize: z.string().optional(),
  shoeSize: z.string().optional(),
  level: z.string().optional(),
});

const step2Schema = z.object({
  firstNameReservation: z.string(),
  lastNameReservation: z.string(),
  email: z.string(),
  address: z.string(),
  city: z.string(),
  phone: z.string(),
  sport: z.string(),
  sports: z.array(z.string()),
  firstNameRider: z.string().min(1, "Le prénom du rider est requis"),
  lastNameRider: z.string().min(1, "Le nom du rider est requis"),
  birthDate: z.date({
    required_error: "La date de naissance est requise",
    invalid_type_error: "Format de date invalide",
  }).max(new Date(), "La date ne peut pas être dans le futur"),
  height: z.string().min(1, "La taille est requise"),
  weight: z.string().min(1, "Le poids est requis"),
  suitSize: z.string().min(1, "La taille de combinaison est requise"),
  shoeSize: z.string().min(1, "La pointure est requise"),
  level: z.string().min(1, "Le niveau est requis"),
});

type FormValues = z.infer<typeof step1Schema>;

const getBackgroundImage = (sport: string) => {
  switch (sport.toLowerCase()) {
    case 'kitesurf':
      return kitesurfImg;
    case 'wingfoil':
      return wingfoilImg;
    case 'efoil':
      return efoilImg;
    default:
      return kitesurfImg;
  }
};

const ReservationForm = () => {
  const navigate = useNavigate();
  const { sport } = useParams();
  const location = useLocation();
  const sportFromState = location.state?.sport;
  const { updateData } = useReservation();
  const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<Partial<FormValues>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    defaultValues: {
      sport: sportFromState || "",
      sports: [],
    },
    mode: "onChange"
  });

  const onSubmit = (data: FormValues) => {
    if (step === 1) {
      setStepOneData(data);
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      updateData(data);
      navigate("/calendar", { state: { formData: data } });
    }
  };

  const backgroundImage = getBackgroundImage(sport || sportFromState || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/0 to-blue-100/0 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 py-12 px-6 relative">
            <h2 className="text-3xl font-bold text-white text-center">
              {step === 1 ? "Informations de réservation" : "Informations du rider"}
            </h2>
          </div>

          {/* Indicateur de progression */}
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between mb-8">
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-4 ${
                    step === 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8">
            <div className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prénom</label>
                      <input
                        {...register("firstNameReservation")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.firstNameReservation && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstNameReservation.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        {...register("lastNameReservation")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.lastNameReservation && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastNameReservation.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      {...register("phone")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                      {...register("address")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                      {...register("city")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Prénom du rider</label>
                      <input
                        {...register("firstNameRider")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.firstNameRider && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstNameRider.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom du rider</label>
                      <input
                        {...register("lastNameRider")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.lastNameRider && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastNameRider.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                    <Controller
                      control={control}
                      name="birthDate"
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          dateFormat="dd/MM/yyyy"
                          locale="fr"
                          placeholderText="Sélectionnez une date"
                        />
                      )}
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Taille (cm)</label>
                      <input
                        {...register("height")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.height && (
                        <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Poids (kg)</label>
                      <input
                        {...register("weight")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.weight && (
                        <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Taille combinaison</label>
                      <select
                        {...register("suitSize")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Sélectionnez une taille</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                      {errors.suitSize && (
                        <p className="mt-1 text-sm text-red-600">{errors.suitSize.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pointure</label>
                      <input
                        {...register("shoeSize")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.shoeSize && (
                        <p className="mt-1 text-sm text-red-600">{errors.shoeSize.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Niveau</label>
                    <select
                      {...register("level")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez un niveau</option>
                      <option value="debutant">Débutant</option>
                      <option value="intermediaire">Intermédiaire</option>
                      <option value="avance">Avancé</option>
                    </select>
                    {errors.level && (
                      <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Retour
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {step === 1 ? "Suivant" : "Réserver"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
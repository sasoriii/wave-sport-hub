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
import portImg from "@/assets/images/port.jpg";

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
  return portImg;  // Retourne toujours l'image du port
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/0 to-blue-100/0 py-4 sm:py-12">
      <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 py-6 sm:py-12 px-4 sm:px-6 relative">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
              {step === 1 ? "Informations de réservation" : "Informations du rider"}
            </h2>
          </div>

          {/* Indicateur de progression */}
          <div className="px-4 sm:px-8 pt-4 sm:pt-6">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <div className="w-full">
                <div className="flex items-center">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 sm:mx-4 ${
                    step === 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                    step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    2
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="space-y-4 sm:space-y-6">
              {step === 1 ? (
                <>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        {...register("firstNameReservation")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.firstNameReservation && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstNameReservation.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        {...register("lastNameReservation")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.lastNameReservation && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastNameReservation.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      {...register("phone")}
                      className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      {...register("address")}
                      className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      {...register("city")}
                      className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                </>

              ) : (
                <>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom du rider</label>
                      <input
                        {...register("firstNameRider")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.firstNameRider && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstNameRider.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom du rider</label>
                      <input
                        {...register("lastNameRider")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.lastNameRider && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastNameRider.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                    <Controller
                      control={control}
                      name="birthDate"
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          dateFormat="dd/MM/yyyy"
                          locale="fr"
                          placeholderText="Sélectionnez une date"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          dropdownMode="select"
                        />
                      )}
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.birthDate.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taille (cm)</label>
                      <input
                        {...register("height")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.height && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.height.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                      <input
                        {...register("weight")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.weight && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.weight.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Taille combinaison</label>
                      <select
                        {...register("suitSize")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Sélectionnez une taille</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                      {errors.suitSize && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.suitSize.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pointure</label>
                      <input
                        {...register("shoeSize")}
                        className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.shoeSize && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.shoeSize.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select
                      {...register("level")}
                      className="block w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez un niveau</option>
                      <option value="debutant">Débutant</option>
                      <option value="intermediaire">Intermédiaire</option>
                      <option value="avance">Avancé</option>
                    </select>
                    {errors.level && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.level.message}</p>
                    )}
                  </div>
                </>

              )}

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-6">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto py-3 sm:py-2 px-4 text-base sm:text-sm border border-blue-600 font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex justify-center items-center"
                  >
                    Retour
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full sm:w-auto py-3 sm:py-2 px-6 text-base sm:text-sm border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex justify-center items-center transition-colors duration-200"
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
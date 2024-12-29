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
const reservationSchema = z.object({
  firstNameReservation: z.string().min(1, "Le prénom est requis"),
  lastNameReservation: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Format de téléphone invalide"),
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

type FormValues = z.infer<typeof reservationSchema>;

const getBackgroundImage = (sport: string) => {
  return portImg;  // Retourne toujours l'image du port
};

const ReservationForm = () => {
  const { sport } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const sportFromState = location.state?.sport;
  const currentSport = sport || sportFromState;
  const { updateData } = useReservation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      sport: currentSport,
      sports: [],
    },
    mode: "onChange"
  });

  const onSubmit = (data: FormValues) => {
    updateData(data);
    navigate("/calendar", { state: { formData: data } });
  };

  const backgroundImage = getBackgroundImage(currentSport);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Réservation {currentSport}
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informations personnelles */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Informations personnelles</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Nom</label>
                <input
                  {...register("lastNameReservation")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre nom"
                />
                {errors.lastNameReservation && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastNameReservation.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Prénom</label>
                <input
                  {...register("firstNameReservation")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre prénom"
                />
                {errors.firstNameReservation && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstNameReservation.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Téléphone</label>
                <input
                  {...register("phone")}
                  type="tel"
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre numéro"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Adresse</label>
                <input
                  {...register("address")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre adresse"
                />
                {errors.address && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Ville</label>
                <input
                  {...register("city")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre ville"
                />
                {errors.city && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Détails de la réservation */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Détails de la réservation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Prénom du rider</label>
                <input
                  {...register("firstNameRider")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prénom du rider"
                />
                {errors.firstNameRider && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstNameRider.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Nom du rider</label>
                <input
                  {...register("lastNameRider")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom du rider"
                />
                {errors.lastNameRider && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastNameRider.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Date de naissance</label>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div>
                <label className="block text-white mb-2">Taille (cm)</label>
                <input
                  {...register("height")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Taille (cm)"
                />
                {errors.height && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.height.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Poids (kg)</label>
                <input
                  {...register("weight")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Poids (kg)"
                />
                {errors.weight && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.weight.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Taille combinaison</label>
                <select
                  {...register("suitSize")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-white mb-2">Pointure</label>
                <input
                  {...register("shoeSize")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Pointure"
                />
                {errors.shoeSize && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.shoeSize.message}</p>
                )}
              </div>
              <div>
                <label className="block text-white mb-2">Niveau</label>
                <select
                  {...register("level")}
                  className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
          </div>
        </form>

        {/* Bouton de soumission */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
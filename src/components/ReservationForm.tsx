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
    console.log("Form submitted:", data);
    if (step === 1) {
      setStepOneData(data);
      setStep(2);
      reset({
        ...data,
        firstNameRider: "",
        lastNameRider: "",
        birthDate: undefined,
        height: "",
        weight: "",
        suitSize: "",
        shoeSize: "",
        level: "",
      });
    } else {
      updateData({
        ...stepOneData,
        ...data,
        selectedDate: data.birthDate || null,
        sport: sportFromState,
      });
      navigate("/Calendar");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${getBackgroundImage(sportFromState || '')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="min-h-screen bg-black/60">
        <div className="container mx-auto pt-20">
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Prénom *</label>
                    <input
                      {...register("firstNameReservation")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.firstNameReservation && (
                      <p className="text-red-500 text-sm">{errors.firstNameReservation.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input
                      {...register("lastNameReservation")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.lastNameReservation && (
                      <p className="text-red-500 text-sm">{errors.lastNameReservation.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">E-mail *</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Adresse *</label>
                  <input
                    {...register("address")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ville *</label>
                  <input
                    {...register("city")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone *</label>
                  <input
                    {...register("phone")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">Informations du rider</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Prénom *</label>
                    <input
                      {...register("firstNameRider")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.firstNameRider && (
                      <p className="text-red-500 text-sm">{errors.firstNameRider.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input
                      {...register("lastNameRider")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.lastNameRider && (
                      <p className="text-red-500 text-sm">{errors.lastNameRider.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date de naissance *</label>
                  <Controller
                    control={control}
                    name="birthDate"
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        selected={value}
                        onChange={onChange}
                        dateFormat="dd/MM/yyyy"
                        locale="fr"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        placeholderText="Sélectionnez une date"
                        className="w-full p-2 border rounded"
                        maxDate={new Date()}
                      />
                    )}
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Taille (cm) *</label>
                    <input
                      {...register("height")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.height && (
                      <p className="text-red-500 text-sm">{errors.height.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Poids (kg) *</label>
                    <input
                      {...register("weight")}
                      className="w-full p-2 border rounded"
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-sm">{errors.weight.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Taille combinaison *</label>
                  <select
                    {...register("suitSize")}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Sélectionner</option>
                    <option value="J'ai ma combinaison">J'ai ma combinaison</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  {errors.suitSize && (
                    <p className="text-red-500 text-sm">{errors.suitSize.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Pointure *</label>
                  <input
                    {...register("shoeSize")}
                    className="w-full p-2 border rounded"
                  />
                  {errors.shoeSize && (
                    <p className="text-red-500 text-sm">{errors.shoeSize.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Niveau *</label>
                  <select
                    {...register("level")}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Sélectionner</option>
                    <option value="never">Jamais pratiqué</option>
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                    <option value="expert">Expert</option>
                  </select>
                  {errors.level && (
                    <p className="text-red-500 text-sm">{errors.level.message}</p>
                  )}
                </div>
              </>
            )}
            <div className="flex justify-between mt-6">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Retour
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                {step === 1 ? "Suivant" : "Réserver"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
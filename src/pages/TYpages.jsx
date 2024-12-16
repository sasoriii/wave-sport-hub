import { useReservation } from "@/context/ReservationContext";

const TYpages = () => {
  const { data } = useReservation();

  return (
    <div>
      <h1>Confirmation</h1>
      <p>Prénom : {data.firstName}</p>
      <p>Nom : {data.lastName}</p>
      <p>E-mail : {data.email}</p>
      <p>Date sélectionnée : {data.selectedDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default TYpages;

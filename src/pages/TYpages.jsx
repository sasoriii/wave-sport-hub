import { useReservation } from "../contexts/ReservationContext";

const TYpages = () => {
  const { data } = useReservation();

  return (
    <div>
      <h1>Confirmation</h1>
      <p>Prénom : {data.firstNameReservation}</p>
      <p>Nom : {data.lastNameReservation}</p>
      <p>E-mail : {data.email}</p>
      <p>Date sélectionnée : {data.selectedDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default TYpages;

import React, { createContext, useContext, useState } from "react";

type ReservationData = {
  firstNameReservation: string;
  lastNameReservation: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  firstNameRider: string;
  lastNameRider: string;
  selectedDate: Date | null;
};

type ReservationContextType = {
  data: ReservationData;
  updateData: (newData: Partial<ReservationData>) => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ReservationData>({
    firstNameReservation: "",
    lastNameReservation: "",
    address: "",
    city: "",
    firstNameRider: "",
    lastNameRider: "",
    email: "",
    phone: "",
    selectedDate: null,
  });

  const updateData = (newData: Partial<ReservationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <ReservationContext.Provider value={{ data, updateData }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};

export { ReservationProvider, useReservation };

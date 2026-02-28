export const serviceTypes = [
  { value: "CORTE", label: "Corte" },
  { value: "BARBA", label: "Barba" },
  { value: "CORTE_E_BARBA", label: "Corte e Barba" }
];

export const initialClient = { name: "", email: "", phone: "" };
export const initialBarber = { name: "", specialty: "" };
export const initialService = { name: "", type: "CORTE", price: "", durationMinutes: "" };
export const initialAppointment = {
  clientName: "",
  barberId: "",
  serviceId: "",
  appointmentDateTime: "",
  notes: ""
};

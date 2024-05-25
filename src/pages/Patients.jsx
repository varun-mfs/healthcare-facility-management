import { useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import { PatientProvider } from "../features/patient/provider";

function Patient() {
  // const { loading, error, addPatient, updatePatient, deletePatient } = usePatientContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePatientFormVisibility = (visibility) => {
    setIsModalOpen(visibility);
  }

  return (
    <PatientProvider>
      <PatientList handlePatientFormVisibility={handlePatientFormVisibility} />
      <PatientForm
        open={isModalOpen}
        handlePatientFormVisibility={handlePatientFormVisibility}
      />
    </PatientProvider>
  )
}

export default Patient;
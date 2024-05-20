import { useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

function Patient() {

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Priya Patel',
      dateOfBirth: '1987-10-03',
      email: 'priya.patel@qmail.com',
      phone: '99999 88800',
      medicalHistory: 'Diabetes',
    },
    {
      id: 2,
      name: 'Amit Kumar',
      dateOfBirth: '1975-01-23',
      email: 'amit.kumar@gmail.com',
      phone: '99999 00088',
      medicalHistory: 'Allergic to penicillin.',
    },
    {
      id: 3,
      name: 'Sneha Singh',
      dateOfBirth: '1995-05-04',
      email: 'sneha.singh@example.com',
      phone: '99999 77788',
      medicalHistory: 'Seasonal allergies',
    },
    {
      id: 4,
      name: 'Anjali Sharma',
      dateOfBirth: '1982-09-09',
      email: 'anjali.sharma@example.com',
      phone: '99999 88888',
      medicalHistory: 'Thyroid disorder',
    },
    {
      id: 5,
      name: 'Rajesh Gupta',
      dateOfBirth: '1978-05-12',
      email: 'rajesh.gupta@test.com',
      phone: '99999 77888',
      medicalHistory: 'Mouth ulcer',
    },
    {
      id: 6,
      name: 'Preeti Singh',
      dateOfBirth: '1990-08-06',
      email: 'preeti.singh@example.com',
      phone: '99999 11888',
      medicalHistory: 'Anemia',
    },
    {
      id: 7,
      name: 'Sanjay Patel',
      dateOfBirth: '1989-11-02',
      email: 'sanjay.patel@example.com',
      phone: '99999 88888',
      medicalHistory: 'Migraine',
    },
    {
      id: 8,
      name: 'Shreya Das',
      dateOfBirth: '1993-02-07',
      email: 'shreya.das@example.com',
      phone: '99999 88888',
      medicalHistory: 'No significant medical history.',
    },
    // Add more patient data as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  console.log("🚀 ~ file: Patients.jsx:69 ~ Patient ~ currentPatient:", currentPatient)

  const handleAddOrEditPatient = (patient) => {
    if (!currentPatient) {
      // Add patient
      setPatients((prevPatients) => [...prevPatients, patient]);
    } else {
      // Edit patient
      const updatedPatients = patients.map((p) =>
        p === currentPatient ? patient : p
      );
      setPatients(updatedPatients);
    }
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = (patient) => {
    console.log("🚀 ~ file: Patients.jsx:98 ~ handleDelete ~ patient:", patient)
    const updatedPatients = patients.filter((p) => p.id !== patient.id);
    console.log("🚀 ~ file: Patients.jsx:100 ~ handleDelete ~ updatedPatients:", updatedPatients)
    setPatients(updatedPatients);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  return (
    <>
      <PatientList setIsModalOpen={setIsModalOpen} patients={patients} onEdit={handleEdit} onDelete={handleDelete} />
      <PatientForm
        open={isModalOpen}
        handleClose={handleClose}
        handleAddOrEditPatient={handleAddOrEditPatient}
        patientData={currentPatient}
      />
    </>
  )
}

export default Patient;
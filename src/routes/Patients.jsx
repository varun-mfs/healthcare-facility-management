import { useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

function Patient() {

  const [patients, setPatients] = useState([
    {
      name: 'Priya Patel',
      dateOfBirth: '03-10-1987',
      email: 'priya.patel@qmail.com',
      phone: '99999 88800',
      medicalHistory: 'Diabetes',
    },
    {
      name: 'Amit Kumar',
      dateOfBirth: '23-01-1975',
      email: 'amit.kumar@gmail.com',
      phone: '99999 00088',
      medicalHistory: 'Allergic to penicillin.',
    },
    {
      name: 'Sneha Singh',
      dateOfBirth: '04-05-1995',
      email: 'sneha.singh@example.com',
      phone: '99999 77788',
      medicalHistory: 'Seasonal allergies',
    },
    {
      name: 'Anjali Sharma',
      dateOfBirth: '09-09-1982',
      email: 'anjali.sharma@example.com',
      phone: '99999 88888',
      medicalHistory: 'Thyroid disorder',
    },
    {
      name: 'Rajesh Gupta',
      dateOfBirth: '12-05-1978',
      email: 'rajesh.gupta@test.com',
      phone: '99999 77888',
      medicalHistory: 'Mouth ulcer',
    },
    {
      name: 'Preeti Singh',
      dateOfBirth: '06-08-1990',
      email: 'preeti.singh@example.com',
      phone: '99999 11888',
      medicalHistory: 'Anemia',
    },
    {
      name: 'Sanjay Patel',
      dateOfBirth: '02-11-1989',
      email: 'sanjay.patel@example.com',
      phone: '99999 88888',
      medicalHistory: 'Migraine',
    },
    {
      name: 'Shreya Das',
      dateOfBirth: '07-02-1993',
      email: 'shreya.das@example.com',
      phone: '99999 88888',
      medicalHistory: 'No significant medical history.',
    },
    // Add more patient data as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPatient = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };


  return (
    <>
      <PatientList setIsModalOpen={setIsModalOpen} patients={patients} />
      <PatientForm
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleAddPatient={handleAddPatient}
      />
    </>
  )
}

export default Patient;
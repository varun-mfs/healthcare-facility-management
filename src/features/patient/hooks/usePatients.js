import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/patients`);
      setPatients(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patient) => {
    try {
      const response = await axios.post(`${baseUrl}/patients`, patient);
      setPatients([...patients, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updatePatient = async (id, updatedPatient) => {
    try {
      const response = await axios.put(`${baseUrl}/patients/${id}`, updatedPatient);
      setPatients(patients.map((patient) => (patient.id === id ? response.data : patient)));
    } catch (err) {
      setError(err);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${baseUrl}/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
  };
};

export default usePatients;

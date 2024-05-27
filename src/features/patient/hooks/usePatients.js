import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get(`${baseUrl}/patients`);
            setPatients(response.data);
        } catch (err) {
            setError(err);
        } finally {
            isFesetIsFetchingching(false);
        }
    };

    const addPatient = async (patient) => {
        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/patients`, patient);
            setPatients([...patients, response.data]);
            return true;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const updatePatient = async (id, updatedPatient) => {
        try {
            setLoading(true);
            const response = await axios.put(`${baseUrl}/patients/${id}`, updatedPatient);
            setPatients(patients.map((patient) => (patient.id === id ? response.data : patient)));
            return true;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const deletePatient = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${baseUrl}/patients/${id}`);
            setPatients(patients.filter((patient) => patient.id !== id));
            return true;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const searchPatient = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/patients?q=${query}`);
            setPatients(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        isFetching,
        patients,
        loading,
        error,
        addPatient,
        updatePatient,
        deletePatient,
        searchPatient
    };
};

export { usePatients };

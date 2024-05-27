import React, { useCallback, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Grid } from '@mui/material';
import { usePatientContext } from '../features/patient/hooks';
import { PatientTable } from '../features/patient/components';

const PatientList = ({ handlePatientFormVisibility }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { addPatient, updatePatient, deletePatient, searchPatient, patients, loading, error, setCurrentPatient, currentPatient } = usePatientContext();

    // Custom debounce function
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((term) => {
            const lowerCaseTerm = term.toLowerCase();
            // search patient api call
            searchPatient(lowerCaseTerm);
        }, 700), // 300ms delay
        [patients]
    );

    const handleSearch = (event) => {
        // call search patient api
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Grid container spacing={2} alignItems="center" style={{ marginBottom: '20px' }}>
                <Grid item xs>
                    <TextField
                        label="Search Patients"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary"
                        onClick={() => { handlePatientFormVisibility(true); }}
                    >
                        Add Patient
                    </Button>
                </Grid>
            </Grid>
            <PatientTable patients={patients} handlePatientFormVisibility={handlePatientFormVisibility}></PatientTable>
        </div >
    );
};

export default PatientList;

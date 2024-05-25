import React, { useCallback, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import { usePatientContext } from '../features/patient/hooks';

const PatientList = ({ handlePatientFormVisibility }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const { addPatient, updatePatient, deletePatient, searchPatient, patients, loading, error, setCurrentPatient, currentPatient } = usePatientContext();

    const handleAddOrEditPatient = (patient) => {
        handlePatientFormVisibility(true);
        // if (!patientData) {
        //     // Add patient
        //     addPatient(patient);
        // } else {
        //     // Edit patient
        //     updatePatient(patientData.id, patient);
        // }
        // handleClose();
    };

    const handleEdit = (patient) => {
        setCurrentPatient(patient);
        handlePatientFormVisibility(true);
    };

    const handleDelete = (patient) => {
        deletePatient(patient.id);
    };

    const handleClose = () => {
        handlePatientFormVisibility(false);
        setCurrentPatient(null);
    };

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

    // const handleEdit = (patient) => {
    //     onEdit(patient);
    // };

    // const handleDelete = (patient) => {
    //     onDelete(patient)
    // };

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
                        onClick={handleAddOrEditPatient}
                    >
                        Add Patient
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Medical History & Allergies</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients?.map((patient, index) => (
                            <TableRow key={index}>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.dateOfBirth}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.medicalHistory}</TableCell>
                                <TableCell>
                                    <Button sx={{ marginRight: "5px" }} title='Add Appointment' variant="outlined" color="info" ><AddAlarmIcon /></Button>
                                    <Button sx={{ marginRight: "5px" }} title='Edit Patient' variant="outlined" color="secondary" onClick={() => handleEdit(patient)}><EditIcon /></Button>
                                    <Button variant="outlined" title='Delete Patient' color="error" onClick={() => handleDelete(patient)}><DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default PatientList;

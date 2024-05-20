import React, { useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';

const PatientList = ({ patients, onEdit, onDelete}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (patient) => {
        console.log("🚀 ~ file: PatientList.jsx:16 ~ handleEdit ~ patient:", patient);
        // Handle edit functionality here
        onEdit(patient);
        // console.log('Edit patient:', filteredPatients[index]);
    };

    const handleDelete = (patient) => {
        console.log("🚀 ~ file: PatientList.jsx:23 ~ handleDelete ~ patient:", patient);
        // Handle delete functionality here
        onDelete(patient)
        console.log("***********patients", patients);
        // console.log('Delete patient:', filteredPatients[patient]);
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        onClick={() => onEdit()}
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
                        {filteredPatients.map((patient, index) => (
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

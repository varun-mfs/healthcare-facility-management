import React, { useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';

const PatientList = () => {
    // TODO: remove this
    const patients = [
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
            dateOfBirth: '07-2-1993',
            email: 'shreya.das@example.com',
            phone: '99999 88888',
            medicalHistory: 'No significant medical history.',
        },
        // Add more patient data as needed
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (index) => {
        // Handle edit functionality here
        console.log('Edit patient:', filteredPatients[index]);
    };

    const handleDelete = (index) => {
        // Handle delete functionality here
        console.log('Delete patient:', filteredPatients[index]);
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Search Patients"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ marginBottom: '20px' }}
            />
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
                                    <Button sx={{ marginRight: "5px" }} variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PatientList;

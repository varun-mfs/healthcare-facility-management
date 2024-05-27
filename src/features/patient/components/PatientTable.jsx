import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import { usePatientContext } from '../hooks';
import DeleteConfirmationDialog from './PatientDeleteConfimationDialog';
import { useState } from 'react';

const PatientTable = ({ patients, handlePatientFormVisibility }) => {
    const { deletePatient, setCurrentPatient } = usePatientContext();
    const [patientToDelete, setPatientToDelete] = useState(null);
    const dialogVisibility = Boolean(patientToDelete)

    const handleEdit = (patient) => {
        setCurrentPatient(patient);
        handlePatientFormVisibility(true);
    };

    const handleDelete = (patient) => {
        // show dialog
        setPatientToDelete(patient.id); // if patient.id is present, show delete dialog


        // deletePatient(patient.id);   // call delete api
    };

    const handleDeleteConfirm = () => {
        deletePatient(patientToDelete);
        setPatientToDelete(null);
    };

    const handleDeleteCancel = () => {
        console.log("Inside handleDeleteCancel")
        // 
        setPatientToDelete(null);
    };

    return (
        <>
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
            <DeleteConfirmationDialog
                open={dialogVisibility}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
            />
        </>

    )
}

export { PatientTable }
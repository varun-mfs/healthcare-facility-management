import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import { usePatientContext } from '../hooks';

const PatientTable = ({ patients, handlePatientFormVisibility }) => {

    const { deletePatient, setCurrentPatient } = usePatientContext();

    const handleEdit = (patient) => {
        setCurrentPatient(patient);
        handlePatientFormVisibility(true);
    };

    const handleDelete = (patient) => {
        deletePatient(patient.id);
    };

    return (
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
    )
}

export { PatientTable }
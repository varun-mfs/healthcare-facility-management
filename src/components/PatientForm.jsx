import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid
} from '@mui/material';

const PatientForm = ({ open, handleClose, handleAddOrEditPatient, patientData }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    medicalHistory: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patientData) {
      setFormData(patientData);
    } else {
      setFormData({
        name: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        medicalHistory: '',
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required';
    tempErrors.dateOfBirth = formData.dateOfBirth ? '' : 'Date of Birth is required';
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email) ? '' : 'Email is not valid';
    tempErrors.phone = formData.phone.length === 10 ? '' : 'Phone number must be 10 digits';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleAddOrEditPatient(formData);
      handleClose();
    }
  };

  return (
    <Container sx={{ padding: "110px" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={Boolean(errors.dateOfBirth)}
                  helperText={errors.dateOfBirth}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Medical History & Allergies"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} color="warning">Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} color="primary">Add Patient</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientForm;

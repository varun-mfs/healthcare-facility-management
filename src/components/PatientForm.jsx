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
import { useForm } from "react-hook-form";

const PatientForm = ({ open, handleClose, handleAddOrEditPatient, patientData }) => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   dateOfBirth: '',
  //   email: '',
  //   phone: '',
  //   medicalHistory: '',
  // });

  // const [errors, setErrors] = useState({});
  console.log("patientData************", patientData);

  const { register, formState: { errors }, handleSubmit } = useForm({
    mode: "onChange",
    values: patientData ? patientData : {
      name: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      medicalHistory: '',
    }
  })

  const onSubmit = (data) => {
    console.log("🚀 ~ file: PatientForm.jsx:41 ~ onSubmit ~ formData:", data)
    handleAddOrEditPatient(data);
    handleClose();
  };

  const onClose = () => {
    handleClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{patientData ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                {...register("name", {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be minimum 3 characters' }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputProps={{ type: "date", max: new Date() }}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.dateOfBirth?.message}
                helperText={errors.dateOfBirth?.message}
                {...register("dateOfBirth", {
                  required: 'Date of Birth is required',
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...register("email", {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  type: "number",
                  sx: {
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      display: 'none'
                    },
                    '& input[type=number]': {
                      MozAppearance: 'textfield'
                    },
                  }
                }}
                label="Phone"
                name="phone"
                variant="outlined"
                fullWidth
                required
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                {...register("phone", {
                  required: 'Phone is required',
                  minLength: { value: 10, message: 'Should be 10 digits number' },
                  maxLength: { value: 10, message: 'Should be 10 digits number' }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Medical History & Allergies"
                name="medicalHistory"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...register("medicalHistory")}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleClose} color="warning">Cancel</Button>
              </Grid>
              <Grid item>
                <Button type='submit' variant="contained" color="primary">{patientData ? 'Save Changes' : 'Add Patient'}</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientForm;

import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseAuth } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(FirebaseAuth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (loading) {
            return <p>Loading...</p>;
        }
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>

                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email Address"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Signup
                    </Button>

                </Box>

            </Box>
        </Container>
    )
}

export default Signup
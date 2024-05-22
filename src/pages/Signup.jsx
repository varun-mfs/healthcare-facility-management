import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FirebaseAuth } from "../lib/firebase";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: '100vh',
        }}>
            <Card sx={{ maxWidth: "480px" }}>
                <CardContent>
                    <Box sx={{ textAlign: "center" }}>
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
                                type="password"
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
                            <Link to="/login" variant="inherit">
                                {"Already have an account? Login"}
                            </Link>

                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Signup
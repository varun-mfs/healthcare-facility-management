import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material"
import { FirebaseAuth } from "../firebase/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";

const Login = () => {
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(FirebaseAuth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(FirebaseAuth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (user || gUser) {
            navigate("/")
        }
    }, [user, navigate, gUser])

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
                    Login
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
                        Login
                    </Button>
                    <Divider />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {signInWithGoogle()}}
                    >
                        Login with Google
                    </Button>

                </Box>

            </Box>
        </Container>
    )
}

export default Login
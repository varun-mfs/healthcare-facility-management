import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword, useSignInWithGoogleAuth } from "../features/authentication/hooks";

const Login = () => {
    const navigate = useNavigate();
    const {
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    } = useSignInWithEmailAndPassword();

    const { signInWithGoogle, gUser, gLoading, gError } = useSignInWithGoogleAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        signInWithEmailAndPassword(email, password)
    }

    console.log("first INSIDE LOGIN!")

    useEffect(() => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (user || gUser) {
            navigate("/")
        }
    }, [user, navigate, gUser])

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
                                Login
                            </Button>
                            <Divider />
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => { signInWithGoogle() }}
                            >
                                Login with Google
                            </Button>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>

                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Login
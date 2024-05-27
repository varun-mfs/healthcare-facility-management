import { Box, Button, Card, CardContent, Container, Divider, TextField, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext, useSignInWithEmailAndPassword, useSignInWithGoogleAuth } from "../features/authentication/hooks";
import { useForm } from "react-hook-form"
import { TOAST_MESSAGES } from "../constants";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const {
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    } = useSignInWithEmailAndPassword();

    const { signInWithGoogle, gUser, gLoading, gError } = useSignInWithGoogleAuth();

    const { user: loggedInUser } = useAuthContext();
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" })

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error])

    const onSubmit = async (e) => {

        const { email, password } = e;

        const response = await signInWithEmailAndPassword(email, password)
        console.log("🚀 ~ file: Login.jsx:29 ~ onSubmit ~ response:", response)
        if (response) {
            toast.success(TOAST_MESSAGES.LOGIN_SUCCESS)
        }
    }

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

                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                margin="normal"
                                error={!!errors.email?.message}
                                helperText={errors.email?.message}
                                fullWidth
                                name="email"
                                label="Email Address"
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            <TextField
                                type="password"
                                error={!!errors.password?.message}
                                helperText={errors.password?.message}
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Minimum length should be 6 characters' } })}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login {(gLoading || loading) && <CircularProgress color="info" size={16} />}
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
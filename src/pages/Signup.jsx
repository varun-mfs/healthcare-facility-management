import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupWithEmailAndPassword } from "../features/authentication/hooks";
import { useForm } from "react-hook-form"

const Signup = () => {
    const {
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    } = useSignupWithEmailAndPassword();

    const navigate = useNavigate();
    
    const { register, formState: { errors }, handleSubmit } = useForm({ mode: "onBlur" })
    

    const onSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        createUserWithEmailAndPassword(email, password);
    }

    // TODO: do we need this?
    // useEffect(() => {
    //     if (loading) {
    //         return <p>Loading...</p>;
    //     }
    //     if (user) {
    //         navigate("/")
    //     }
    // }, [user, navigate])

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

                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="email"
                                label="Email Address"
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
                            <TextField
                                type="password"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                error={!!errors.password?.message}
                                helperText={errors.password?.message}
                                {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Minimum length should be 6 characters' } })}
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
import { useState } from 'react';
import { Button, CssBaseline, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { attemptLogin } from '../api/api';
import useForm from '../utils/useForm';


const Login = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const { values, errors, setErrors, handleChange } = useForm({
        email: "",
        password: ""
    })

    const validate = () => {
        let errorMessages = {};
        
        errorMessages.email = !values.email ? "This field cannot be blank" 
            : !(/^[a-zA-Z\d]{8,35}@[a-zA-Z]+\.[a-zA-Z]{2,}$/).test(values.email) ? "Email is not valid" 
            : ""
        
            errorMessages.password = !values.password ? "This field cannot be blank"
            : !(/^[A-Za-z0-9]*$/).test(values.password) ? "Password can only contain letters and numbers"  
            : values.password.trim().length < 8 || values.password.trim().length > 35 ? "Password must be between 8 and 35 characters" : ""
        setErrors({
            ...errorMessages
        })
        return Object.values(errorMessages).every(msg => msg === "")

    }



    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validate()) {
            attemptLogin(values).then((res) => {
            localStorage.setItem("AuthenticationToken", res.headers.authorization)
                props.setLoggedIn(true);
                navigate("/employees")
                setError(false)
            }).catch(err => {
                setError(err.response.data)
            })
        }

    }

    return (
        <>
            <CssBaseline />
            <main>
                <Container maxWidth='sm'>
                    <Box maxWidth="md" sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center' 
                    }}>
                        <Typography variant='h4' >Sign in</Typography>
                        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                sx={{backgroundColor: 'white'}}
                                margin='normal'
                                fullWidth
                                id="email"
                                label="Email"
                                onChange={handleChange}
                                {...(errors.email && {error:true, helperText:errors.email})}
                            />
                            <TextField
                                sx={{backgroundColor: 'white'}}
                                margin='normal'
                                fullWidth
                                id="password"
                                label="Password"
                                onChange={handleChange}
                                {...(errors.password && {error:true, helperText:errors.password})}
                            />
                            <Typography variant='p' color="red">{error}</Typography>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{mt: 3}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </main>
        </>
    )
}

export default Login
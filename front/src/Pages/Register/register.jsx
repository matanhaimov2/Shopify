import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// React MUI
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

// Services
import { register } from '../../Services/authenticationService'

function Register() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Navigation Handle
    const navigate = useNavigate();

    const handleRegistration = async () => {
        console.log(email, username, password)

        let data = {
            email: email,
            username: username,
            password: password,
            cartInfo: [],
            isAdmin: false
        }

        try {
            let response = await register(data)
            console.log(response)

            setMessage(response.message)
            navigate('/login')


        } catch (error) {
            console.error("Registration failed:", error.response.data.error);
            setMessage(error.response.data.error);
        }

    }

    const handleToLogin = () => {
        navigate('/login')
    }

    return (
        <div className='register-wrapper'>
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto', // margin left & right
                    my: 12, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <div>
                    <Typography level="h4" component="h1">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography level="body-sm">Create an account</Typography>
                </div>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)}
                        // html input attribute
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                    />
                </FormControl>                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input onChange={(e) => setUsername(e.target.value)}
                        // html input attribute
                        name="username"
                        type="name"
                        placeholder="username"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPassword(e.target.value)}
                        // html input attribute
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </FormControl>

                <Button onClick={handleRegistration} sx={{ mt: 1 /* margin top */ }}>Create Account</Button>

                <Typography level="body-sm">Already have an account? <span style={{ color: '#0b6bcb', cursor: 'pointer' }} onClick={handleToLogin}>sign in</span></Typography>

                {message && (
                    <span>{message}</span>
                )}
            </Sheet>
        </div>
    );
}

export default Register;
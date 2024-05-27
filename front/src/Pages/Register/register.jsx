import React, { useState } from 'react';

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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleRegistration = async () => {
        console.log(username, password)

        let data = {
            username: username,
            password: password,
            cartInfo: [],
            isAdmin: false
        }

        try {
            let response = await register(data)
            console.log(response)

            setMessage(response.message)

        } catch (error) {
            console.error("Registration failed:", error.response.data.error);
            setMessage(error.response.data.error);
        }

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

                {message && (
                    <span>{message}</span>
                )}
            </Sheet>
        </div>
    );
}

export default Register;
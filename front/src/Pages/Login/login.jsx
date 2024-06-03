import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

// React MUI
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

// Services
import { login } from '../../Services/authenticationService'

// Components
import { AuthContext } from '../../Components/AuthContext';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // New state for handling error messages
    const { handleLogin } = useContext(AuthContext);


    // Navigation Handle
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
            const data = { username, password };
            const response = await login(data);
            
            if (response.accessToken) {
                handleLogin(response.accessToken);
                navigate('/');
            } else {
                setErrorMessage("Username or Password Incorrect");
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    }

    return (
        <div className='login-wrapper'>
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
                    <Typography level="body-sm">Sign in to continue as a user</Typography>
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

                <Button onClick={handleLoginClick} sx={{ mt: 1 /* margin top */ }}>Sign in</Button>

                <Button style={{background: 'grey'}} onClick={handleRegisterClick}>Create New User</Button>

                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}

            </Sheet>
        </div>
    );
}

export default Login;
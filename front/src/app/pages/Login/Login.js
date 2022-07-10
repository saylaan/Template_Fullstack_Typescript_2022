import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* ------------- || Third Party || ------------- */
/* ------------- || External Components Library || ------------- */
import { IconButton, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/* ------------- || Action Redux || ------------- */
import { login, fetchRoom, fetchRoomUser } from '../../redux/slices';
/* ------------- || Api-client || ------------- */
// import { apiClient } from '../../adapters/api-client';
import AuthService from '../../adapters/api-client/authentification/auth.service';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = AuthService.getCurrentUser();
    let location = useLocation();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const initLocalStorage = () => {
        dispatch(fetchRoom());
        dispatch(fetchRoomUser());
        dispatch(login());
    };
    const handleChange = (target) => {
        const { name, value } = target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleLogin = () => {
        localStorage.setItem(
            'user',
            JSON.stringify({ user: { user: 'geoff', id: 1, token: 'dkqdljkeâe1313dlka^da' } })
        );
        initLocalStorage();
        navigate('/app/dashboard');
        // });
    };
    if (isAuth) {
        return <Navigate to="/app/dashboard" state={{ from: location }} replace />;
    }
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '1px 1px 5px black',
                padding: '16px',
                paddingLeft: '32px',
                paddingRight: '32px',
                borderRadius: '5px'
            }}
        >
            <IconButton
                disabled={true}
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'rgb(245, 0, 87)'
                }}
            >
                <LockOutlinedIcon style={{ color: 'white' }} fontSize={'large'} />
            </IconButton>
            <Typography variant={'h4'} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                J.A.R.V.I.S
            </Typography>
            <TextField
                variant={'standard'}
                label={'Username'}
                name={'username'}
                value={credentials.username}
                onChange={(e) => handleChange(e.target)}
                style={{ width: '100%', marginTop: '32px' }}
            />
            <TextField
                variant={'standard'}
                label={'Password'}
                name={'password'}
                value={credentials.password}
                onChange={(e) => handleChange(e.target)}
                type={'password'}
                style={{ width: '100%', marginTop: '64px' }}
            />
            <Button
                style={{
                    borderRadius: '5px',
                    backgroundColor: '#004AAD',
                    color: 'white',
                    width: '100%',
                    marginTop: '32px'
                }}
                onClick={() => handleLogin(credentials)}
            >
                Sign in
            </Button>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// React MUI
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';



// CSS
import './topnav.css';


function TopNav() {

    const navigate = useNavigate();

    const [routeValue, setRouteValue] = useState('1'); // Initial route is home

    // Navigate To Different Routes
    useEffect(() => {
        console.log(routeValue)
        const path = routeValue === '1' ? '/' : routeValue === '2' ? '/cart' : '/login';
        navigate(path); // site under costruction crashing due using navigation
    }, [routeValue])


    return (
        <div className='topnav-wrapper'>
            <div className='topnav-logo-wrapper'>
                <h2> SHOPIFY </h2>
            </div>

            <div className='topnav-tabs-wrapper'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={routeValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Home" value="1" onClick={() => setRouteValue('1')} />
                                <Tab label="Cart" value="2" onClick={() => setRouteValue('2')} />
                                <Tab label="Login" value="3" onClick={() => setRouteValue('3')} />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
            </div>

            <div className='topnav-search-wrapper'>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', width: '90%' }}>
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Shopify" inputProps={{ 'aria-label': 'search shopify' }} />

                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>
        </div>
    );
}

export default TopNav;
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

// React MUI
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

// React Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineMenuOpen } from "react-icons/md";

// CSS
import './topnav.css';

// Components
import { AuthContext } from '../AuthContext';

function TopNav() {

    const { setSearchQuery, isOpenMenu, setIsOpenMenu } = useContext(AuthContext);

    // Handle responsive
    const isTabletOrPhone = useMediaQuery({ query: '(max-width: 860px)' })

    const location = useLocation();

    const navigate = useNavigate();

    // States
    const [routeValue, setRouteValue] = useState(location.pathname); // Current Route

    // Handle tab change
    const handleChange = (newValue) => {
        setRouteValue(newValue);
        navigate(newValue);
    };

    // Handle search
    const handleSearch = async (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className='topnav-wrapper'>
            <div className='topnav-first-container-wrapper'>
                <div className='topnav-logo-wrapper'>
                    <h2> <a href='/' style={{color: 'black', textDecoration: 'none'}}> SHOPIFY </a> </h2>
                </div>

                <div className='topnav-tabs-wrapper'>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={routeValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList>
                                    <Tab label="Home" value="/" onClick={() => handleChange('/')} />
                                    <Tab label="Cart" value="cart" onClick={() => handleChange('cart')} />
                                    <Tab label="About" value="about" onClick={() => handleChange('about')} />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </div>

                {!isTabletOrPhone && (
                    <div className='topnav-search-wrapper'>
                        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', width: '90%' }}>
                            <InputBase onChange={handleSearch} sx={{ ml: 1, flex: 1 }} placeholder="Search Shopify" inputProps={{ 'aria-label': 'search shopify' }} />

                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                )}

                {isTabletOrPhone && (
                    <>
                        {isOpenMenu && routeValue === '/' && (
                            <IconButton className='topnav-menu-button-wrapper' onClick={() => setIsOpenMenu(!isOpenMenu)}>
                                <MdOutlineMenuOpen />
                            </IconButton>
                        )}
                    </>
                )}
            </div>

            <div className='topnav-second-container-wrapper'>
                <div className='topnav-menu-wrapper'>
                    {isTabletOrPhone && (
                        <>
                            {routeValue === '/' && (
                                <IconButton onClick={() => setIsOpenMenu(!isOpenMenu)}>
                                    {!isOpenMenu && (
                                        <RxHamburgerMenu />
                                    )}
                                </IconButton>
                            )}
                        </>
                    )}

                </div>

                {isTabletOrPhone && (
                    <>
                        {routeValue === '/' && (
                            <div className='topnav-search-wrapper'>
                                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', width: '90%' }}>
                                    <InputBase onChange={handleSearch} sx={{ ml: 1, flex: 1 }} placeholder="Search Shopify" inputProps={{ 'aria-label': 'search shopify' }} />

                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default TopNav;
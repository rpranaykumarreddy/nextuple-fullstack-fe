import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export default function TopNav({user, logout}) {
    const pages = [{label: "Wallet", value: ""},
        {label: "Statement", value: "statement"}, {label: "Cashbacks", value: "cashback"}];
    const [linkValue, setValue] = useState("user");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let path = location.pathname;

        if (path[0] == "/") path = path.slice(1);
        if (path[path.length - 1] == "/") path = path.slice(0, -1);
        setValue(path);
    }, [location.pathname]);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const openLink = (value) => {
        navigate(value);
        handleCloseNavMenu();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        handleCloseUserMenu();
        logout();
    }
    return (
        <AppBar position="sticky" sx={{width: "100%", zIndex: 1000, backgroundColor: "#111"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} alt="Logo of Infinitum Bank"
                            src={process.env.PUBLIC_URL + '/logo192.png'}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Infinitum Bank
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="Nav bar"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            data-testid="handleOpenNavMenu"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {
                                pages.map(({label, value}) => (
                                    <MenuItem key={value}
                                              data-testid={"menu-bar-" + value}
                                              onClick={() => openLink(value)}
                                              sx={{color: linkValue === value && "#1976d2 !important"}}>
                                        <Typography textAlign="center">{label}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>

                    <Avatar sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} alt="Logo of Infinitum Bank"
                            src={process.env.PUBLIC_URL + '/logo192.png'}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Tooltip title={"Infinitum Bank"} placement="bottom">
                            Banking
                        </Tooltip>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map(({label, value}) => (
                            <Button
                                key={value}
                                data-testid={"nav-bar-" + value}
                                onClick={() => openLink(value)}
                                sx={{
                                    my: 2, color:
                                        linkValue === value ? "#1976d2 !important" : "#fff !important",
                                    display: 'block'
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        {user != null &&
                            <Tooltip title="Account">
                                <IconButton data-testid="handleOpenUserMenu" onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                        }
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography textAlign="center">Hi, {user && user?.sub}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout} data-testid="logout">
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

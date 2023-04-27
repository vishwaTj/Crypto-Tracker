import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import './Header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
     
    const handleClick= () => {
        navigate('/', {replace:true});
    }

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: '#fff',
            },
            type:"dark",
        },
    })

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={handleClick} className='headerSect' variant='h6'>Crypto Tracker</Typography>
                    <Select
                    variant="outlined"
                    style={{
                        width:100,
                        height:40,
                        marginRight:15
                    }}>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>                    
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header
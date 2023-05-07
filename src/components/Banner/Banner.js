import { Container, Typography } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';

const Banner = () => {

    const banner={
        backgroundImage: "url(./falling_coin.jpg)",
        height:"400px"
    }
    const bannerContent={
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: "25px",
        justifyContent: "space-around",
        color:"black"
    }
    const Tagline={
         display:"flex",
         height:"40%",
         flexDirection:"column",
         justifyContent:"center",
         textAlign:"center"
    }
  return (
    <div style={banner}>
        <Container style={bannerContent}>
        <div style={Tagline}>
           <Typography
             variant="h2"
             style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "monospace"
             }}
           >
            Crypto Tracker
           </Typography>
           <Typography
              variant="subtitle2"
              style={{
               fontWeight: "darkgrey",
               marginBottom: 15,
               fontFamily: "monospace"
            }}
           >
            Get All the Info Regarding your favourite Crypto Currency
           </Typography>
        </div>
        <Carousel />
        </Container>
    </div>
  )
}

export default Banner;
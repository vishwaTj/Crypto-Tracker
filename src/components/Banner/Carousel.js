import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from "../../config/API";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x) {
    // Regex string to display commas in units
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
    const [Trending, setTrending] = useState([]);
    
   const TrendingStyle={
    height:"50%",
    display:"flex",
    alignItems:"center"
   }

   const carouselItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "black",
   }

   const { currency, symbol } =  CryptoState();

   const FetchTrendingCoins = async () =>{
       const { data } = await axios.get(TrendingCoins(currency));

       setTrending(data);
   };

   useEffect(()=>{
     FetchTrendingCoins();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[currency]);


   const items = Trending.map((coin)=>{
    // add loss also
   let profit = coin.price_change_percentage_24h >=0;

    return (
        <Link
           style={carouselItem}
           to={`/coins/${coin.id}`} >
                <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: "10"}}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                    style={{
                        color:profit > 0 ? "rgb(14, 203, 129" : "red",
                        fontWeight: 500
                    }}>
                        {profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}
                    </span>
                </span>

                <span style={{fontSize: 22, fontWeight: 500}}>
                   {symbol} {numberWithCommas(coin?.current_price.toFixed())}
                </span>
            </Link>
     );
   })


   const responsive = {
    0: {
        items: 2
    },
    512: {
        items: 4
    }
   }


  return (
    <div style={TrendingStyle}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>
  )
}

export default Carousel;
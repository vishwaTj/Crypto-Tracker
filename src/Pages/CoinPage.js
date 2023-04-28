import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/API';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel';

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol}=CryptoState();
  
  const fetchCoin= async()=>{
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);  
  }

  useEffect(()=>{
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}} />

  return (
    <div className="CoinContianer">
      <div className="sideBar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20}} />
        <Typography variant='h3' className='coinHeading'>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className='coinDescription'>
          {/* // to remove the HTML content and only filter out text coming for a few coins */}
          {parse(" "+coin?.description.en.split(". ")[0])}
        </Typography> 

        <div className="CoinData">
          <span style={{display:"flex"}}>
            <Typography variant='h5' className='coinHeading'>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                fontFamily:"Montserrat`"
               }}>
              {coin?.market_cap_rank}
            </Typography>
          </span> 

          <span style={{display:"flex"}}>
            <Typography variant='h5' className='coinHeading'>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                fontFamily:"Montserrat`"
               }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>  

          <span style={{display:"flex"}}>
            <Typography variant='h5' className='coinHeading'>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                fontFamily:"Montserrat`"
               }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                     .toString()
                     .slice(0,-6)
              )}M
            </Typography>
          </span>  
        </div> 
      </div>

      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;
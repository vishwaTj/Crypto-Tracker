import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/API';
import CoinInfo from '../components/CoinInfo';
import { Button, LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel';
import { doc,setDoc } from 'firebase/firestore';
import { db } from "../Pages/firebase";


const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol, user, setAlert, watchList}=CryptoState();
  const fetchCoin= async()=>{
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);  
  }

  useEffect(()=>{
    fetchCoin();
  },[])

  const styles = (theme) => ({
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  });

  const inWatchlist = watchList.includes(coin?.id);

  const addToWatchList= async ()=>{
     const coinRef = doc(db, "watchlist", user.uid);
     console.log("I got called");
     
     try{
      await setDoc( 
        coinRef,
        { coins: watchList ? [...watchList, coin?.id] : [coin?.id]}
        );

      setAlert({
        open:true,
        message:`${coin.name} Added to watchlist !`,
        type:"success",  
      })
     }catch(error){
      console.log(error);
       setAlert({
        open:true,
        message:error.mesasge,
        type:"error"
       });
     }
  }

  const removeFromWatchList = async ()=>{
    const coinRef = doc(db, "watchlist", user.uid);
    console.log("I got called");
    
    try{
     await setDoc( 
       coinRef,
       { coins: watchList.filter((watch) => watch !== coin?.id)},
       {merge:"true"}
       );

     setAlert({
       open:true,
       message:`${coin.name} Removed to watchlist !`,
       type:"success",  
     })
    }catch(error){
     console.log(error);
      setAlert({
       open:true,
       message:error.mesasge,
       type:"error"
      });
    }
 }

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

        <div style={styles.marketData}>
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
          {user && (
            <Button
              variant='outlined'
              style={{
                width:"100%",
                height:40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D"
              }}
              onClick={inWatchlist? removeFromWatchList : addToWatchList}
            >
             { inWatchlist ? "Remove from Watchlist":"Add to WatchList"}
            </Button>
          )}
        </div> 
      </div>

      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinPage;
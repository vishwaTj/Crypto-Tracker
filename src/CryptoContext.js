import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { CoinList } from './config/API';

const Crypto = createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState(null);
  const [alert,setAlert] = useState({
    open:false,
    message:"",
    type:"success"
  })


  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));
    // this is a bad technique follow the courses technique
    setCoins(data);
    setLoading(false);
}


  useEffect(()=>{
    if(currency === "INR") setSymbol("₹")
    else if (currency === "USD") setSymbol("$");
  },[currency])

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
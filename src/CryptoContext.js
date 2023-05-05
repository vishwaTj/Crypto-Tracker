import axios from 'axios';
import {doc, onSnapshot} from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { CoinList } from './config/API';
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from "./Pages/firebase";

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
  const [watchList, setWatchList] = useState([]);

  useEffect(()=>{
    if(user){
      const coinRef = doc(db,"watchlist",user?.uid);

      var unsubcribe = onSnapshot(coinRef,(coin) => {
        if(coin.exists()){
          console.log(coin.data().coins);
          setWatchList(coin.data().coins);
        }else{
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubcribe();
      }
    }
  },[user]);

  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));
    // this is a bad technique follow the courses technique
    setCoins(data);
    setLoading(false);
}

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[])


  useEffect(()=>{
    if(currency === "INR") setSymbol("₹")
    else if (currency === "USD") setSymbol("$");
  },[currency])

  return (
    <Crypto.Provider 
        value={{currency,
               symbol,
               setCurrency,
               coins,
               loading,
               fetchCoins,
               alert,
               setAlert,
               user,
               watchList
              }}
            >
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}
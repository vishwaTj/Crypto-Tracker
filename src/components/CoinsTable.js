import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/API';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { Container, LinearProgress,Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {
   const [coins, setCoins] = useState([]);
   const [loading, setLoading] = useState(false);
   const [search, setSearch] = useState("");
   const [page,setPage] = useState(1);
   const navigate = useNavigate();

   const {currency,symbol}= CryptoState();

   const fetchCoins = async () => {
       setLoading(true);
       const {data} = await axios.get(CoinList(currency));
       // this is a bad technique follow the courses technique
       setCoins(data);
       setLoading(false);
   }

   useEffect(()=>{
    fetchCoins();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[currency]);

   //Make it into a custom hook
   const darkTheme = createTheme({
    palette: {
       primary: {
        main: "#fff",
       },
       type: "dark",
    },
   });

   const handleSearch= () => {
    return coins.filter(
        (coin) => 
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
        );
   }



  return (
    <div className='Table'>
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
               <Typography
                  variant='h4'
                  style={{margin: 18, fontFamily:"Montserrat"}}
               >
                CryptoCurrency by Market Cap
               </Typography>
               <TextField
                 label="Search For a Crypto currency.."
                 variant='outlined'
                 style={{marginBottom:20, width:"100%", border:"1px solid white", borderRadius:"5px", color:"white"}}
                 onChange={(e) => setSearch(e.target.value)}
               />
               <TableContainer>
                  {/* iddhar progress mein apna sketch laga de */}
                  {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold"}} />
                    ):(
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                                <TableRow>        
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => ( 
                                    <TableCell
                                       style={{
                                        color:"black",
                                        fontWeight:"700",
                                        fontFamily:"Montserrat",
                                       }}
                                       key={head}
                                       align={head === "Coin" ? "":"right"} // just extra space to the head coin
                                       >
                                        {head}
                                       </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                 {handleSearch()
                                     //Pgination technique used read once again
                                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                      .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow
                                            onClick={()=> {navigate(`/coins/${row.id}`, {replace:true});}}
                                            className='RowElement'
                                            key={row.name}>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              style={{
                                                display:"flex",
                                                gap:15
                                              }}>
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: "10"}}
                                                />
                                                <div
                                                  style={{display:"flex", flexDirection:"column"}}
                                                > 
                                                <span
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 22,
                                                    color:"white"
                                                }}>
                                                  {row.symbol}
                                                 </span>
                                                 <span style={{color:"darkgrey"}}>{row.name}</span>
                                                </div>
                                            </TableCell>
                                            
                                            <TableCell align='right' style={{color:"white"}}>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))} 
                                            </TableCell>  

                                            <TableCell
                                                  align='right'
                                                  style={{
                                                    color:profit > 0 ? "rgb(14, 203, 129" : "red",
                                                    fontWeight: 500
                                                }}>
                                                    {profit && "+"}
                                                    {row?.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell> 

                                            <TableCell align="right" style={{color:"white"}}>
                                                    {symbol + " "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}M
                                            </TableCell>   
                                        </TableRow>
                                    )
                                 })}
                            </TableBody>
                        </Table>
                    )}
               </TableContainer>
               <Pagination
                 className='Pagination'
                 color='primary'
                 count={(handleSearch()?.length/10).toFixed(0)}
                 onChange={(_, value)=> {
                  setPage(value);
                  window.scroll(0,450);
                 }} 
                   />
            </Container>
        </ThemeProvider>
    </div>
  )
}

export default CoinsTable;
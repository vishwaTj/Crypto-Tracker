import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, LinearProgress,Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {
   const [search, setSearch] = useState("");
   const [page,setPage] = useState(1);
   const navigate = useNavigate();

   const {currency,symbol, coins, loading, fetchCoins}= CryptoState();

   

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

//    const styles = theme => ({
//     textField: {
//         width:"100%",
//         color:"white"
//     },
//     input: {
//       color: 'white'
//   }
// });


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
               {/* <TextField
                 className={{backgroundColor:"white"}}               
                 label="Search For a Crypto currency.."
                 variant='outlined'
                 onChange={(e) => setSearch(e.target.value)}
               /> */}
               
                <div>
                  <input type='text' style={{backgroundColor:"white", color:"black", borderRadius:"10px", width:"100%", height:"40px",padding:"4px",marginBottom:"20px"}} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a coin'/>
                </div>
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
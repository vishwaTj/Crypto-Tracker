import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { signOut } from 'firebase/auth';
import {auth} from "../../Pages/firebase";
import { numberWithCommas } from '../Banner/Carousel';
import {AiFillDelete} from 'react-icons/ai';
import { doc,setDoc } from 'firebase/firestore';
import { db } from "../../Pages/firebase";
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user,setAlert, watchList, coins, symbol } = CryptoState();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut=()=>{
    signOut(auth);

    setAlert({
        open:true,
        type:"success",
        message:"Logout Successfull !",
    });
    toggleDrawer();
  };

  const removeFromWatchLict = async (coin)=>{
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

  const info={
    width:350,
    padding:25,
    height:"100%",
    flexDirection: "column",
    fontFamily:"monospace"
  }

  const profile={
     flex:1,
     display:"flex",
     flexDirection:"column",
     alignItems: "center",
     gap:"20px",
     height:"92%"
  };
  const picture={
    width:200,
    height:200,
    cursor:"pointer",
    backgroundColor: "#EEBC1D",
    objectFit:"contain"
  };
  const logout={
    height: "8%",
    width:"100%",
    backgroundColor:"#EEBC1D",
    marginTop:20
  }
  const CoinList={
    flex:1,
    width:"100%",
    backgroundColor:"grey",
    borderRadius:10,
    padding:15,
    paddingTop:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:12,
    overflowY:"scroll"
  }

  const coinData={
     padding: 10,
     borderRadius:5,
     color:"black",
     width:"100%",
     display:"flex",
     justifyContent: "space-between",
     alignItems: "center",
     backgroundColor: "#EEBC1D",
     boxShadow:"0 0 3px black"
  }

 
 
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar 
             onClick = {toggleDrawer(anchor, true)}
             style={{
                height:38,
                width:38,
                marginLeft: 15,
                cursor:"pointer",
                backgroundColor:"#EEBC1D"
             }}
             src={user.photoURL}
             alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={info}>
               <div style={profile}>
                  <Avatar
                    style={picture}
                     src={user.photoURL}
                     alt={user.displayName || user.email}
                  />
                  <span
                      style={{
                        width:"100%",
                        fontSize:25,
                        textAlign:"center",
                        fontWeight:"bolder",
                        wordWrap:"reak-word"
                      }}
                  >
                    {user.displayName || user.email}

                  </span>
                  <div style={CoinList}>
                    <span style={{ 
                        fontSize:15,
                        textShadow:"0 0 5px black"}}>
                       WatchList
                    </span>

                    {coins.map((coin) =>{
                        if(watchList.includes(coin.id))
                        return (
                            <div style={coinData}>
                                <span>{coin.name}</span>
                                <span style={{display:"flex", gap:8}}>
                                    {symbol}
                                    {numberWithCommas(coin.current_price.toFixed(2))}
                                    <AiFillDelete
                                      style={{ cursor:"pointer"}}
                                      fontSize='16'
                                      onClick={()=> removeFromWatchLict(coin)}

                                    />
                                </span>
                            </div>
                        )
                    })}
                  </div>
               </div>
               <Button
                 variant='contianed'
                 style={logout}
                 onClick={logOut}
                >
                Log Out
               </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

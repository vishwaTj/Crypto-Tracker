import * as React from 'react';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
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

  const { user } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
               </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

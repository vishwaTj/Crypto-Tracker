import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Pages/firebase";

const Signup = ({handleClose}) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState(""); 

 const {setAlert} = CryptoState();
 const handleSubmit = async ()=>{
    if(password !== confirmPassword){
        setAlert({
            open:true,
            message:"passwords do not match",
            type:'error'
        });
        return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
         auth,
         email,
         password);
         console.log(result);
         setAlert({
            open: true,
            message: `Sign Up Successful, Welcome ${result.user.email}`,
            type:"success"
         });
         handleClose();
    } catch (error){
       setAlert({
         open:true,
         message: error.message,
         type:"error"
       });
       return;
    }
 }
  
 return (
    <Box 
       p={3}
       style={{ display: "flex", flexDirection:"column", gap:"20px"}}
    >
        <TextField
           variant='outlined'
           type='email'
           label='Enter Email'
           value={email}
           onChange={(e)=> setEmail(e.target.value)}
           fullWidth
        />

        <TextField
           variant='outlined'
           type='password'
           label='password'
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           fullWidth
        />

        <TextField
           variant='outlined'
           type='password'
           label='Confirm Password'
           value={confirmPassword}
           onChange={(e)=> setConfirmPassword(e.target.value)}
           fullWidth
        />  
        <Button
           variant="contained"
           size="large"
           style={{ backgroundColor: "#EEBC1D"}}
           onClick={handleSubmit}
        >
         sign Up    
        </Button>
    </Box>
  )
}

export default Signup;

// import React from 'react'

// function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup
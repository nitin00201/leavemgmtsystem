import React, { useState } from 'react'
import { Box, Grid, Modal, TextField, Button } from '@mui/material';
import axios from 'axios';



const Signin = ({togglePannel}) => {
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target
        setFormData({...formData,
            [name]:value
     } )
    }
    const handleSubmit= async(e)=>{
        // e.preventDefault();
   try {
    const res = await axios.post("http://localhost:8081/api/users/signin",formData)
    console.log("sign in successfully")
    console.log(formData);
    localStorage.setItem("id1",res.data.id)
    console.log("signin data be ",res.data);   //temp1@mail.com   temp1
   } catch (error) {
    console.log(error)
   }
    }
  return (
    <div>
    <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
<form className='space-y-3' onSubmit={handleSubmit}>
<TextField fullWidth label="Email" name='email' type='email' value={formData.email} onChange={handleChange} placeholder='enter email'/>
<TextField fullWidth label="Password" name='password' type='password' value={formData.password} onChange={handleChange} placeholder='enter password'/>
<div >
                  <Button
                    fullWidth
                    className="customButton"
                    sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #000',
          borderRadius: '5px',
          width: '5rem',
          height: '3rem',
          backgroundColor: '#000',
        }}                          type='submit'
                  >
                    Login
                  </Button>
                </div>
</form>    
<div className='mt-5 flex items-center gap-2 py-5 justify-center'>
    <span>Don't have an acount?</span>
    <Button onClick={togglePannel}>sign up</Button>
</div>
    </div>
  )
}

export default Signin
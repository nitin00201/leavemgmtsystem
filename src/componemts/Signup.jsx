import React, { useState } from 'react'
import { Box, Grid, Modal, TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/Store';
import { register } from '../redux/AuthSlice';


const Signup = ({togglePannel}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector((store)=>store)

    const[formData,setFormData]=useState({
        email:"",
        password:"",
        department:"",
        role:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target
        setFormData({...formData,
            [name]:value
     } )
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(register(formData))
        console.log(formData);
    }
  return (
    <div>
    <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
<form className='space-y-3' onSubmit={handleSubmit}>

<TextField fullWidth label="Email" name='email' type='email' value={formData.email} onChange={handleChange} placeholder='enter email'/>
<TextField fullWidth label="Password" name='password' type='password' value={formData.password} onChange={handleChange} placeholder='enter password'/>

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          id="demo-simple-select"
          value={formData.department}
          label="Department"
          name='department'
          onChange={handleChange}
        >
          <MenuItem value={`IT`}>IT</MenuItem>
          <MenuItem value={"FINANCE"}>FINANCE</MenuItem>
        </Select>
      </FormControl>

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          id="demo-simple-select"
          value={formData.role}
          label="Role"
          name='role'
          onChange={handleChange}
        >
          <MenuItem value={`manager`}>MANAGER</MenuItem>
          <MenuItem value={"employee"}>EMPLOYEE</MenuItem>
        </Select>
      </FormControl>
<div >

                  <Button
                    fullWidth
                    className="customButton"
                    sx={{ padding: '.9rem' }}
                    type='submit'
                  >
                    Register
                  </Button>
                </div>
</form>    
<div className='mt-5 flex items-center gap-2 py-5 justify-center'>
    <span>Already have an acount?</span>
    <Button onClick={togglePannel}>sign in</Button>
</div>
    </div>
  )
}

export default Signup
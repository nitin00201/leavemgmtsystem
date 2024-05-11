import React, { useState } from 'react'
import './Auth.css'
import Signin from '../componemts/Signin'
import Signup from '../componemts/Signup'


const Auth = () => {
    const[isRegister,setIsRegister]=useState(false)
    const togglePannel=()=>{
        setIsRegister(!isRegister)
    }
  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>

    <div className='box lg:max-w-4xl'>
    <div className={`cover ${isRegister ? "rotate-active":""}`}>
<div className='front'>
    <img src='https://i0.wp.com/juntrax.com/blog/wp-content/uploads/2021/01/Employee-Management-System-Juntrax.png?resize=499%2C239&ssl=1'/>
<div className='text'>
<span className='text-1'>Vacation is good</span>
<span className='text-2 text-xs'>Lets get Connected</span>

</div>
</div>
<div className='back'>
<img src='https://t3.ftcdn.net/jpg/06/10/01/18/360_F_610011817_h3OvYK0yx35KFiEpeHph1GoFHCcDCE0H.jpg'/>


</div>

    </div>
    <div className='forms h-full'>

        <div className='form-content h-full'>
            <div className='login-form'>
<Signin togglePannel={togglePannel}/>
            </div>
            <div className='signup-form'>
                <Signup togglePannel={togglePannel}/>
            </div>
        </div>
    </div>

     
    </div>

    </div>
  )
}

export default Auth
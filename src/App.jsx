import React, { useEffect, useState } from 'react';
import Navbar from './componemts/Navbar'
import Home from './pages/Home'
import UpdateUser, {} from './componemts/UpdateUser'
import PostUser, {} from './componemts/PostUser'
import { Route, Router,RouterProvider ,createBrowserRouter } from 'react-router-dom';
import UserList from './componemts/AllUserList';
import LeaveForm, {} from './componemts/LeaveForm'
import LeaveHistory from './componemts/AllLeaveList';
import UpdateLeave from './componemts/UpdateLeave';
import LeaveAcceeptOrDecline from './componemts/LeaveAcceeptOrDecline';
import Footer from './componemts/Footer';
import Auth, {} from './pages/Auth'
import Profile from './componemts/Profile';
import AccedpteLeave from './requests/AccedpteLeave';
import RejectedLeave from './requests/RejectedLeave';
import Calender from './componemts/Calender';
import CalenderLeave from './componemts/CalenderLeave';
import LeavePol from './pages/LeavePol';
import EmpHandbook from './pages/EmpHandbook';



const App = () => {
  const [id,setId]= useState('')

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    }
    ,{
      path:"/userList",
      element:<UserList/>
    },
    {
      path:"/postUser",
      element:<PostUser/>
    },
    {
      path:"/updateUser/:id",
      element:<UpdateUser/>
    },
    {
      path:"/leaveForm",
      element:<LeaveForm/>
    },
    {
      path:"/leaveMgmt",
      element:<LeaveHistory/>
    },
    {
      path:"/updateLeave/:id",
      element:<UpdateLeave/>
    },
    {
      path:"/leaveAuthorize",
      element:<LeaveAcceeptOrDecline/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/approved",
      element:<AccedpteLeave/>
    },
    {
      path:"/rejected",
      element:<RejectedLeave/>
    },
    {
      path:"/calendar",
      element:<CalenderLeave/>
    },
    {
      path:"/leavepol",
      element:<LeavePol/>
    },
    {
      path:"/handbook",
      element:<EmpHandbook/>
    }

  ])

  useEffect(() => {
    const id1 = localStorage.getItem("id1");
    if (id1) {
      setId(id1);
    }
  }, []);
 console.log( "in app.jsx page id1",id)

  return (<>
    {id !='' ? (
      <>
        <Navbar />
        <RouterProvider router={router} />
        <Footer />
      </>
    ) : (
      <Auth />
    )}
    </>
  );
};

export default App;

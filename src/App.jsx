import React, { useEffect } from 'react';
import { getUserProfile } from './redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './componemts/Navbar'
import Auth from './pages/Auth';
import Home from './pages/Home'
import { Route, Router } from 'react-router-dom';
import Calender from './componemts/Calender'


const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
<Router>
  <Route path='/' Component={<Home/>}/>
  <Route path='/calander' Component={<Calender/>}/>
</Router>




  useEffect(() => {
    if (auth.jwt) {
      dispatch(getUserProfile(auth.jwt));
    }
  }, [auth.jwt, dispatch]);

  return (
    <div>
      <Navbar />
      {auth.user ? <Home /> : <Auth />}
    </div>
  );
};

export default App;

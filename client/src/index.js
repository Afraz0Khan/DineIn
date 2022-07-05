import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './Register';
import Login from './Login';
import DashBoard from './DashBoard';
import DashBoard2 from './Dashboard2';
import Menu from './editMenu';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reservation from './reservation';
import CheckIns from './checkins';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/seller_dashboard' element={<DashBoard2 />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/checkins' element={<CheckIns />} />
        <Route path='/dashboard/reserve' element={<Reservation />} />

        // create a different session for dine in. Maybe make an animation that is custom to restaurants. 
        // make a check in function and use that when the person clicks to dinein. 
        // the customer is checked in and then they await the restaurant's response.
        {/* <Route path='/dashboard/dinein' element={<DineIn />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

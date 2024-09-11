import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';



function App() {
  return (
    <>
    {
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/join" element={<SignUpPage/>}/>
      </Routes>
    }
    
    </>
  );
}

export default App;
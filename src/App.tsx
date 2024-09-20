import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WriteBoardPage from './pages/WriteBoardPage';



function App() {
  return (
    <>
    {
      <Routes>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/join" element={<SignUpPage/>}/>
        <Route path="/write" element={<WriteBoardPage/>}/>
      </Routes>
    }
    
    </>
  );
}

export default App;
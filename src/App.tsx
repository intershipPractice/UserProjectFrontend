import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WriteBoardPage from './pages/WriteBoardPage';
import MyPostPage from './pages/MyPostPage';



function App() {
  return (
    <>
    {
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/join" element={<SignUpPage/>}/>
          <Route path="/write" element={<WriteBoardPage/>}/>
          <Route path="/mypost" element={<MyPostPage/>}/>
        </Routes>
      </BrowserRouter>
    }
    
    </>
  );
}

export default App;
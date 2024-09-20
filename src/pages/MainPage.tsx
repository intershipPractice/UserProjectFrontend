import React from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import Board from "../components/Board";


function MainPage() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <MainTopBar/>
      <Board/>
    </div>
    </div>
  );
}

export default MainPage;
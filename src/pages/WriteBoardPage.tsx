import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import styles from "./WriteBoardPage.module.css";
import WriteBoard from "../components/WriteBoard"


function WriteBoardPage() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className={styles.container}>
        <WriteBoard/>
    </div>
  );
}

export default WriteBoardPage;
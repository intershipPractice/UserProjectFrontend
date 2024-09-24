import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import styles from "./WriteBoardPage.module.css";
import WriteBoard from "../components/WriteBoard"
import {useEffect} from "react";


function WriteBoardPage() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(()=> {
    if (!isLoggedIn){
      alert("로그인 후 서비스를 이용해주세요");
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoggedIn && <WriteBoard/> }
        
    </div>
  );
}

export default WriteBoardPage;
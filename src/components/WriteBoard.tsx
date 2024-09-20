import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import styles from "./WriteBoard.module.css";


function WriteBoard() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <p>제목</p> 
            <input className={styles.titleArea}></input>
        </div>
        <div className={styles.content}>
            <p>내용</p> 
            <textarea className={styles.contentArea}></textarea>
        </div>
        <div className={styles.buttons}>
            <button>취소</button>
            <button>완료</button>
        </div>
    </div>
  );
}

export default WriteBoard;
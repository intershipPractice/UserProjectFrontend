import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";


function Board() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const gotoWriteBoard = () => {
    navigate('/write');
  }

  return (
    <div className={styles.container}>
        <div className={styles.head}>
            <h3>게시글</h3>
            <button onClick={gotoWriteBoard}>게시글 작성</button>
        </div>
        
        <table border={1} className={styles.table}>
            <thead>
                <tr>
                    <th style={{width:"10%"}}>번호</th>
                    <th style={{width:"50%"}}>제목</th>
                    <th style={{width:"20%"}}>작성자</th>
                    <th style={{width:"20%"}}>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>제목이에요</td>
                    <td>나나나</td>
                    <td>2024.05.08</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>제목테스트트트트</td>
                    <td>나나나</td>
                    <td>2024.05.08</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>제목이에요</td>
                    <td>나나나</td>
                    <td>2024.05.08</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default Board;
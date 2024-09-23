import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import {BlogPost} from "../models/post.model";

interface BlogPostProps{
    postList: BlogPost[]; 
}

function Board({postList} : BlogPostProps) {

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
                    <th className={styles.title} style={{width:"60%"}}>제목</th>
                    <th style={{width:"20%"}}>작성자</th>
                    <th style={{width:"20%"}}>작성일</th>
                </tr>
            </thead>
            <tbody>
                {postList.reverse().map((post) => (
                    <tr>
                        <td className={styles.title}>{post.title}</td>
                        <td>{post.userId}</td>
                        <td>{post.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Board;
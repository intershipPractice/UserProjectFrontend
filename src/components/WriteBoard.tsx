import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import styles from "./WriteBoard.module.css";
import {useState} from 'react';

function WriteBoard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem('access_token');

    try {
        const response = await fetch('http://localhost:8000/api/v1/blogs', {
          method: 'POST',
          headers: {'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json',},
          body: JSON.stringify({title, content}),
        });
        if(response.ok){
          alert("게시물이 등록되었습니다.");
          navigate('/main');
        }
        if (!response.ok){
            alert("요청이 잘못되었습니다.");
        }
  
      }catch (error){
        alert("네트워크를 확인하세요.");
      }
  }

  const handleCancel = () => {
    const result = window.confirm("게시물 작성을 취소하시겠습니까?");

    if(result){
        navigate('/main');
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.title}>
            <p>제목</p> 
            <input className={styles.titleArea} onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div className={styles.content}>
            <p>내용</p> 
            <textarea className={styles.contentArea} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className={styles.buttons}>
            <button type="button" onClick={handleCancel}>취소</button>
            <button type="submit">완료</button>
        </div>
    </form>
  );
}

export default WriteBoard;
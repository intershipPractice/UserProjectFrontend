import React from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import MainTopBar from "../components/MainTopBar";
import Board from "../components/Board";
import {useState, useEffect} from 'react';
import {BlogPost} from '../models/post.model';


function MainPage() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  const gotoWriteBoard = () => {
    navigate('/write');
  }

  // 게시물이 삭제되었을 때 호출되는 함수
  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id)); // 삭제된 게시물 제거
  };

  useEffect(()=> {
        fetch("http://localhost:8000/api/v1/blogs", {
            method: 'GET',
        })
        .then(response=>{
            if (!response.ok){
                return [];
            }
            return response.json();
        })
        .then((data : BlogPost[])=>{
          if (data.length !== 0){
            const postData = data.map((item ) => {
              return {
                id : item.id,
                createdAt : item.createdAt,
                title : item.title,
                content: item.content,
                updatedAt : item.updatedAt,
                nickname: item.nickname,
              }
            });
            setPosts(postData);
          } else{
            setPosts([]);
          }
          })
        
    }, []);

  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <MainTopBar/>
      <button className={styles.writeBtn} onClick={gotoWriteBoard}>새 글 작성</button>
      <Board postList={posts} editBtn={false} deletePost={handleDeletePost}/>
    </div>
    </div>
  );
}

export default MainPage;
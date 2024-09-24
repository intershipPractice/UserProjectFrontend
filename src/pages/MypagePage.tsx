import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./MypagePage.module.css";
import MainTopBar from "../components/MainTopBar";
import {useState, useEffect} from 'react';
import {BlogPost} from '../models/post.model';
import Board from "../components/Board";
import MyInfo from "../components/MyInfo";


function MypagePage() {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [posts, setPosts] = useState<BlogPost[]>([]);


  useEffect(()=> {
    if (isLoggedIn){
      const token = sessionStorage.getItem('access_token');
    fetch(`http://localhost:8000/api/v1/blogs/id`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`
      }
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
    }

    
}, []);

  // 게시물이 삭제되었을 때 호출되는 함수
  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id)); // 삭제된 게시물 제거
  };


  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <MainTopBar/>
      <div className={styles.content}>
        <div className={styles.mypostContainer}>
            <p className={styles.header}>내 게시물</p>
            <Board postList={posts} editBtn={true} deletePost={handleDeletePost}/>
        </div>
        <div className={styles.myinfoContainer}> <MyInfo/></div>
      </div>
    </div>
    </div>
  );
}

export default MypagePage;
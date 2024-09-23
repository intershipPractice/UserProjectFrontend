import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./MyPostPage.module.css";
import MainTopBar from "../components/MainTopBar";
import {useState, useEffect} from 'react';
import {BlogPost} from '../models/post.model';
import Board from "../components/Board";


function MyPostPage() {

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
            isDelete : item.isDelete,
            title : item.title,
            content: item.content,
            updatedAt : item.updatedAt,
            userId : item.userId, 
          }
        });
        setPosts(postData);

      } else{
        setPosts([]);
      }
      })
    }

    
}, []);


  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <MainTopBar/>
      <>내 게시물</>
      {isLoggedIn ? <Board postList={posts} editBtn={true}/> : <>로그인 후 이용하세요</>}
    </div>
    </div>
  );
}

export default MyPostPage;
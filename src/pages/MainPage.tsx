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

  useEffect(()=> {
        fetch("http://localhost:8000/api/v1/blogs", {
            method: 'GET',
        })
        .then(response=>{
            if (!response.ok){
                console.log("네트워크 응답이 정상적이지 않습니다.");
            }
            return response.json();
        })
        .then((data : BlogPost[])=>{
          console.log(data);
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
          })
        
    }, []);

  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <MainTopBar/>
      <Board postList={posts}/>
    </div>
    </div>
  );
}

export default MainPage;
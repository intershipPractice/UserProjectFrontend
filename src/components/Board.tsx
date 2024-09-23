import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import {BlogPost} from "../models/post.model";
import {useState, useEffect} from 'react';
import { GoPencil } from "react-icons/go";
import ModifyPostModal from "./ModifyPostModal";
import { FiTrash2 } from "react-icons/fi";

interface BlogPostProps{
    postList: BlogPost[]; 
    editBtn: boolean;
    deletePost: (id:number) => void;
}

function Board({postList, editBtn, deletePost} : BlogPostProps) {

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (post: BlogPost) => {
    setSelectedPost(post); // 선택된 게시물 저장
    setOpen(true); // 모달 열기
};
const handleClose = () => {
    setOpen(false); // 모달 닫기
    setSelectedPost(null); // 선택된 게시물 초기화
};

const handleDelete = (id: number) =>{
    const result = window.confirm("게시물을 삭제하시겠습니까?");

    if (result){
        const token = sessionStorage.getItem('access_token');

        fetch(`http://localhost:8000/api/v1/blogs/${id}`, {
            method: 'DELETE',
            headers: {'Authorization' : `Bearer ${token}`}
        })
        .then(response=> {
            if(response.ok){
                alert("삭제 완료하였습니다.");
                deletePost(id);
            }else{
                alert("삭제를 실패하였습니다.");
            }
        })
        .catch(() => alert("네트워크 오류가 발생했습니다."));
    };
}
    


  return (
    <div>
        <div className={styles.container}>
            {postList.length !== 0 ? postList.map((post) => (
                <div className={styles.postCard} key={post.id}>
                    <div className={styles.postInfo}>
                        <p className={styles.title}>{post.title}</p>
                        <p>{post.content}</p>
                        <p className={styles.nickname}>{post.userId} | {post.createdAt}</p>
                        {editBtn && (
                            <div>
                                <button onClick={() => handleOpen(post)}>
                                    <GoPencil />
                                </button>
                                <button onClick={()=>handleDelete(post.id)}><FiTrash2/></button>
                            </div>
                        )}
                    </div>
                </div>
            )) : <p>게시글이 없어요</p>}
        </div>
        {/* 선택된 게시물의 정보가 있을 때만 모달을 표시 */}
        {selectedPost && open && (
            <ModifyPostModal
                open={open}
                handleClose={handleClose}
                title={selectedPost.title}
                content={selectedPost.content}
                id={selectedPost.id}
            />
        )}
    </div>
  );
}

export default Board;
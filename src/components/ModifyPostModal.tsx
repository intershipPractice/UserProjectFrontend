import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import styles from "./ModifyPostModal.module.css";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import {useState} from 'react'; 

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    borderRadius: '10px',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 7,
    p: 4,
  };

  interface ModifyPostModalProps{
    open: boolean,
    handleClose: () => void;
    title: string,
    content: string,
    id: number,
  }
function ModifyPostModal({open, handleClose, title, content, id} : ModifyPostModalProps) {


  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const ModifyPost = () => {
    const token = sessionStorage.getItem('access_token');

    fetch(`http://localhost:8000/api/v1/blogs/${id}`, {
        method: 'PATCH',
        headers: {'Authorization' : `Bearer ${token}`, 'Content-Type': 'application/json'},
        body : JSON.stringify({title : newTitle, content : newContent}),
    })
    .then(response=>{
        if(response.ok){
            handleClose();
        }
        else {
            alert("네트워크 응답이 정상적이지 않습니다.");
        }
    })

  }



  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
        backdrop: {
            timeout: 400,
            sx: {
                bgcolor: 'rgba(0, 0, 0, 0.3)', 
              },
        },
        }}
      >
        <Box sx={style}>
          <form className={styles.container} onSubmit={ModifyPost}>
            <input 
                className={styles.titleArea} 
                defaultValue={title}
                onChange={(e) => setNewTitle(e.target.value)}
                required>
            </input>

            <hr style={{width:"100%"}}/>

            <textarea 
                className={styles.contentArea} 
                defaultValue={content}
                onChange={(e) => setNewContent(e.target.value)}
                required>
            </textarea>
            <div className={styles.buttonContainer}>
                <button className={styles.buttons} type="button" onClick={handleClose}>취소</button>
                <button className={styles.buttons} type="submit" onClick={ModifyPost}>수정완료</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModifyPostModal;
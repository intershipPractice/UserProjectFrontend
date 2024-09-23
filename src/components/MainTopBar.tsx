import React from 'react';
import styles from './MainTopBar.module.css';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MainTopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(()=> {
    const getName = async () => {

        const token = sessionStorage.getItem('access_token');

        fetch("http://localhost:8000/api/v1/users/profile", {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response=>{
            if (!response.ok){
                console.log("네트워크 응답이 정상적이지 않습니다.");
            }
            return response.json();
        })
        .then(data=>{
            setUsername(data.nickname);
        })
        
            
            const response = await fetch("http://localhost:8000/api/v1/users/profile", {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = response.json();
            } else {
                // 서버 응답이 실패일 때의 처리
                console.log(response);
        } 

    };
    if(isLoggedIn) {getName(); }

  }, []);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
    sessionStorage.removeItem('access_token');
  }

  const gotoLogin = () => {
    navigate("/login");
  }
  return (

      <div className={styles.container}>
      {isLoggedIn? (
        <>{username} 님
          <button className={styles.profileBtn} onClick={handleClick}><AccountCircleIcon style={{width:"40px", height:"40px"}}/></button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>마이 페이지</MenuItem>
            <MenuItem onClick={handleLogout}>내 게시물</MenuItem>
            <MenuItem onClick={handleLogout}>채팅</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </>
      ) : (
        <button className={styles.loginBtn} onClick={gotoLogin}>로그인</button>
      )}

      </div>
  );
}

export default MainTopBar;
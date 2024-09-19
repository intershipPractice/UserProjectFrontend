import React from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login, logout } from '../store/authSlice';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const useremail = useSelector((state: RootState) => state.auth.useremail);

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
  }

  const gotoLogin = () => {
    navigate("/login");
  }
  return (
    <div className={styles.container}>
    <div className={styles.mainbox}>
      <div className={styles.topContainer}>
      {isLoggedIn? (
        <>
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
            <div className={styles.userInfoBox}>강서영님, 반가워요. <br/> {useremail}</div>
            <MenuItem onClick={handleClose}>마이 페이지</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </>
      ) : (
        <button className={styles.loginBtn} onClick={gotoLogin}>로그인</button>
      )}


      </div>
    </div>
    </div>
  );
}

export default MainPage;
import React from 'react';
import styles from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login, logout } from '../store/authSlice';

function MainPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const useremail = useSelector((state: RootState) => state.auth.useremail);

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className={styles.container}>
      {isLoggedIn? (
        <>
          <h2>Welcome, {useremail}</h2>
          <button onClick={handleLogout}>로그아웃버튼</button>
        </>
      ) : (
        <p>로그인 후 서비스를 이용하세요.</p>
      )}
    </div>
  );
}

export default MainPage;
import React from 'react';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <div className={styles.container}>
      로그인 후 서비스를 이용하세요.
      <div><a href='http://localhost:3000/login'>로그인 하러 가기</a></div>
    </div>
  );
}

export default MainPage;
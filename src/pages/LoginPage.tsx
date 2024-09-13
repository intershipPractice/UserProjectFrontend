import React from 'react';
import LoginInput from '../components/LoginInput';
import styles from './LoginPage.module.css';


function LoginPage() {
  return (
    <div className={styles.container}>
        <LoginInput/>
    </div>
  );
}

export default LoginPage;
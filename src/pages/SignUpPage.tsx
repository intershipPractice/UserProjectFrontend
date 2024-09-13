import React from 'react';
import SignUpInput from '../components/SignUpInput';
import styles from './SignUpPage.module.css';


function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUpInput/>
    </div>
  );
}

export default SignUpPage;
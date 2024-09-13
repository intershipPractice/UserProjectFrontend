import styles from './LoginInput.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function LoginInput() {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>로그인</h2>
    <form className={styles.form}>
      <TextField 
        className={styles.inputBox}
        id="demo-helper-text-misaligned"
        label="email"
      />
      <TextField 
        className={styles.inputBox}
        id="demo-helper-text-misaligned-no-helper" 
        label="password" 
        type="password"
      />
      <Stack spacing={2} direction="row">
        <Button className={styles.button} variant="contained">로그인 하기</Button>
      </Stack>
    </form>
    <p className={styles.text}><a href="http://localhost:3000/join">회원이 아니신가요?</a></p>
    </div>
  );
}

export default LoginInput;
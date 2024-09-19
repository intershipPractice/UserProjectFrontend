import styles from './LoginInput.module.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react';
import { useDispatch} from 'react-redux';
import { login, logout } from '../store/authSlice';
import { useNavigate } from "react-router-dom";


function LoginInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try {


      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({email, password}),
      });

      if(response.ok){
        dispatch(login(email));
        alert("로그인 성공!");
        navigate("/main");
      }
      if (!response.ok){
        alert("로그인 실패");
      }
      console.log(response);

    }catch (error){
      alert("로그인 실패");
    }
};

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>로그인</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField 
          className={styles.inputBox}
          id="demo-helper-text-misaligned"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <TextField 
          className={styles.inputBox}
          id="demo-helper-text-misaligned-no-helper" 
          label="비밀번호" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <Stack spacing={2} direction="row">
          <Button className={styles.button} variant="contained" type="submit">로그인 하기</Button>
        </Stack>
      </form>
      <p className={styles.text}><a href="http://localhost:3000/join">회원이 아니신가요?</a></p>
    </div>
  );
}

export default LoginInput;
import styles from './SignUpInput.module.css';
import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function SignUpInput() {
    const [email, setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [error, setError] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validNickname, setValidNickname] = useState(false);

    const navigate = useNavigate();

    //  회원가입
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (password !== checkPassword) {
            setError(true);
            alert("비밀번호를 확인하세요.");
        } 
        else if(!validEmail || !validNickname ){
            alert("이메일과 닉네임의 중복 체크 해주세요");
        }
        else {
            setError(false);
            try {
                const response = await fetch('http://localhost:8000/api/v1/users/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email, password, nickname}),
                });
                if (response.ok) {
                    // 회원가입 성공 처리 (예: 성공 메시지, 페이지 이동 등)
                    alert("회원가입 성공!");
                    navigate('/login');
                } else {
                    // 서버 응답이 실패일 때의 처리
                    alert("회원가입 실패");
                }
            } catch (error) {
                // 네트워크 오류 등 비동기 요청 자체가 실패했을 때
                console.error("Network error: ", error);
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 이메일 중복 체크
    const checkEmail = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/email?email=${email}`, {
                method: 'GET',
            });
            if (response.ok) {
                alert("사용 가능한 이메일 입니다");
                setValidEmail(true);
            } else {
                // 서버 응답이 실패일 때의 처리
                alert("이미 가입된 이메일 입니다");
                setValidEmail(false);
            }

        } catch(error){
            alert("오류가 발생하였습니다. 다시 시도해주세요");
            setValidEmail(false);
        }
    };

    // 닉네임 중복 체크 
    const checkName = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/v1/users/nickname?nickname=${nickname}`, {
                method: 'GET',
            });
            if (response.ok) {
                alert("사용 가능한 닉네임 입니다");
                setValidNickname(true);
            } else {
                // 서버 응답이 실패일 때의 처리
                alert("이미 존재하는 닉네임 입니다");
                setValidNickname(false);
            }

        } catch(error){
            alert("오류가 발생하였습니다. 다시 시도해주세요");
            setValidNickname(false);
        }
    };


    return (
        <div className={styles.container}>
            <h2 className={styles.text}>회원가입</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.checkValidContainer}>
                    <TextField
                        className={styles.inputBox}
                        helperText="이메일 주소를 입력하세요"
                        id="demo-helper-text-aligned"
                        label="이메일"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className={styles.checkValidBtn} onClick={checkEmail}>중복 확인</button>
                </div>
                <br/>
                <div className={styles.checkValidContainer}>
                    <TextField
                        className={styles.inputBox}
                        helperText="닉네임을 입력하세요"
                        id="demo-helper-text-aligned"
                        label="닉네임"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                <button className={styles.checkValidBtn} onClick={checkName}>중복 확인</button>
                </div>
                <br/>
                <TextField
                    className={styles.inputBox}
                    helperText="비밀번호를 입력하세요"
                    id="demo-helper-text-aligned"
                    type="password"
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br/><br/>
                <TextField
                    className={styles.inputBox}
                    helperText="비밀번호를 다시 한 번 입력하세요"
                    id="demo-helper-text-aligned"
                    type="password"
                    label="비밀번호 확인"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    required
                    error={!!error}
                />
                <br/><br/><br/>
                <Stack spacing={2} direction="row">
                    <Button className={styles.button} variant="contained" type="submit">회원가입 하기</Button>
                </Stack>
            </form>
        </div>
    );
}

export default SignUpInput;
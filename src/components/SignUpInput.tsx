import styles from './SignUpInput.module.css';
import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function SignUpInput() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (password !== checkPassword) {
            setError(true);
            alert("비밀번호를 확인하세요.");
        } else {
            setError(false);
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            try {
                const response = await fetch('http://localhost:8000/api/v1/users/signup', {
                    method: 'POST',
                    //headers: { 'Content-Type': 'application/json' },
                    body: formData,
                });
    
                if (response.ok) {
                    // 회원가입 성공 처리 (예: 성공 메시지, 페이지 이동 등)
                    alert("회원가입 성공!");
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
    


    return (
        <div className={styles.container}>
            <h2 className={styles.text}>회원가입</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                <br/><br/>
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
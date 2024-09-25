import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store';
import { useNavigate } from "react-router-dom";
import styles from "./MyInfo.module.css";
import {useState, useEffect, useRef} from 'react';
import { IoIosLogOut } from "react-icons/io";
import { IoBanOutline } from "react-icons/io5";
import DefaultImg from "../images/profile.svg";


function MyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [username, setUsername] = useState("");
  const [useremail, setUseemail] = useState("");
  const [userimg, setUserimg] = useState("");

  const [tempUsername, setTempUsername] = useState(username);
  const [tempUserImg, setTempUserImg] = useState(userimg);
  const [imgFile, setImgFile] = useState<any>();


  const fileInput = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);

  const handleEditing = () =>{
    setEditing(!editing);
  }

  const handleLogout = () => {
    dispatch(logout())
    sessionStorage.removeItem('access_token');
    navigate("/main");
  }


  useEffect(()=> {
    console.log(userimg);
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
        setUseemail(data.email);
        setTempUsername(username);
    })
}, []);


// 회원탈퇴
const withdraw = () => {
    const response = window.confirm("정말로 탈퇴하시겠습니까?");
    
    if(response){
        const token = sessionStorage.getItem('access_token');

        fetch("http://localhost:8000/api/v1/users/delete", {
            method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
        })
        .then(response=>{
            if (!response.ok){
                console.log("네트워크 응답이 정상적이지 않습니다.");
                console.log(response);
            }
            else{
                alert("회원 탈퇴 되었습니다.");
                dispatch(logout());
                sessionStorage.removeItem("access_token");
                console.log(response);
            }

            navigate("/login");
        })

    }
}

  // 회원 정보 수정
  const ModifyUserInfo = () => {
    const token = sessionStorage.getItem('access_token');
    const formData = new FormData();

    formData.append('profile_data', JSON.stringify({nickname: tempUsername}));
    //formData.append('nickname', tempUsername);
    if (imgFile) {
        formData.append('file', imgFile);
    }

    console.log(formData.get('profile_data'));
    console.log(formData.get('file'));

    fetch("http://localhost:8000/api/v1/users/profile", {
        method: 'PATCH',
        headers:{'Authorization' : `Bearer ${token}`,},
        body: formData,
  }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.log(response);
            });
        }
        else{
            setUsername(tempUsername);
            if (imgFile) {
                setUserimg(URL.createObjectURL(imgFile)); // 미리보기용 URL 생성
            }
            handleEditing();
        }
    });
}

  // 이미지 업로드 핸들러
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]; // 선택된 파일을 가져옴
        const reader = new FileReader(); // FileReader를 통해 파일을 읽음

        // 파일이 성공적으로 읽힌 경우
        reader.onloadend = () => {
            setImgFile(file);
            setTempUserImg(reader.result as string); // 읽은 파일의 base64 URL을 tempUserImg에 저장
        };

        reader.readAsDataURL(file); // 파일을 Data URL 형식으로 읽음
    }
  };

  // 프로필 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

    // 회원 정보 수정 취소
    const handleCancel = () => {
        handleEditing();
        setTempUserImg(userimg);
        setTempUsername(username);
      }



  return (
    <div>
        <div className={styles.myInfoContainer}>
            
            {editing ? 
            <>
                <div className={styles.editProfileImg}>
                    <img className={styles.defaultImg} src={tempUserImg==="" ? DefaultImg : tempUserImg } onClick={handleImageClick}/>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInput}
                        onChange={handleChangeImg}
                    />
                </div>
                <form onSubmit={ModifyUserInfo}>
                <input className={styles.nameInput} autoFocus required defaultValue={username} onChange={(e) => setTempUsername(e.target.value)}/>
                <div className={styles.email}>{useremail}</div>
                <div className={styles.modifyBtn}><button type="button" onClick={handleCancel}>취소</button><button onClick={ModifyUserInfo} type="button">완료</button></div></form>
            </>
            :
            <>
                <div className={styles.profileImg}><img className={styles.defaultImg} src={userimg==="" ? DefaultImg : userimg }/></div>
                <div className={styles.name}>{username}</div>
                <div className={styles.email}>{useremail}</div>
                <div><button className={styles.editBtn} onClick={handleEditing}>프로필 편집</button></div>
            </>
        }
        </div>
        <div className={styles.BtnContainer}>
            <div className={styles.logout}><IoIosLogOut className={styles.icon} onClick={handleLogout}/>로그아웃</div>
            <div className={styles.delete} onClick={withdraw}><IoBanOutline className={styles.icon}/> 회원 탈퇴</div>
        </div>
    </div>
  );
}

export default MyInfo;
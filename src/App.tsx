// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Alarm from "./pages/Alarm";
import Main from "./pages/Main";
import RegisterPet from "./pages/RegisterPet";
import AIMatching from "./pages/AIMatching";
import Notice from "./pages/Notice";
import Facilities from "./pages/Facilities";
import WalkingCourse from "./pages/WalkingCourse";
import MyWalkingCourse from "./pages/MyWalkingCourse";
import MyInfo from "./pages/MyInfo";
// import Preferences from "./pages/Preferences";
// import CreateUser1 from "./pages/CreateUser1";
// import CreateUser2 from "./pages/CreateUser2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/login" element={<Login />} /> {/* 로그인 페이지 */}
        <Route path="/signup" element={<Signup />} /> {/* 회원가입 페이지 */}
        <Route path="/alarm" element={<Alarm />} /> {/* 알람 페이지 */}
        <Route path="/register-pet" element={<RegisterPet />} /> {/* 반려동물 등록 페이지 */}
        <Route path="/ai-matching" element={<AIMatching />} /> {/* AI 매칭 페이지 */}
        <Route path="/notice" element={<Notice />} /> {/* 공지사항 페이지 */}
        <Route path="/facilities" element={<Facilities />} /> {/* 반려동물 관련 시설 페이지 */}
        <Route path="/walking-course" element={<WalkingCourse />} /> {/* 산책 코스 페이지 */}
        <Route path="/my-walking-course" element={<MyWalkingCourse />} /> {/* 나의 산책 코스 페이지 */}
        <Route path="/myinfo" element={<MyInfo />} /> {/* 내정보 페이지 */}
        // <Route path="/preferences" element={<Preferences />} /> {/* 선호동물 입력 및 수정 페이지 */}
        // <Route path="/create-user1" element={<CreateUser1 />} /> {/* 유저정보생성(개인) 페이지 1 */}
        // <Route path="/create-user2" element={<CreateUser2 />} /> {/* 유저정보생성(보호소) 페이지 2 */}
      </Routes>
    </Router>
  );
}

export default App;

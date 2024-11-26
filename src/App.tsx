// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Facilities from "./pages/Facilities";
import WalkingCourse from "./pages/WalkingCourse";
import MyWalkingCourse from "./pages/MyWalkingCourse";
import MyInfo from "./pages/MyInfo";
import MatchingPage from './pages/matching/MatchingPage'
import DetailPage from './pages/matching/DetailPage'
import DetailReadPage from "./pages/matching/DetailReadPage";
import PreferPage from "./pages/matching/PreferPage";
import DetailCorrect from "./pages/matching/DetailCorrect";
import MyPageUser from './pages/my/MyPageUser';
import MyPageShelter from "./pages/my/MyPageShelter";

import HeaderLogin from "./components/HeaderLogin";



function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/facilities" element={<Facilities />} /> {/* 반려동물 관련 시설 페이지 */}
        <Route path="/walking-course" element={<WalkingCourse />} /> {/* 산책 코스 페이지 */}
        <Route path="/my-walking-course" element={<MyWalkingCourse />} /> {/* 나의 산책 코스 페이지 */}
        <Route path="/my-info" element={<MyInfo />} /> {/* 내정보 페이지 */}
        <Route path="/prefer" element={<PreferPage />} /> {/* 선호동물 입력 및 수정 페이지 */}
        <Route path="/matching" element={<MatchingPage />} /> {/* 반려동물 매칭 페이지 */}
        <Route path="/detailadd" element={<DetailPage />} /> {/* 반려동물 상세정보 작성 페이지 (보호소) */}
        <Route path="/detail" element={<DetailReadPage />} /> {/* 반려동물 상세정보 페이지 */}
        <Route path="/detail-correct" element={<DetailCorrect />} /> {/* 반려동물 상세정보 수정 페이지 (보호소) */}
        <Route path="/mypage-user" element={<MyPageUser />} /> {/* 마이페이지 (유저) */}
        <Route path="/mypage-shelter" element={<MyPageShelter />} /> {/* 마이페이지 (유저) */}
        <Route path="/myinfo" element={<MyInfo />} /> {/* 내정보 페이지 */}
      </Routes>
    </Router>
  )};

export default App;
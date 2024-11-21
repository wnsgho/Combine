// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />  {/* 로그인 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;

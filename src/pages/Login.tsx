import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; 
import HeaderLogin from "../components/HeaderLogin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 일반 로그인
  const handleLogin = async () => {
    if (!email && !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
  
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 형식이 아닙니다.");
      return;
    }
  
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", {
        username: email,
        password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      alert("로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인을 할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 카카오 로그인
  const handleKakaoLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/oauth2/kakao");
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      alert("카카오 로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      alert("카카오 로그인을 할 수 없습니다.");
    }
  };

  // 네이버 로그인
  const handleNaverLogin = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/oauth2/naver");
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      alert("네이버 로그인 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("네이버 로그인 실패:", error);
      alert("네이버 로그인을 할 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HeaderLogin />
      <main className="flex-grow bg-[#CDC3BF] flex items-center justify-center relative">
        <div className="absolute w-[90%] h-[85%] bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* 왼쪽 섹션 */}
          <div className="hidden md:flex flex-1 bg-[#EDEDED] px-8 py-14 flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-800 mb-2">
                안녕하세요!
              </h1>
            </div>

            {/* Ten.과 로고 */}
            <div className="flex items-end justify-center gap-2">
              <span className="text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[10rem] font-semibold text-gray-800">
                Ten.
              </span>
              <img
                src="/src/assets/logo.png"
                alt="로고"
                className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] rounded-full bg-[#7F5546]"
              />
            </div>

            {/* 회원가입하기 */}
            <div className="text-sm md:text-2xl lg:text-2xl xl:text-3xl text-gray-600 flex items-center gap-1">
              <p>회원이 아니신가요?</p>
              <p
                className="font-bold cursor-pointer transition-transform transform hover:scale-105 pl-"
                onClick={() => navigate("/signup")}
              >
                회원가입하기
              </p>
            </div>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="flex-1 bg-[#FFFFFF] px-8 py-14 flex flex-col justify-between">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">로그인하기</h1>
            {/* 입력 필드 */}
            <div className="space-y-5">
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요."
                  className="w-full px-4 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                />
              </div>
              <div className="relative">
                <label className="block text-xl font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full px-4 py-4 text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                />
                <img
                  src={
                    showPassword
                      ? "/src/assets/eyeon.svg"
                      : "/src/assets/eyeoff.svg"
                  }
                  alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  className="absolute right-4 top-12 w-6 h-6 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="flex justify-between gap-2 mt-4">
              <button
                className="flex items-center justify-center gap-2 w-1/2 py-3 bg-[#f1df79] rounded-2xl text-lg font-medium"
                onClick={handleKakaoLogin}
              >
                <img src="/src/assets/kakao.svg" alt="카카오 로그인" className="w-8 h-8" />
                카카오 로그인
              </button>
              <button
                className="flex items-center justify-center gap-2 w-1/2 py-3 bg-[#72b471] rounded-2xl text-lg font-medium text-white"
                onClick={handleNaverLogin}
              >
                <img src="/src/assets/naver.svg" alt="네이버 로그인" className="w-8 h-8" />
                네이버 로그인
              </button>
            </div>
            <button
              className="w-full py-3 mt-4 bg-[#3D3D3D] text-white text-2xl font-semibold rounded-lg shadow"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "로그인 중 입니다." : "로그인 하기"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

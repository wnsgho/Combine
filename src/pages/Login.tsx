import React from "react";
import Header from "../components/Header";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <Header />

      {/* 헤더 아래(로그인 페이지) */}
      <main className="flex-grow bg-[#CDC3BF] flex items-center justify-center relative">
        {/* 네모 박스 */}
        <div className="absolute w-[90%] h-[85%] bg-white shadow-lg rounded-lg flex overflow-hidden">
          {/* 네모 박스 왼쪽(로고) */}
          <div className="flex-1 bg-[#EDEDED] p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-7xl text-gray-800 mb-6">안녕하세요!</h1>
            </div>

            {/* Ten.이랑 개발바닥 로고 */}
            <div className="flex items-end justify-center gap-8">
              <span
                className="text-[12rem] font-semibold text-gray-800"
                style={{
                  alignSelf: "flex-end",
                }}
              >
                Ten.
              </span>
              <img
                src="/src/assets/logo.png"
                alt="로고"
                className="w-[450px] h-[450px] rounded-full bg-[#7F5546]"
              />
            </div>

            {/* 회원가입 묻기 */}
            <div className="text-4xl text-gray-600 flex items-center gap-4">
              <p>회원이 아니신가요?</p>
              <p className="font-bold">회원가입하기</p>
            </div>
          </div>

          {/* 네모 박스 오른쪽(로그인 폼) */}
          <div className="flex-1 bg-[#FFFFFF]"></div>
        </div>
      </main>
    </div>
  );
};

export default Login;

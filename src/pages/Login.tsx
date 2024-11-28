import React from "react";
import HeaderLogin from "../components/HeaderLogin";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 헤더 */}
      <HeaderLogin />

      {/* 로그인 페이지 */}
      <main className="flex-grow bg-[#CDC3BF] flex items-center justify-center relative">
        {/* 네모 박스 */}
        <div className="absolute w-[90%] h-[85%] bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          {/* 네모 박스 왼쪽(로고) */}
          <div className="hidden md:flex flex-1 bg-[#EDEDED] px-8 py-14 md:px-8 md:py-14 lg:px-8 lg:py-14 flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-800 mb-2 md:mb-3 lg:mb-4">
                안녕하세요!
              </h1>
            </div>

            {/* Ten.이랑 개발바닥 로고 */}
            <div className="flex items-end justify-center gap-2 md:gap-3 lg:gap-6 xl:gap-8">
              <span
                className="text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-semibold text-gray-800"
              >
                Ten.
              </span>
              <img
                src="/src/assets/logo.png"
                alt="로고"
                className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[300px] 2xl:h-[300px] rounded-full bg-[#7F5546]"
              />
            </div>

            {/* 회원가입 묻기 */}
            <div className="text-sm md:text-2xl lg:text-2xl xl:text-3xl text-gray-600 flex items-center gap-1 md:gap-2 lg:gap-3">
              <p>회원이 아니신가요?</p>
              <p className="font-bold">회원가입하기</p>
            </div>
          </div>

          {/* 네모 박스 오른쪽(로그인 폼) */}
          <div className="flex-1 bg-[#FFFFFF] px-8 py-14 md:px-8 md:py-14 lg:px-8 lg:py-14 flex flex-col justify-between w-full md:w-auto">
            {/* 로그인하기 */}
            <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6">
              로그인하기
            </h1>

            {/* 로그인 입력 내용 */}
            <div className="space-y-4 md:space-y-3 lg:space-y-5">
              {/* 이메일 */}
              <div className="mb-5 md:mb-0">
                <label className="block text-2xl md:text-lg lg:text-xl font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  className="w-full px-3 py-3 md:px-3 md:py-3 lg:px-4 lg:py-4 text-2xl md:text-lg lg:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                />
              </div>

              {/* 비밀번호 */}
              <div className="mb-5 md:mb-0">
                <label className="block text-2xl md:text-lg lg:text-xl font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full px-3 py-3 md:px-3 md:py-3 lg:px-4 lg:py-4 text-2xl md:text-lg lg:text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                />
              </div>
            </div>

            {/* 카카오톡 로그인 버튼 + 네이버 로그인 버튼 */}
            <div className="flex justify-between gap-2 mt-2">
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-[#f1df79] rounded-2xl text-xl md:text-sm lg:text-lg font-medium">
                <img
                  src="/src/assets/kakao.svg"
                  alt="카카오 로그인"
                  className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
                카카오톡 로그인
              </button>
              <button className="flex items-center justify-center gap-2 w-1/2 py-3 bg-[#72b471] rounded-2xl text-xl md:text-sm lg:text-lg font-medium text-white">
                <img
                  src="/src/assets/naver.svg"
                  alt="네이버 로그인"
                  className="w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
                네이버 로그인
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button className="w-full py-3 mt-4 bg-[#3D3D3D] text-white text-3xl md:text-lg lg:text-2xl font-semibold rounded-lg shadow">
              로그인 하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;


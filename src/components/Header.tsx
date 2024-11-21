import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // 로그인 페이지인지 회원가입 페이지인지 구별하기
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <header className="flex items-center justify-between px-10 py-6 bg-white shadow-md">
      {/* TENPAWS */}
      <div className="text-4xl font-bold" style={{ color: "#7F5546" }}>
        TenPaws
      </div>

      {/* 매칭, 안내, 내정보 */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-16 lg:gap-32 xl:gap-60 text-3xl font-medium">
        <span>매칭</span>
        <span>안내</span>
        <span>내정보</span>
      </nav>

      {/* 로그인/ 회원가입 */}
      <div className="text-2xl font-medium">
        {isLoginPage || isSignupPage ? (
          // 로그인 페이지가 아닌 경우 헤더 오른쪽을 로그인으로 설정
          <Link to="/signup" className="hover:text-gray-700">
            로그인
          </Link>
        ) : (
          // 로그인 페이지인 경우 헤더 오른쪽을 회원가입으로 설정
          <Link to="/login" className="hover:text-gray-700">
            회원가입
          </Link>
        )}
      </div>

      {/* 모바일 화면(헤더 및 아이콘) */}
      <div className="md:hidden">
        <img
          src="/side.svg"
          alt="Side menu"
          className="w-12 h-12 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;

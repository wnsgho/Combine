import React from "react";

const HeaderLogin: React.FC = () => {
  return (
    <header className="relative flex items-center justify-between px-10 py-6 bg-white shadow-md">
      {/* TENPAWS */}
      <div className="text-4xl font-bold" style={{ color: "#7F5546" }}>
        TenPaws
      </div>

      {/* 매칭, 안내, 내정보 */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-16 lg:gap-32 xl:gap-60 text-3xl font-medium">
        <span className="text-gray-700">매칭</span>
        <span className="text-gray-700">안내</span>
        <span className="text-gray-700">내정보</span>
      </nav>

      {/* 회원가입 */}
      <div className="hidden md:block text-2xl font-medium text-gray-700">
        회원가입
      </div>

      {/* 모바일 헤더 */}
      <div className="md:hidden flex flex-1 justify-end">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src="/side.svg"
            alt="Side menu"
            className="w-12 h-12 cursor-pointer"
          />
        </div>
      </div>

      {/* 사이드바 */}
      <div className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-50 flex flex-col">
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#D7B8A3]">
          <span className="text-3xl font-bold text-white">HOME</span>
          <div className="flex items-center">
            <span className="text-3xl font-semibold text-white pr-5">
              회원가입
            </span>
            <div className="w-0.5 h-12 bg-white"></div>
            <div className="flex items-center justify-center ml-5">
              <img
                src="/src/assets/x.svg"
                alt="Close sidebar"
                className="w-10 h-10"
              />
            </div>
          </div>
        </div>

        {/* 사이드바 내부 목록들 */}
        <nav className="flex-grow flex flex-col">
          <div className="relative group bg-[#FCF7F7]">
            <span className="p-5 block text-3xl font-medium">매칭</span>
            <div className="h-px bg-[#E3E2E2]"></div>
            <div className="bg-[#ffffff]">
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">반려동물 등록</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">AI 매칭 시스템</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
            </div>
          </div>
          <div className="relative group bg-[#FCF7F7]">
            <span className="p-5 block text-3xl font-medium">안내</span>
            <div className="h-px bg-[#E3E2E2]"></div>
            <div className="bg-[#ffffff]">
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">공지사항</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">
                  반려동물 관련 시설
                </span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">산책 코스</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
            </div>
          </div>
          <div className="relative group bg-[#FCF7F7]">
            <span className="p-5 block text-3xl font-medium">내정보</span>
            <div className="h-px bg-[#E3E2E2]"></div>
            <div className="bg-[#ffffff]">
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">나의 정보</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">
                  선호동물 입력 및 수정
                </span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
              <div className="relative">
                <span className="block pl-7 p-5 text-2xl">나의 산책 코스</span>
                <div className="h-px bg-[#E3E2E2]"></div>
              </div>
            </div>
          </div>
          <div className="relative group bg-[#FCF7F7]">
            <span className="p-5 block text-3xl font-medium">알림</span>
            <div className="h-px bg-[#E3E2E2]"></div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderLogin;


import React, { useState } from "react";

const HeaderLogin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="relative flex items-center justify-between px-10 py-6 bg-white shadow-md">
      {/* TENPAWS */}
      <div className="text-4xl font-bold" style={{ color: "#7F5546" }}>
        <a href="/">TenPaws</a>
      </div>

      {/* 매칭, 안내, 내정보 */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-16 lg:gap-32 xl:gap-60 text-3xl font-medium">
        <span className="hover:text-gray-700">매칭</span>
        <span className="hover:text-gray-700">안내</span>
        <span className="hover:text-gray-700">내정보</span>
      </nav>

      {/* 회원가입 */}
      <div className="hidden md:block text-2xl font-medium">
        <a href="/signup">회원가입</a>
      </div>

      {/* 모바일 헤더 */}
      <button
        onClick={toggleSidebar}
        className="md:hidden flex flex-1 justify-end"
      >
        <img src="/side.svg" alt="Side menu" className="w-12 h-12 cursor-pointer" />
      </button>

      {/* 사이드바 */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50"
            onClick={toggleSidebar}
          ></div>

          <div className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg z-50 flex flex-col">
            {/* 사이드바 헤더 */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#D7B8A3]">
              <a
                href="/"
                className="text-3xl font-bold text-white transition-transform hover:scale-105"
              >
                HOME
              </a>
              <div className="flex items-center">
                <a
                  href="/signup"
                  className="text-3xl font-semibold text-white pr-5 transition-transform hover:scale-105"
                >
                  회원가입
                </a>
                <div className="w-0.5 h-12 bg-white"></div>
                {/* X 표시 */}
                <button
                  onClick={toggleSidebar}
                  className="flex items-center justify-center ml-5 transition-transform hover:scale-105"
                >
                  <img
                    src="/src/assets/x.svg"
                    alt="Close sidebar"
                    className="w-10 h-10"
                  />
                </button>
              </div>
            </div>

            {/* 사이드바 내부 */}
            <nav className="flex-grow flex flex-col">
              {[
                {
                  name: "매칭",
                  link: "#",
                  items: [
                    { name: "반려동물 등록", link: "/detailadd" },
                    { name: "AI 매칭 시스템", link: "/ai-matching" },
                  ],
                },
                {
                  name: "안내",
                  link: "#",
                  items: [
                    { name: "공지사항", link: "/guide/announcement" },
                    { name: "반려동물 관련 시설", link: "/guide/facilities" },
                    { name: "산책 코스", link: "/guide/walking-course" },
                  ],
                },
                {
                  name: "내정보",
                  link: "#",
                  items: [
                    { name: "나의 정보", link: "/my-info" },
                    { name: "선호동물 입력 및 수정", link: "/prefer" },
                    { name: "나의 산책 코스", link: "/my-walking-course" },
                  ],
                },
                { name: "알림", link: "/alarm", items: [] },
              ].map((section) => (
                <div
                  key={section.name}
                  onMouseEnter={() => setExpandedSection(section.name)}
                  onMouseLeave={() => setExpandedSection(null)}
                  className={`relative group ${
                    ["매칭", "안내", "내정보", "알림"].includes(section.name)
                      ? "bg-[#FCF7F7]"
                      : ""
                  }`}
                >
                  {section.link === "#" ? (
                    <span
                      className={`p-5 block text-3xl transition-transform hover:scale-105 ${
                        ["매칭", "안내", "내정보", "알림"].includes(section.name)
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {section.name}
                    </span>
                  ) : (
                    <a
                      href={section.link}
                      className={`p-5 block text-3xl transition-transform hover:scale-105 ${
                        ["매칭", "안내", "내정보", "알림"].includes(section.name)
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {section.name}
                    </a>
                  )}
                  <div className="h-px bg-[#E3E2E2]"></div>
                  {/* 사이드바 매칭, 안내, 내정보 내부 작업 */}
                  {expandedSection === section.name && section.items.length > 0 && (
                    <div className="bg-[#ffffff]">
                      {section.items.map((item, index) => (
                        <div key={index} className="relative">
                          <a
                            href={item.link}
                            className="block pl-7 p-5 text-2xl transition-transform hover:scale-105"
                          >
                            {item.name}
                          </a>
                          <div className="h-px bg-[#E3E2E2]"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderLogin;


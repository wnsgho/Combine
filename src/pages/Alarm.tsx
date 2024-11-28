import React from "react";

const Alarm = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="relative flex items-center px-10 py-6 sm:py-6 md:py-6 lg:py-6 xl:py-6 bg-white shadow-md z-50">
        {/* 왼쪽 아이콘 */}
        <img
          src="/src/assets/before.svg"
          alt="Back"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer"
        />

        {/* 중앙 텍스트 */}
        <div className="flex-grow text-center">
          <span
            className="text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold"
            style={{ color: "#7F5546" }}
          >
            알림
          </span>
        </div>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-regular text-gray-500">
          현재 알림이 없습니다.
        </h1>
      </main>
    </div>
  );
};

export default Alarm;


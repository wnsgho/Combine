import React from "react";
import notificationIcon from "../assets/notification.svg";

const Footer: React.FC = () => {
  // 공지사항 내용(예시 입니다.)
  const noticeContent = "오늘은 11월 22일 금요일...내일은 쉴 수 있습니다.";

  return (
    <footer className="bg-gray-300 text-black py-2 px-4 sm:px-6 md:px-7 lg:px-9 flex items-center fixed bottom-0 left-0 w-full">
      {/* notification.svg */}
      <img
        src={notificationIcon}
        alt="Notification Icon"
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 mr-2 sm:mr-3 md:mr-4 lg:mr-5"
      />

      {/* 공지사항 및 내용 */}
      <div className="flex items-center">
        <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mr-2 sm:mr-4 md:mr-6">
          공지사항
        </span>
        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
          {noticeContent}
        </span>
      </div>
    </footer>
  );
};

export default Footer;




import React from 'react';
import { GoChevronRight } from "react-icons/go";
import mainimage from '../assets/image/mainimage.webp';

// Props의 타입 정의
interface ErrorProps {
  errorCode: number | string; // 에러 코드는 숫자 또는 문자열일 수 있음
}

const Error: React.FC<ErrorProps> = ({ errorCode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-32 w-60">
        <img src={mainimage} alt="mainImage" className="rounded-full" />
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold text-red-500">Error Code: {errorCode}</p>
        <p className="text-gray-500">문제가 발생했습니다. 나중에 다시 시도해주세요.</p>
      </div>
      <div>
        <button>메인으로 이동 <GoChevronRight /></button>
      </div>
    </div>
  );
};

export default Error;

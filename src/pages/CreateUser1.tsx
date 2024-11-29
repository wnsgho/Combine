import React, { useState, ChangeEvent } from "react";
import Header from "../components/Header";

const CreateUser1 = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthdate: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#CDC3BF]">
      {/* 헤더 */}
      <Header />

      {/* 유저정보생성 페이지 */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        {/* 네모 박스 */}
        <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-10 sm:p-12 md:p-16 lg:p-20">
          {/* 개인 회원가입 */}
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-10 text-center">
            개인 회원가입
          </h1>

          {/* 입력 필드 */}
          <form className="space-y-10">
            {/* 이메일 */}
            <div>
              <label
                htmlFor="email"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={inputValues.email}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.email
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label
                htmlFor="password"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="text"
                placeholder="비밀번호를 입력해주세요."
                value={inputValues.password}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.password
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={inputValues.passwordConfirm}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.passwordConfirm
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 이름 */}
            <div>
              <label
                htmlFor="name"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름을 입력해주세요."
                value={inputValues.name}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.name
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 생년월일 */}
            <div>
              <label
                htmlFor="birthdate"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                생년월일
              </label>
              <input
                id="birthdate"
                type="text"
                placeholder="생년월일을 입력해주세요. (예: 2024.12.15)"
                value={inputValues.birthdate}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.birthdate
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                전화번호
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="전화번호를 입력해주세요. (예: 010-0000-0000)"
                value={inputValues.phone}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.phone
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 주소 */}
            <div>
              <label
                htmlFor="address"
                className="block text-2xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-4"
              >
                주소
              </label>
              <input
                id="address"
                type="text"
                placeholder="주소를 입력해주세요."
                value={inputValues.address}
                onChange={handleInputChange}
                className={`w-full px-5 py-4 sm:py-5 md:py-6 border rounded-lg text-2xl sm:text-2xl md:text-2xl ${
                  inputValues.address
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-gray-400"
                }`}
              />
            </div>

            {/* 회원가입 버튼 */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="w-full max-w-md px-8 py-5 bg-[#3D3D3D] text-white text-3xl font-semibold rounded-lg hover:bg-black transition"
              >
                회원가입 하기
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateUser1;


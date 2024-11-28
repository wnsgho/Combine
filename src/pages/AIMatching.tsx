import React from "react";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import arrowIcon from "../assets/arrow2.svg"; 

const AIMatching = () => {
  const petImage = "/src/assets/sample.jpeg"; 
  const petName = "댕구";

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F5]">
      {/* 헤더 */}
      <Header />

      {/* 매칭 페이지 내용 */}
      <main className="flex-grow flex justify-center items-center px-0 sm:px-8 md:px-12 lg:px-16 xl:px-16 2xl:px-8 py-0">
        <div className="w-[90%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[90%] 2xl:w-[70%] h-[80vh] bg-white rounded-md shadow-md p-4 sm:p-6 md:p-8 lg:p-10 xl:p-10 2xl:p-10 space-y-8 flex flex-col items-center">
          {/* 반려동물 매칭 정보 + 반려동물 상세 보기 */}
          <div className="relative flex items-center w-full mt-4">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold text-[#7F5546] mx-auto">
              반려동물 매칭 정보
            </h1>
            <button className="absolute right-0 bottom-0 text-[#7F5546] font-medium text-base sm:text-base md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl hover:underline">
              반려동물 상세보기
            </button>
          </div>

          {/* 이미지 */}
          <div className="h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] xl:h-[70vh] 2xl:h-[70vh] w-[35vh] sm:w-[40vh] md:w-[50vh] lg:w-[60vh] xl:w-[60vh] 2xl:w-[70vh] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            {petImage ? (
              <img
                src={petImage}
                alt={petName}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
                사진이 없습니다.
              </span>
            )}
          </div>

          {/* 반려 동물 이름 */}
          <span
            className="block text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold text-[#7F5546] m-0 p-0 leading-none mt-4"
            style={{ marginTop: "10px", marginBottom: "-35px"}}
          >
            {petName}
          </span>

          {/* AI 매칭 내용(종류 + 나이 + 성별 + 펫케어 + 세부사항 */}
          <div className="space-y-3 w-full">
            {[
              { label: "종류", value: "강아지" },
              { label: "나이", value: "0 ~ 3살" },
              { label: "성별", value: "수컷" },
              {
                label: "펫케어",
                value: (
                  <div className="flex justify-end items-center">
                    <span className="text-black">서울특별시 강남구</span>
                    <img
                      src={arrowIcon}
                      alt="Arrow Icon"
                      className="w-12 h-12 m-0 p-0"
                    />
                  </div>
                ),
              },
              { label: "세부사항", value: "#온순함" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl border-b pb-5 pt-2 sm:pb-4"
              >
                <span className="font-bold text-[#7F5546] pl-4">{item.label}</span>
                <span className="text-black font-semibold pr-4 flex items-center">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default AIMatching;


import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      {/* 메인 섹션 */}
      <section className="relative w-full h-[77vh] bg-cover">
        <img
          src="/src/assets/main.svg"
          alt="Main Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-8 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-32 2xl:gap-44">
          {/* 매칭 네모 */}
          <div className="w-64 h-64 sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[440px] lg:h-[440px] xl:w-[510px] xl:h-[510px] 2xl:w-[600px] 2xl:h-[600px] p-6 bg-gray-100 shadow-md rounded-md text-center flex justify-center items-center bg-opacity-80">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-medium">매칭</span>
          </div>
          {/* 안내 네모 */}
          <div className="w-64 h-64 sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[440px] lg:h-[440px] xl:w-[510px] xl:h-[510px] 2xl:w-[600px] 2xl:h-[600px] p-6 bg-gray-100 shadow-md rounded-md text-center flex justify-center items-center bg-opacity-80">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-medium">안내</span>
          </div>
        </div>
      </section>

      {/* About TenPaws */}
      <section className="flex flex-col items-center justify-center bg-[#b88471] py-10 px-4">
        <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-5">About TenPaws</h2>
        <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl max-w-5xl text-center leading-relaxed mb-2">
        TenPaws는 나이 드신 분들이 반려동물을 통해 새로운 인연을 맺을 수 있도록 돕는 서비스입니다. <br />
        </p>
        <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl max-w-5xl text-center leading-relaxed">
          AI 반려동물 매칭, 산책 코스 추천, 시설 검색 등 다양한 서비스를 확인해보세요.
        </p>
      </section>

      {/* 페이지 설명 섹션 */}
      <section className="relative flex flex-col items-center justify-center h-[55vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] xl:h-[79vh] 2xl:h-[79vh]">
        {/* 황토색 배경 */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#d9c7c0]"></div>
        {/* 회색 배경 */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#eeeceb]"></div>

        {/* 아이콘 및 설명 */}
        <div className="relative flex flex-col items-center justify-center w-[85%] sm:w-[85%] md:w-[80%] lg:w-[85%] xl:w-[80%] 2xl:w-[90%] max-w-7xl">
          <div className="w-full flex items-center justify-around mb-6 md:mb-10">
            {/* 매칭 동물 결정 */}
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/dog.png"
                alt="매칭 동물 결정"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-22 2xl:h-22 object-contain mb-3"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold text-white">
                매칭 동물 결정
              </span>
            </div>
            {/* 화살표 */}
            <img
              src="/src/assets/arrow.png"
              alt="Arrow"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 object-contain"
            />
            {/* 매칭 신청 */}
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/approve.png"
                alt="매칭 신청"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain mb-3"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold text-white">
                매칭 신청
              </span>
            </div>
            {/* 화살표 */}
            <img
              src="/src/assets/arrow.png"
              alt="Arrow"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 object-contain"
            />
            {/* 보호소 확인 및 승인 */}
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/board.png"
                alt="보호소 확인 및 승인"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain mb-3"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold text-white">
                보호소 확인 및 승인
              </span>
            </div>
            {/* 화살표 */}
            <img
              src="/src/assets/arrow.png"
              alt="Arrow"
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 object-contain"
            />
            {/* 승인 완료 */}
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/check.png"
                alt="승인 완료"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain mb-3"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold text-white">
                승인 완료
              </span>
            </div>
          </div>
          {/* 상세 설명 내용 */}
          <div className="w-[550px] sm:w-[630px] md:w-[730px] lg:w-[980px] xl:w-[1200px] 2xl:w-[1450px] bg-white rounded-md shadow-md p-6 sm:p-6 md:p-8">
            <div className="text-left mb-6">
              <h2 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-800 mb-4">
                매칭 동물 결정
              </h2>
              <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-xleading-relaxed mb-1 pl-4">
                필요한 조건을 골라 원하는 반려 동물들을 결정해 보세요.
              </p>
              <p className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-leading-relaxed mb-1 pl-4">
                고르는데 어려움이 있으시면 AI 기능을 활용해 보세요.
              </p>
            </div>

            {/* 이미지 */}
            <img
              src="/src/assets/page.png"
              alt="Matching Animal Example"
              className="w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] 2xl:w-[60%] mx-auto rounded-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Main;



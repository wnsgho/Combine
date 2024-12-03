import React, { useState, useEffect } from "react";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import axiosInstance from "../utils/axiosInstance"; 

const AIMatching = () => {
  const [userId, setUserId] = useState<number | null>(null); 
  const [petInfo, setPetInfo] = useState<{
    petImage: string | null;
    details: { label: string; value: string | JSX.Element }[];
  }>({
    petImage: null,
    details: [
      { label: "종", value: "정보 없음" },
      { label: "크기", value: "정보 없음" },
      { label: "나이", value: "정보 없음" },
      { label: "성격", value: "정보 없음" },
      { label: "운동량", value: "정보 없음" },
    ],
  });

  // 백엔드에서 유저 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("accessToken"); 
        const response = await axiosInstance.get("/api/v1/features/check-id", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUserId(response.data.userId); 
      } catch (err) {
        alert("매칭 정보를 가져오는 데 실패했습니다."); 
      }
    };
    fetchUserId();
  }, []);

  // 백엔드에서 매칭 정보 API 가져오기
  useEffect(() => {
    if (!userId) return;

    const fetchPetInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axiosInstance.post(
          `/api/v1/users/${userId}/recommend-pet`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        setPetInfo({
          petImage: data.imagesUrls?.[0] || null,
          details: [
            { label: "종", value: data.species || "정보 없음" },
            { label: "크기", value: data.size || "정보 없음" },
            { label: "나이", value: data.age ? `${data.age}살` : "정보 없음" },
            { label: "성격", value: data.personality || "정보 없음" },
            { label: "운동량", value: data.exerciseLevel || "정보 없음" },
          ],
        });
      } catch (err) {
        alert("매칭 정보를 가져오는 데 실패했습니다."); 
      }
    };

    fetchPetInfo();
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F5]">
      {/* 헤더 */}
      <Header />

      {/* 콘텐츠 */}
      <main className="flex-grow flex justify-center items-center px-0 sm:px-8 md:px-12 lg:px-16 xl:px-16 2xl:px-8 py-7 overflow-y-auto">
        <div className="w-[90%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[90%] 2xl:w-[70%] min-h-[80vh] bg-white rounded-md shadow-md p-4 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-8 space-y-8 flex flex-col items-center">
          {/* 제목 */}
          <div className="relative flex items-center w-full mt-4">
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold text-[#7F5546] mx-auto">
              반려동물 매칭 정보
            </h1>
          </div>

          {/* 이미지 */}
          <div className="h-[30vh] sm:h-[35vh] md:h-[35vh] lg:h-[35vh] xl:h-[35vh] 2xl:h-[35vh] w-[35vh] sm:w-[45vh] md:w-[50vh] lg:w-[60vh] xl:w-[65vh] 2xl:w-[65vh] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            {petInfo.petImage ? (
              <img
                src={petInfo.petImage}
                alt="추천 반려동물"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl">
                이미지가 없습니다.
              </span>
            )}
          </div>

          {/* 매칭 정보 목록 */}
          <div className="space-y-3 w-full">
            {petInfo.details.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl border-b pb-5 sm:pb-4"
              >
                <span className="font-bold text-[#7F5546] pl-4">{item.label}</span>
                <span
                  className={`font-semibold pr-4 flex items-center ${
                    item.value === "정보 없음" ? "text-gray-500" : "text-black"
                  }`}
                >
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

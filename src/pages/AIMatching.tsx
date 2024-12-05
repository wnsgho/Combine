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

  // 유저 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        console.error("Access token is missing.");
        alert("로그인 정보가 필요합니다.");
        return;
      }
  
      const authHeader = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
  
      try {
        const response = await axiosInstance.get("/api/v1/features/user-id", {
          headers: {
            Authorization: authHeader,
          },
        });
        console.log("User ID Response:", response.data);
        setUserId(response.data.Id || null); // "Id" 값을 userId에 설정
      } catch (err) {
        console.error("Unexpected Error:", err as unknown); // 간단히 로그만 출력
        alert("유저 정보를 가져오는 데 실패했습니다.");
        setUserId(null);
      }
    };
  
    fetchUserId();
  }, []);
  
  useEffect(() => {
    if (!userId) return;
  
    const fetchPetInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        console.error("Access token is missing.");
        alert("로그인 정보가 필요합니다.");
        return;
      }
  
      const authHeader = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
  
      try {
        const response = await axiosInstance.post(
          `/api/v1/users/${userId}/recommend-pet`,
          {}, // POST 요청은 빈 바디
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );
  
        const data = response.data;
        console.log("Pet Info Response:", data);
  
        setPetInfo({
          petImage: data.pet?.imageUrls?.[0] || null,
          details: [
            { label: "종", value: data.pet?.species || "정보 없음" },
            { label: "크기", value: data.pet?.size || "정보 없음" },
            { label: "나이", value: data.pet?.age ? `${data.pet.age}살` : "정보 없음" },
            { label: "성격", value: data.pet?.personality || "정보 없음" },
            { label: "운동량", value: data.pet?.exerciseLevel || "정보 없음" },
          ],
        });
      } catch (err) {
        console.error("Unexpected Error:", err as unknown); // 간단히 로그만 출력
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
      <main className="flex-grow flex justify-center items-center px-8 py-7 overflow-y-auto">
        <div className="w-[90%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[90%] 2xl:w-[70%] min-h-[80vh] bg-white rounded-md shadow-md p-8 space-y-8 flex flex-col items-center">
          {/* 제목 */}
          <div className="relative flex items-center w-full">
            <h1 className="text-4xl font-bold text-[#7F5546] mx-auto">
              반려동물 매칭 정보
            </h1>
          </div>

          {/* 이미지 */}
          <div className="h-[35vh] w-[65vh] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            {petInfo.petImage ? (
              <img
                src={petInfo.petImage}
                alt="추천 반려동물"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 text-xl">이미지가 없습니다.</span>
            )}
          </div>

          {/* 매칭 정보 목록 */}
          <div className="space-y-3 w-full">
            {petInfo.details.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-2xl border-b pb-4"
              >
                <span className="font-bold text-[#7F5546]">{item.label}</span>
                <span
                  className={`font-semibold ${
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
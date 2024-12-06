import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";

const AIMatching = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [petInfo, setPetInfo] = useState<{
    petId: number | null;
    petName: string | null;
    petImage: string | null;
    details: { label: string; value: string }[];
  }>({
    petId: null,
    petName: null,
    petImage: null,
    details: [
      { label: "종", value: "매칭 정보를 불러오는 중..." },
      { label: "크기", value: "매칭 정보를 불러오는 중..." },
      { label: "나이", value: "매칭 정보를 불러오는 중..." },
      { label: "성격", value: "매칭 정보를 불러오는 중..." },
      { label: "운동량", value: "매칭 정보를 불러오는 중..." },
    ],
  });

  // 유저 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 되어 있지 않습니다.");
        setIsLoading(false);
        return;
      }

      const authHeader = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;

      try {
        const response = await axiosInstance.get("/api/v1/features/user-id", {
          headers: { Authorization: authHeader },
        });
        setUserId(response.data.Id || null);
      } catch {
        alert("유저 정보를 가져오는 데 실패했습니다.");
        setUserId(null);
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []);

  // 매칭 정보 가져오기
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchPetInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 되어 있지 않습니다.");
        setIsLoading(false);
        return;
      }

      const authHeader = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;

      try {
        const response = await axiosInstance.post(
          `/api/v1/users/${userId}/recommend-pet`,
          {},
          { headers: { "Content-Type": "application/json", Authorization: authHeader } }
        );

        const data = response.data;

        if (!data.pet) {
          alert("추천할 반려동물이 존재하지 않습니다.");
          setPetInfo({
            petId: null,
            petName: "정보 없음",
            petImage: null,
            details: [
              { label: "종", value: "정보 없음" },
              { label: "크기", value: "정보 없음" },
              { label: "나이", value: "정보 없음" },
              { label: "성격", value: "정보 없음" },
              { label: "운동량", value: "정보 없음" },
            ],
          });
          setIsLoading(false);
          return;
        }

        const absoluteImageUrl = data.pet.imageUrls?.[0]
          ? `${import.meta.env.VITE_API_BASE_URL}${data.pet.imageUrls[0]}`
          : null;

        setPetInfo({
          petId: data.pet.petId || null,
          petName: data.pet.petName || "정보 없음",
          petImage: absoluteImageUrl,
          details: [
            { label: "종", value: data.pet.species || "정보 없음" },
            { label: "크기", value: data.pet.size || "정보 없음" },
            { label: "나이", value: data.pet.age ? `${data.pet.age}살` : "정보 없음" },
            { label: "성격", value: data.pet.personality || "정보 없음" },
            { label: "운동량", value: data.pet.exerciseLevel || "정보 없음" },
          ],
        });
      } catch {
        alert("매칭 정보를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetInfo();
  }, [userId]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F5]">
      <Header />
      <main className="flex-grow flex justify-center items-center px-8 py-7 overflow-y-auto">
        <div className="w-[90%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[90%] 2xl:w-[70%] min-h-[80vh] bg-white rounded-md shadow-md p-8 space-y-8 flex flex-col items-center">
          <div className="relative flex items-center w-full mt-4">
            <h1 className="text-4xl font-bold text-[#7F5546] mx-auto">반려동물 매칭 정보</h1>
            {petInfo.petId && !isLoading && (
              <button
                className="absolute right-0 bottom-0 text-[#7F5546] font-medium text-xl hover:underline"
                onClick={() => window.location.href = `/detail/${petInfo.petId}`}
              >
                반려동물 상세보기
              </button>
            )}
          </div>
          <div className="h-[35vh] w-[65vh] bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            {isLoading ? (
              <span className="text-gray-500 text-xl">매칭 정보를 불러오는 중...</span>
            ) : petInfo.petImage ? (
              <img
                src={petInfo.petImage}
                alt="추천 반려동물"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500 text-xl">이미지가 없습니다.</span>
            )}
          </div>
          <span className={`block text-3xl font-bold ${!isLoading && petInfo.petName === "정보 없음" ? "text-gray-500" : "text-[#7F5546]"}`}>
            {!isLoading ? petInfo.petName : "매칭 정보를 불러오는 중..."}
          </span>
          <div className="space-y-3 w-full">
            {petInfo.details.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-2xl border-b pb-4"
              >
                <span className="font-bold text-[#7F5546]">{item.label}</span>
                <span
                  className={`font-semibold ${
                    item.value === "매칭 정보를 불러오는 중..." || item.value === "정보 없음" ? "text-gray-500" : "text-black"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIMatching;

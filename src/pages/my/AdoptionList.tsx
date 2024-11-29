import React, { useState } from 'react';
import { GoChevronUp, GoChevronDown } from "react-icons/go";

// 데이터 타입 정의

interface Applicant {
  id: number;
  name: string;
  contact: string;
}

interface Pet {
  id: number;
  name: string;
  age: string;
  gender: string;
  applicant: Applicant;
}

const AdoptionList: React.FC = () => {
  // 예시 데이터: 여러 펫의 정보
  const pets: Pet[] = [
    { id: 1, name: '코코', age: '0 ~ 3살', gender: '수컷', applicant: { id: 101, name: '김철수', contact: '010-1234-5678'},},
    { id: 2, name: '보리', age: '0 ~ 3살', gender: '암컷', applicant: { id: 102, name: '이영희', contact: '010-1234-5678'},},
    { id: 3, name: '초코', age: '0 ~ 3살', gender: '수컷', applicant: { id: 103, name: '박민수', contact: '010-1234-5678'},},
  ];

  // 상태 정의: 각 펫의 상세 정보 표시 여부를 관리 (key: pet ID, value: boolean)
  const [visibleDetails, setVisibleDetails] = useState<Record<number, boolean>>({});

  // 토글 함수: 특정 펫 ID의 상태를 토글
  const toggleDetails = (id: number): void => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 ID의 상태를 반전
    }));
  };

  return (
    <div className="flex flex-col items-center">
      {/* 헤더 섹션 */}
      <section className="flex flex-col items-center w-full max-w-lg gap-4 mt-8">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold">입양신청 리스트</h2>
        </div>
      </section>

      {/* 리스트 섹션 */}
      <section className='mt-20'>
        <div>
          <ul className='flex flex-col gap-10'>
            {/* 여러 펫 항목 렌더링 */}
            {pets.map((pet) => (
              <li
                key={pet.id}
                className="flex flex-col justify-between pb-4 mb-4 border-b"
              >
                <div className="flex items-center justify-between">
                  {/* 기본 정보 표시 */}
                  <span>펫 ID: {pet.id}</span>
                  {/* 토글 버튼 */}
                  <button
                    onClick={() => toggleDetails(pet.id)}
                    className="ml-32 text-blue-500 underline"
                  >
                    {visibleDetails[pet.id] ? <GoChevronUp /> : <GoChevronDown />}
                  </button>
                </div>

                {/* 상세 정보: 해당 ID의 상태에 따라 표시 */}
                {visibleDetails[pet.id] && (
                  <div className="p-2 mt-2 bg-gray-100 rounded">
                    <h3 className="text-lg font-semibold">펫 정보</h3>
                    <p>이름: {pet.name}</p>
                    <p>나이: {pet.age}</p>
                    <p>품종: {pet.gender}</p>

                    <h3 className="mt-4 text-lg font-semibold">입양 신청자 정보</h3>
                    <p>신청자 이름: {pet.applicant.name}</p>
                    <p>연락처: {pet.applicant.contact}</p>
                    {/* 승인/거절 버튼 */}
                    <div className="flex gap-2 mt-2">
                      <button className="px-4 py-2 text-white bg-green-500 rounded">
                        입양 승인
                      </button>
                      <button className="px-4 py-2 text-white bg-red-500 rounded">
                        입양 거절
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AdoptionList;

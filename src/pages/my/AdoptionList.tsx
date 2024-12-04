import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import Header from "../../components/Header";
import MyPageModal from '../../components/MyPageModal';

// 데이터 타입 정의
interface Pet {
  petId: number;
  species: string;
  size: string;
  age: string;
  personality: string;
  exerciseLevel: number;
}

interface ApplyPet {
  id: number;
  pet: Pet;
  userId: number;
  applyDate: string;
  applyStatus: string;
}

interface ProcessedPet {
  id: number;
  species: string;
  age: string;
  size: string;
  personality: string;
  exerciseLevel: number;
  applicantId: number;
  userInfo?: UserInfo | null; // 유저 정보 포함
}

interface UserInfo {
  email: string;
  username: string;
  phoneNumber: string;
  address: string;
}

const AdoptionList: React.FC = () => {

  // 여러 펫의 정보를 관리하는 상태
  const [pets, setPets] = useState<ProcessedPet[]>([]);

  // 상태 정의: 각 펫의 상세 정보 표시 여부를 관리
  const [visibleDetails, setVisibleDetails] = useState<Record<number, boolean>>({});

  const [Id, setId] = useState("")
  // 입양 승인 모달
  const [isApprovalModalOpen, setApprovalModalOpen] = useState<boolean>(false);
  
  // 입양 거절 모달
  const [isRefusalModalOpen, setRefusalModalOpen] = useState<boolean>(false);


  // ID 불러오기
  useEffect(() => {
    const shelterId = async () => {
      try {
        const response = await axios.get(`/api/v1/features/check-id`);
        setId(response.data);
      } catch(error) {
        console.error("유저 ID를 불러오는 중 오류 발생:", error);
      }
    };
    shelterId();
  }, [])


  // 입양 신청 및 유저 정보 가져오기
  useEffect(() => {
    const fetchApplyPets = async () => {
      try {
        // API 호출로 펫 신청 정보 가져오기
        const response = await axios.get<ApplyPet[]>(`/api/v1/applypet/shelter/${Id}`);
        const fetchedPets: ProcessedPet[] = response.data.map((applyPet) => ({
          id: applyPet.id,
          species: applyPet.pet.species,
          age: applyPet.pet.age,
          size: applyPet.pet.size,
          personality: applyPet.pet.personality,
          exerciseLevel: applyPet.pet.exerciseLevel,
          applicantId: applyPet.userId,
        }));

        // 유저 정보 로드 및 병합
        const updatedPets = await Promise.all(
          fetchedPets.map(async (pet) => {
            const userInfo = await fetchUserInfo(pet.applicantId);
            return { ...pet, userInfo };
          })
        );

        setPets(updatedPets);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchUserInfo = async (applicantId: number): Promise<UserInfo | null> => {
      try {
        const response = await axios.get<UserInfo>(`/api/v1/users/${applicantId}`);
        return response.data;
      } catch (error) {
        console.error(`유저 정보를 불러오는 중 오류 발생 (ID: ${applicantId}):`, error);
        return null;
      }
    };

    fetchApplyPets();
  }, []);

  // 토글 함수: 특정 펫 ID의 상태를 토글
  const toggleDetails = (id: number): void => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // 해당 ID의 상태를 반전
    }));
  };

// 동물 삭제
const DeleteAccount = async (petId: number): Promise<void> => {
  try {
    await axios.delete(`/api/v1/pets/${Id}/${petId}`);
    alert('동물 삭제가 완료되었습니다.');
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId)); // 삭제된 펫을 상태에서 제거
  } catch (error) {
    console.error('동물 삭제 중 오류 발생:', error);
    alert('동물 삭제에 실패했습니다.');
  }
};

  return (
    <div>
      {/* 헤더 */}
      <Header />
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center w-full max-w-lg gap-4 mt-8">
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">입양신청 리스트</h2>
          </div>
        </section>

        {/* 리스트 섹션 */}
        <section className="mt-20">
          <div>
            <ul className="flex flex-col gap-10">
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
                      <p>종류: {pet.species}</p>
                      <p>크기: {pet.size}</p>
                      <p>나이: {pet.age}</p>
                      <p>성격: {pet.personality}</p>
                      <p>활동량: {pet.exerciseLevel}</p>

                      <h3 className="mt-4 text-lg font-semibold">입양 신청자 정보</h3>
                      {pet.userInfo ? (
                        <>
                          <p>이름: {pet.userInfo.username}</p>
                          <p>이메일: {pet.userInfo.email}</p>
                          <p>연락처: {pet.userInfo.phoneNumber}</p>
                          <p>주소: {pet.userInfo.address}</p>
                        </>
                      ) : (
                        <p>유저 정보를 불러오는 중...</p>
                      )}
                      {/* 승인/거절 버튼 */}
                      <div className="flex gap-2 mt-2">
                        <button className="px-4 py-2 text-white bg-green-500 rounded"
                          onClick={() => setApprovalModalOpen(true)}>
                          입양 승인
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-500 rounded"
                          onClick={() => setRefusalModalOpen(true)}
                        >
                          입양 거절
                        </button>
                        {/* 입양 승인 모달 (승인 및 거절 시 알람 기능 미구현)*/}
                        <MyPageModal isOpen={isApprovalModalOpen} onClose={() => setApprovalModalOpen(false)}>
                          <h3 className="mb-4 text-lg font-bold">정말로 승인하시겠습니까?</h3>
                          <div className="flex justify-end gap-4 mt-6">
                            <button className="text-mainColor" onClick={() => {DeleteAccount(pet.id)}}> 
                              네
                            </button>
                            <button className="text-cancelColor" onClick={() => setApprovalModalOpen(false)}>
                              아니오
                            </button>
                          </div>
                        </MyPageModal>
                        {/* 입양 거절 모달 */}
                        <MyPageModal isOpen={isRefusalModalOpen} onClose={() => setRefusalModalOpen(false)}>
                          <h3 className="mb-4 text-lg font-bold">정말로 거절하시겠습니까?</h3>
                          <div className="flex justify-end gap-4 mt-6">
                            <button className="text-mainColor">
                              네
                            </button>
                            <button className="text-cancelColor" onClick={() => setRefusalModalOpen(false)}>
                              아니오
                            </button>
                          </div>
                        </MyPageModal>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>

  );
};

export default AdoptionList;

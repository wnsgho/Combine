import axiosInstance from "../../utils/axiosInstance"; 
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

declare global {
  interface Window {
    kakao: any;
  }
}

interface ShelterInfo {
  shelterName: string;
  phoneNumber: string;
  address: string;
}

interface UserId {
  Id: number;
}

interface UseRole {
  role: string;
}

const ShelterAddress: React.FC = () => {
  const { useId } = useParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<UserId>({
    Id: 0
  });
  const [useRole, setUseRole] = useState<UseRole>({
    role: ""
  })
  const [shelterInfo, setShelterInfo] = useState<ShelterInfo>({
    shelterName: "",
    address: "",
    phoneNumber: "",
  });
  const [tempShelterInfo, setTempShelterInfo] = useState<ShelterInfo>(shelterInfo);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoic2hlbHRlcmhhaGFoYUBlbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfU0hFTFRFUiIsImlhdCI6MTczMzM1OTY0MywiZXhwIjoxNzMzNDQ2MDQzfQ.3q-mFjsqd-Mq53A6dlkeBs4UvQQ38-9LrlLGvye646Q"

  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // ID, ROLE 불러오기
  useEffect(() => {
    const shelterId = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/features/user-id`, {headers});
        setUserId(response.data.id);
      } catch(error) {
        console.error("보호소 ID를 불러오는 중 오류 발생:", error);
      }
    };

    const shelterRole = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/features/role`, {headers});
        setUseRole(response.data);
      }catch(error) {
        console.error("Role 불러오는 중 오류 발생:", error);
      }
    }
    
    shelterId();
    shelterRole();
  }, [])


  // 보호소 정보 가져오기
  useEffect(() => {
    const shelterInfo = async () => {
      try {
        const response = await axiosInstance.get<ShelterInfo>(`/api/v1/shelters/${useId}`, {headers});
        setShelterInfo(response.data);
      } catch (error) {
        console.error("보호소 정보를 불러오는 중 오류 발생:", error);
      }
    };
    shelterInfo();
  }, []);

  // 카카오 지도 API 연동
  useEffect(() => {
    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      const mapInstance = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 위치
        level: 5,
      });

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(shelterInfo.address, (result:any, status:any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 지도 중심 이동
          mapInstance.setCenter(coords);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: coords,
            map: mapInstance,
          });

          // 정보 오버레이 생성
          const overlayContent = `
            <div style="
              padding: 10px;
              text-align: center;
              background: white;
              border-radius: 4px;
              font-weight: bold;
              min-width: 120px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
              font-size: 18px;
            ">
              ${shelterInfo.shelterName}
              <div style="font-size: 12px; color: #888;">${shelterInfo.address}</div>
            </div>
          `;
          const overlay = new window.kakao.maps.CustomOverlay({
            position: coords,
            content: overlayContent,
            xAnchor: 0.5,
            yAnchor: 1.5,
          });

          // 마커 클릭 시 오버레이 표시
          window.kakao.maps.event.addListener(marker, "click", () => {
            overlay.setMap(mapInstance);
          });
        } else {
          console.warn("주소 검색 결과가 없습니다.");
        }
      });
    });
  }, [shelterInfo.address]);

  // 모달 열기/닫기
  const openModal = () => {
    setTempShelterInfo(shelterInfo);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const saveChanges = () => {
    setShelterInfo(tempShelterInfo);
    setIsModalOpen(false);
    editSubmit();
  };

  // 정보 수정 제출
  const editSubmit = async (): Promise<void> => {
    if (!shelterInfo) return;

    try {
      await axiosInstance.put(`/api/v1/shelter/${userId}`, shelterInfo);
      alert('정보가 수정되었습니다.');
      setIsModalOpen(false)
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  // 확인 버튼 클릭시 뒤로가기
  const Cancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };


  const shelter = useRole.role == "ROLE_SHELTER"


  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <section>
          <h2 className="text-2xl font-bold">보호소 주소</h2>
        </section>
        <section className="flex flex-col items-center w-full max-w-lg m-8">
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">보호기관 이름</p>
              <p className="text-lg">{shelterInfo.shelterName}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">주소</p>
              <p className="text-lg">{shelterInfo.address}</p>
            </div>
          </div>
        </section>
        {shelter ? <section className="flex gap-24 my-8">
          <button className="px-4 py-2 text-lg font-bold text-mainColor" onClick={Cancel}>확인</button>
          <button
            className="px-4 py-2 text-lg text-cancelColor"
            onClick={openModal}
          >
            수정
          </button>
        </section> 
        :
        <section className="flex gap-24 my-8">
          <button className="px-4 py-2 text-lg font-bold text-mainColor" onClick={Cancel}>확인</button>
        </section> 
        }

      </div>
      <div ref={mapRef} className="w-full h-[700px] rounded-lg"></div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <h3 className="mb-4 text-xl font-bold">정보 수정</h3>
            <div className="mb-4">
              <label className="block mb-2 font-bold">보호기관 이름</label>
              <input
                type="text"
                value={tempShelterInfo.shelterName}
                onChange={(e) =>
                  setTempShelterInfo((prev) => ({ ...prev, shelterName: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">주소</label>
              <input
                type="text"
                value={tempShelterInfo.address}
                onChange={(e) =>
                  setTempShelterInfo((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">전화번호</label>
              <input
                type="text"
                value={tempShelterInfo.phoneNumber}
                onChange={(e) =>
                  setTempShelterInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                취소
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterAddress;



import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

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


const ShelterAddress: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 Id 추출
  const Id: number = parseInt(id || '1', 10); // 기본값으로 1 설정
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [markers, setMarkers] = useState<{ [key: string]: any }>({});
  const [overlays, setOverlays] = useState<{ [key: string]: any }>({});
  const [map, setMap] = useState<any>(null);

    // 쉘터 정보 가져오기
    useEffect(() => {
      const fetchShelterInfo = async () => {
        try {
          const response = await axios.get<ShelterInfo>(`/api/v1/shelters/${Id}`);
          setShelterInfo(response.data);
        } catch (error) {
          console.error('유저 정보를 불러오는 중 오류 발생:', error);
        }
      };
  
      fetchShelterInfo();
    }, [Id]);



  const [shelterInfo, setShelterInfo] = useState({
    shelterName: "",
    address: "",
    phoneNumber: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [tempShelterInfo, setTempShelterInfo] = useState(shelterInfo); // 임시 저장 정보

  // 사용자 위치 가져오기 (Geolocation API)
  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        options
      );
    }
  }, []);

  // 카카오 지도 API 연동
  useEffect(() => {
    if (!userLocation) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;

      // 지도 초기화
      const mapOptions = {
        center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        level: 5, // 지도 확대 수준
      };
      const mapInstance = new window.kakao.maps.Map(mapRef.current, mapOptions);
      setMap(mapInstance);

      // Places API 인스턴스 생성
      const ps = new window.kakao.maps.services.Places(mapInstance);

      // 검색 콜백
      const placesSearchCB = (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data); // 모든 검색 결과 저장

          // 첫 번째 검색 결과를 기준으로 지도 이동 및 마커 생성
          const firstPlace = data[0];
          if (firstPlace) {
            const placePosition = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);

            // 지도 중심 이동
            mapInstance.setCenter(placePosition);

            // 보호소 마커
            const shelterMarker = new window.kakao.maps.Marker({
              position: placePosition,
              map: mapInstance,
            });

            // 마커 오버레이 (정보 표시)
            const shelterOverlay = new window.kakao.maps.CustomOverlay({
              position: placePosition,
              content: `
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
                  ${firstPlace.place_name}
                  <div style="font-size: 12px; color: #888;">${firstPlace.road_address_name || firstPlace.address_name}</div>
                </div>
              `,
              xAnchor: 0.5,
              yAnchor: 1.5,
            });

            shelterOverlay.setMap(mapInstance);

            // 마커 클릭 시 오버레이 표시
            window.kakao.maps.event.addListener(shelterMarker, "click", () => {
              shelterOverlay.setMap(mapInstance);
            });

            // 마커 제거 및 다시 표시를 위한 상태 관리
            setMarkers({ [firstPlace.id]: shelterMarker });
            setOverlays({ [firstPlace.id]: shelterOverlay });
          }
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          console.warn("검색 결과가 없습니다.");
        } else {
          console.error("검색 중 오류 발생:", status);
        }
      };

      // 검색 옵션
      const searchOptions = {
        location: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 3000, // 검색 반경 (단위: 미터)
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      // Places API로 보호소 이름 검색
      ps.keywordSearch(shelterInfo.shelterName, placesSearchCB, searchOptions);
    });
  }, [userLocation, shelterInfo.shelterName]);

  const openModal = () => {
    setTempShelterInfo(shelterInfo); // 현재 정보를 임시 상태에 복사
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  const saveChanges = () => {
    setShelterInfo(tempShelterInfo); // 변경된 정보 저장
    setIsModalOpen(false); // 모달 닫기
  };

  const shelter = shelterInfo.shelterName !== ""; // 쉘터이름으로 쉘터, 일반 확인

  console.log(shelter)
  return (
    <div>
      <div className="flex flex-col items-center">
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
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">전화번호</p>
              <p className="text-lg">{shelterInfo.phoneNumber}</p>
            </div>
          </div>
        </section>
        <section>
          {shelter ? (
            <section className="flex gap-24 my-8">
              <button className="px-4 py-2 text-lg font-bold text-mainColor">
                확인
              </button>
              <button
                className="px-4 py-2 text-lg text-cancelColor"
                onClick={openModal}
              >
                수정
              </button>
            </section>
          ) : (
            <section className="flex gap-32 my-8">
              <button className="px-4 py-2 text-lg text-mainColor">
                확인
              </button>
            </section>
          )}
        </section>
      </div>
      <div ref={mapRef} className="w-full h-[700px] rounded-lg "></div>

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
                  setTempShelterInfo((prev) => ({ ...prev, name: e.target.value }))
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
                  setTempShelterInfo((prev) => ({ ...prev, phone: e.target.value }))
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


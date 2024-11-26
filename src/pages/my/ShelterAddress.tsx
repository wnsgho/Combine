import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const ShelterAddress = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [markers, setMarkers] = useState<{ [key: string]: any }>({});
  const [overlays, setOverlays] = useState<{ [key: string]: any }>({});
  const [map, setMap] = useState<any>(null);
  
  const [shelterInfo, setShelterInfo] = useState({
    name: '경남유기동물보호소',
    address: '김해 대동면',
    phone: '010-1111-1111',

  });

  //사용자 위치 geolocation api
  useEffect(() => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      };
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      ),
        options;
    }
  }, []);
  
  //카카오 api 연동
  useEffect(() => {
    if (!userLocation) return;
    if (places.length > 0) return;
  
    window.kakao.maps.load(() => {
      if (!mapRef.current) return;
  
      const options = {
        center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        level: 5 // 지도 반경
      };
  
      const mapInstance = new window.kakao.maps.Map(mapRef.current, options);
      setMap(mapInstance); // map 객체 저장
  
      // 현재 위치 마커
      const currentMarker = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        map: mapInstance,
        content: `
          <div style="
            width: 30px;
            height: 30px;
            background: red;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
          "></div>
        `
      });
  
      // 현재 위치 텍스트 조절
      const currentOverlay = new window.kakao.maps.CustomOverlay({
        position: currentMarker.getPosition(),
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
            현재 위치
          </div>
        `,
        xAnchor: 0.5,
        yAnchor: 1.5
      });
      currentOverlay.setMap(mapInstance);
  
      // 장소 검색
      const ps = new window.kakao.maps.services.Places(mapInstance);
  
      // 검색 결과
      const placesSearchCB = (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces((prev) => [...prev, ...data]);
          data.forEach((place: any) => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(place.y, place.x),
              map: mapInstance
            });
  
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: marker.getPosition(),
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
                  ${place.place_name}
                  <div style="font-size: 12px; color: #888;">${place.category_group_name}</div>
                </div>
              `,
              xAnchor: 0.5,
              yAnchor: 1.7
            });
  
            setMarkers((prev) => ({ ...prev, [place.id]: marker }));
            setOverlays((prev) => ({ ...prev, [place.id]: customOverlay }));
  
            //마커호버
            window.kakao.maps.event.addListener(marker, "mouseover", () => {
              customOverlay.setMap(mapInstance);
            });
            window.kakao.maps.event.addListener(marker, "mouseout", () => {
              customOverlay.setMap(null);
            });
          });
        }
      };
  
      const searchOption = {
        location: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 3000, //반경 km
        sort: window.kakao.maps.services.SortBy.DISTANCE
      };
  
      setPlaces([]);
      ps.keywordSearch(shelterInfo.name, placesSearchCB, searchOption);
    });
  }, [userLocation]);
  
  const getLastCategory = (categoryName: string) => {
    return categoryName.split(">").pop()?.trim() || categoryName;
  };


  const shelter = true; //임시

  return (
    <div>
      <div className="flex flex-col items-center">
        <section>
          <h2 className='text-2xl font-bold'>보호소 주소</h2>
        </section>
        <section className="flex flex-col items-center w-full max-w-lg gap-4 m-8">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">보호기관 이름</p>
              <p className='text-lg'>{shelterInfo.name}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">주소</p>
              <p className='text-lg'>{shelterInfo.address}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">전화번호</p>
              <p className='text-lg'>{shelterInfo.phone}</p>
            </div>
          </div>
        </section>
        <section>
          {shelter ?  <section className="flex gap-24 my-8">
            <button className="px-4 py-2 text-lg font-bold hover:bg-blue-600 text-mainColor">확인</button>
            <button className="px-4 py-2 text-lg hover:bg-gray-500 text-cancelColor">수정</button>
          </section>
        : 
          <section className="flex gap-32 my-8">
            <button className="px-4 py-2 text-lg hover:bg-gray-500 text-mainColor">
              확인
            </button>
          </section>
        }
        </section>
      </div>
      <div ref={mapRef} className="w-full h-[700px] rounded-lg "></div>
        <div className="w-full pl-8 h-[700px] flex flex-col">
          <div className="flex-1 overflow-y-scroll scrollbar-hide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-7">
              {places.map((place) => (
                <div
                  key={place.id}
                  className="p-3 transition-all transform bg-white rounded-lg cursor-pointer hover:shadow-2xl hover:bg-yellow-100"
                  onClick={() => window.open(place.place_url, "_blank")}
                  onMouseEnter={() => {
                    if (overlays[place.id]) {
                      overlays[place.id].setMap(map);
                    }
                  }}
                  onMouseLeave={() => {
                    if (overlays[place.id]) {
                      overlays[place.id].setMap(null);
                    }
                  }}>
                <div className="text-lg font-bold text-blue-600">{getLastCategory(place.category_name)}</div>
                <div className="font-bold text-[22px]">{place.place_name}</div>
                <div className="mt-2 text-lg">{place.road_address_name}</div>
                <div className="text-lg">{place.phone || ""}</div>
                <div className="text-sm text-gray-500">현재 위치로부터 {place.distance}m</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ShelterAddress;
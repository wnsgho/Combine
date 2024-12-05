import Walk from "../../../public/walk.png";
import { useEffect, useRef, useState } from "react";
import GuideNavigationMap from "../../components/GuideNavigationMap";
import Header from "../../components/Header";

declare global {
  interface Window {
    kakao: any;
  }
}

const Facilities = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [markers, setMarkers] = useState<{ [key: string]: any }>({});
  const [overlays, setOverlays] = useState<{ [key: string]: any }>({});
  const [map, setMap] = useState<any>(null);
  const [selectCategory, setSelectCategory] = useState<string | null>(null);

  //카테고리 구분 및 거리정렬 함수
  const filterCategory = selectCategory
    ? places
        .filter((place) => place.category_name.includes(selectCategory))
        .sort((a, b) => parseInt(a.distance) - parseInt(b.distance))
    : places;

  const categories = [
    { id: "hospital", name: "동물병원", keyword: "동물병원" },
    { id: "cafe", name: "애견카페", keyword: "애견카페" },
    { id: "shop", name: "애견용품", keyword: "동물용품" },
    { id: "beauty", name: "애견미용", keyword: "반려동물미용" }
  ];

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
      ps.keywordSearch("동물병원", placesSearchCB, searchOption);
      ps.keywordSearch("애견카페", placesSearchCB, searchOption);
      ps.keywordSearch("애견미용", placesSearchCB, searchOption);
      ps.keywordSearch("반려동물용품", placesSearchCB, searchOption);
    });
  }, [userLocation]);

  const getLastCategory = (categoryName: string) => {
    return categoryName.split(">").pop()?.trim() || categoryName;
  };

  return (
    <div>
      <Header/>
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="relative">
          <div className="bg-slate-400"></div>
          <img src={Walk} alt="walk" className="w-full h-[400px] opacity-85 object-cover object-bottom" />
          <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
            <div className="text-[50px] pb-2">반려동물 관련 시설</div>
            <div className="text-[25px]">현재위치를 기반으로 반경 3km 내의 관련 시설을 찾아드립니다.</div>
          </div>
        </div>
        <div className="mb-8">
          <GuideNavigationMap />
        </div>
        <div className="flex space-x-4 text-[24px] font-bold text-white justify-end mr-14">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`cursor-pointer bg-[#AB654B]/90 pt-1 px-2 rounded-t-2xl ${
                selectCategory
                  ? selectCategory === category.keyword
                    ? "text-yellow-200 opacity-100"
                    : "hover:text-yellow-200 opacity-30"
                  : "hover:text-yellow-200 opacity-100"
              }`}
              onClick={() => setSelectCategory(selectCategory === category.keyword ? null : category.keyword)}>
              {category.name}
            </div>
          ))}
        </div>
        <div className="bg-[#AB654B]/90 p-8 flex rounded-lg mb-4">
          <div ref={mapRef} className="w-full h-[700px] rounded-lg "></div>
          <div className="w-full pl-8 h-[700px] flex flex-col">
            <div className="overflow-y-scroll flex-1 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-7">
                {filterCategory.map((place) => (
                  <div
                    key={place.id}
                    className="p-3 bg-white rounded-lg cursor-pointer transform transition-all  hover:shadow-2xl hover:bg-yellow-100"
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
                    <div className="text-lg text-blue-600 font-bold">{getLastCategory(place.category_name)}</div>
                    <div className="font-bold text-[22px]">{place.place_name}</div>
                    <div className="text-lg mt-2">{place.road_address_name}</div>
                    <div className="text-lg">{place.phone || ""}</div>
                    <div className="text-sm text-gray-500">현재 위치로부터 {place.distance}m</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Facilities;

import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import pu from "../../assets/image/pu.avif"; // 임시 사진
import mainimage from "../../assets/image/mainimage.webp" //임시사진
import Header from "../../components/Header";

const images = [pu, mainimage, pu, mainimage, pu]; // 이미지 배열

const DetailReadPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [petInfo, setPetInfo] = useState({
    species: '강아지',
    old: '0 ~ 3살',
    gender: '수컷',
    inoculation: '3차',
    neutering: '완료',
    personality: '얌전함',
    activity: 3,  
    reason: '유기',
    home: '임시보호',
    add: '',
  })

  const shelter = true // (임시) 보호소로 로그인시

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-10">
        <section className="relative w-full max-w-lg overflow-hidden">
          <div className="flex items-center">
            <button
              className="absolute left-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
              onClick={handlePrev}
            >
              <GoChevronLeft size={24} />
            </button>
            <div className="flex items-center justify-center w-full h-64">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
            <button
              className="absolute right-0 z-10 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600"
              onClick={handleNext}
            >
              <GoChevronRight size={24} />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </section>

        <section className="flex flex-col w-full max-w-lg gap-8 mt-8">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-mainColor">댕구</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">종류</p>
              <p className="text-lg">{petInfo.species}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">나이</p>
              <p className="text-lg">{petInfo.old}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">성별</p>
              <p className="text-lg">{petInfo.gender}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">접종 유무</p>
              <p className="text-lg">{petInfo.inoculation}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">중성화 유무</p>
              <p className="text-lg">{petInfo.neutering}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">성격</p>
              <p className="text-lg">{petInfo.personality}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">활동량</p>
              <p className="text-lg">{petInfo.activity}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">보호소로 오게 된 이유</p>
              <p className="text-lg">{petInfo.reason}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">맡겨지기 전 가정환경</p>
              <p className="text-lg">{petInfo.home}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-mainColor">보호기관</p>
            <button className="flex items-center gap-1 text-lg text-blue-500">
              펫케어 <GoChevronRight />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-mainColor">추가정보</p>
            <p className="text-lg">{petInfo.add}</p>
          </div>
        </section>
        {shelter ?  <section className="flex gap-24 my-8">
            <button className="px-4 py-2 text-lg hover:bg-gray-500 text-cancelColor">삭제</button>
            <button className="px-4 py-2 text-lg font-bold hover:bg-blue-600 text-mainColor">완료</button>
            <button className="px-4 py-2 text-lg hover:bg-gray-500 text-cancelColor">수정</button>
          </section>
        : 
          <section className="flex gap-32 my-8">
            <button className="px-4 py-2 text-lg hover:bg-gray-500 text-cancelColor">
              취소
            </button>
            <button className="px-4 py-2 text-lg font-bold hover:bg-blue-600 text-mainColor">
              입양신청
            </button>
          </section>
        }
        
      </div>
    </>
  );
};

export default DetailReadPage;
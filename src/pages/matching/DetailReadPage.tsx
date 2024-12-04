import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import pu from "../../assets/image/pu.avif"; // 임시 사진
import mainimage from "../../assets/image/mainimage.webp" //임시사진
import Header from "../../components/Header";
import axios from "axios";
import MyPageModal from "../../components/MyPageModal";

const images = [pu, mainimage, pu, mainimage, pu]; // 이미지 배열

interface PetInfo {
  species: string;
  name: string;
  age: string;
  gender: string;
  reason: string;
  inoculation: string;
  neutering: string;
  personality: string;
  exerciseLevel: number;
  size: string;
  home: string;
  shelterName: string;
  add: string;
  imageUrls: [];
}


const DetailReadPage = () => {
  const { petId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [role, setRole] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isApplyModalOpen, setApplyModalOpen] = useState<boolean>(false);

  const [petInfo, setPetInfo] = useState({
    species: '',
    name: '',
    age: '',
    gender: '',
    reason: '',
    inoculation: '',
    neutering: '',
    personality: '',
    exerciseLevel: 0,  
    size: '',
    home: '',
    shelterName: '',
    add: '',
    imageUrls: []
  })

  const [applyInfo, setApplyInfo] = useState({
    petId: "",
    userId: ""
  })



  // 동물 상세정보 불러오기
  useEffect(() => {
    const pets = async () => {
      try{
        const response = await axios.get<PetInfo>(`/api/v1/pets/${petId}`);
        setPetInfo(response.data);
      }catch(error) {
        console.error("동물 상세정보 불러오는 중 오류 발생", error)
      }
    }
    pets();
  }, [])

  // 유저 Id 불러오기
  useEffect(() => {
    const userId = async () => {
      try{
        const response = await axios.get(`/api/v1/features/user-id`);
        setApplyInfo(response.data);
      }catch(error) {
        console.error("유저 ID 불러오는 중 오류 발생", error)
      }
    }
    userId();
  }, [])

  // petId 추가하기
  useEffect(() => {
    if (petId) {
      setApplyInfo(prevState => ({
        ...prevState,
        petId: petId
      }));
    }
  }, [petId]);

  // 유저 role 불러오기
  useEffect(() => {
    const roles = async () => {
      try{
        const response = await axios.get(`/api/v1/features/role`);
        setRole(response.data);
      }catch(error) {
        console.error("유저 Role 불러오는 중 오류 발생", error)
      }
    }
    roles();
  }, [])

  // 입양 신청 
  const applypet = async () => {
    try {
      await axios.post(`/api/v1/applypet`, applyInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("입양 신청 보내는 중 오류 발생", error);
    }
  };


  // 보호소 동물 삭제
  const deletePet = async () => {
    try {
      await axios.delete(`/api/v1/pets/${applyInfo.userId}/${petId}`);
    } catch (error) {
      console.error("동물 삭제 중 오류 발생", error);
    }
  };


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

    // 취소 버튼 클릭시 뒤로가기
    const Cancel = () => {
      navigate(-1); // 이전 페이지로 이동
    };

  const shelter = role == "ROLE_SHELTER"

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
            <h3 className="text-2xl font-bold text-mainColor">{petInfo.name}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">종류</p>
              <p className="text-lg">{petInfo.species}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">나이</p>
              <p className="text-lg">{petInfo.age}</p>
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
              <p className="text-lg">{petInfo.exerciseLevel}</p>
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
            <Link to="/shelter-address">
              <button className="flex items-center gap-1 text-lg text-blue-500">
                {petInfo.shelterName} <GoChevronRight />
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-mainColor">추가정보</p>
            <p className="text-lg">{petInfo.add}</p>
          </div>
        </section>
        {shelter ?  <section className="flex gap-24 my-8">
            <button className="px-4 py-2 text-lg text-cancelColor"  onClick={() => setDeleteModalOpen(true)}>삭제</button>
            <button className="px-4 py-2 text-lg font-bold text-mainColor" onClick={Cancel}>완료</button>
            
            <button className="px-4 py-2 text-lg text-cancelColor">수정</button>
          </section>
        : 
          <section className="flex gap-32 my-8">
            <button className="px-4 py-2 text-lg text-cancelColor" onClick={Cancel}>
              취소
            </button>
            <button className="px-4 py-2 text-lg font-bold text-mainColor" onClick={() => setApplyModalOpen(true)}>
              입양신청
            </button>
          </section>
        }
        {/* 입양 신청 모달 */}
        <MyPageModal isOpen={isApplyModalOpen} onClose={() => setApplyModalOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">입양 신청 하시겠습니까?</h3>
          <div className="flex justify-end gap-4 mt-6">
            <button className="text-mainColor" onClick={applypet}>
              네
            </button>
            <button className="text-cancelColor" onClick={() => setApplyModalOpen(false)}>
              아니오
            </button>
          </div>
        </MyPageModal>
        {/* 동물 삭제 모달 */}
        <MyPageModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">정말로 삭제하시겠습니까?</h3>
          <div className="flex justify-end gap-4 mt-6">
            <button className="text-mainColor" onClick={deletePet}>
              네
            </button>
            <button className="text-cancelColor" onClick={() => setDeleteModalOpen(false)}>
              아니오
            </button>
          </div>
        </MyPageModal>
      </div>
    </>
  );
};

export default DetailReadPage;
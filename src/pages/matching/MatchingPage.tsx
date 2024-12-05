import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import mainImage from '../../assets/image/mainimage.webp'; //임시사진
import { GoChevronRight } from "react-icons/go";
import axiosInstance from "../../utils/axiosInstance";

interface ProcessedPet {
  petId: number;
  species: string;
  age: string;
  personality: string;
  exerciseLevel: number;
  size: string;
  imageUrls: string[];
}

interface UseRole {
  role: string;
}

const MatchingPage = () => {
  const [pets, setPets] = useState<ProcessedPet[]>([]); // 동물 데이터 저장 상태

  const [useRole, setUseRole] = useState({
    role: ""
  });

  const [filters, setFilters] = useState({
    species: "",
    age: "",
    size: ""
  });

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoic2hlbHRlcmhhaGFoYUBlbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfU0hFTFRFUiIsImlhdCI6MTczMzM1OTY0MywiZXhwIjoxNzMzNDQ2MDQzfQ.3q-mFjsqd-Mq53A6dlkeBs4UvQQ38-9LrlLGvye646Q"


  const headers = {
    'Authorization': `Bearer ${token}`,
  };



  useEffect(() => {
    const fetchPetList = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/pets'); // API 호출
        setPets(response.data); // API에서 받은 데이터를 상태에 저장
        const userRole = await axiosInstance.get(`/api/v1/features/role`, {headers}); // 현재 로그인 유저 role 확인 API 호출
        setUseRole(userRole.data)
      } catch (error) {
        console.error("동물 리스트를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPetList(); // 데이터 가져오기 함수 실행
  }, []); 

  const shelter = useRole.role == "ROLE_SHELTER"

  // 필터 변경 시 호출되는 핸들러
  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value
    }));
  };

  // 필터링된 동물 리스트 반환
  const filteredPets = Array.isArray(pets) ? pets.filter((pet) => {
    return (
      (!filters.species || pet.species === filters.species) &&
      (!filters.age || pet.age === filters.age) &&
      (!filters.size || pet.size === filters.size)
    );
  }) : [];
  
  // 상세 페이지로 이동하는 링크 생성 함수
const detailLink = (petId:number) => {
  return `/detail/${petId}`; // 상세 페이지 URL 생성
};

  
  
  return (
    <>
      <div className='max-w-screen'>
        <Header />
        <section className='mt-20'>
          <div className='flex justify-evenly'>
            <p className='text-3xl text-mainColor'>선택 옵션</p>
            <Link to="/detailadd">
            {shelter ? <button className='text-2xl text-cancelColor'>등록</button> : null}
            </Link>
          </div>
        </section>
        <section className='flex flex-wrap items-center justify-center mt-10'>
          <form className="flex flex-wrap max-w-xl gap-20 mx-10">
            <select id="species" className="text-3xl border-2 border-mainColor" onChange={filterChange}>
              <option value="">종류</option>
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
            </select>
            <select id="age" className="text-3xl border-2 border-mainColor" onChange={filterChange}>
              <option value="">연령</option>
              <option value="0~3살">0~3살</option>
              <option value="4~6살">4~6살</option>
              <option value="7~8살">7~10살</option>
            </select>
            <select id="size" className="text-3xl border-2 border-mainColor" onChange={filterChange}>
              <option value="">크기</option>
              <option value="소형">소형</option>
              <option value="중형">중형</option>
              <option value="대형">대형</option>
            </select>
          </form>     
          <button 
            onClick={() => setFilters(filters)} // 검색 버튼 클릭 시 필터링 적용
            className='w-32 px-3 text-3xl border-2 border-solid rounded-md border-mainColor'>
            조회
          </button>
        </section>
        <section className='mt-20'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-5 text-4xl font-bold'>매칭이 어려우신가요?</h3>
            <Link to="/ai-matching">
              <button className='flex items-center justify-center text-lg text-mainColor'>AI매칭 바로가기<GoChevronRight /></button>
            </Link>
          </div>
        </section>
        <section className='flex items-center justify-center m-20'>
          <div className='flex flex-wrap justify-center gap-10'>
            {filteredPets.map((pet) => (
              <Link to={detailLink(pet.petId)}>
                <div key={pet.petId} className='border border-solid rounded-lg min-w-40 max-w-48 min-h-72 max-h-72 border-mainColor'>
                  <img src={pet.imageUrls[0]} alt="동물 사진" className='w-full h-40 rounded-t-md'/>
                  <div className='m-3'>
                    <p className='mt-2'>{pet.species} / {pet.age} / {pet.size} /<br /> {pet.personality} / {pet.exerciseLevel}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MatchingPage;
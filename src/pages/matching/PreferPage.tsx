import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  species: string;
  preferredSize: string;
  preferredPersonality: string;
  preferredExerciseLevel: number;
}

interface UseId {
  Id: number;
}

const PreferPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [useId, setUseId] = useState<UseId>({
    Id: 0
  })

  const [userInfo, setUserInfo] = useState<UserInfo>({
    species: "",
    preferredSize: "",
    preferredPersonality: "",
    preferredExerciseLevel: 0
  })

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiaGFoYWhvaG9oaWhpQGVuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMzMzU4MTgzLCJleHAiOjE3MzM0NDQ1ODN9.yhrBc95Ii_bLZeNNpEI1hCfoW49uKUturPGfYJmSTkU"


  const headers = {
    'Authorization': `Bearer ${token}`,
  };


  // ID 불러오기
  useEffect(() => {
    const userId = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/features/user-id`, {headers});
        setUseId(response.data);
      } catch(error) {
        console.error("유저 ID를 불러오는 중 오류 발생:", error);
      }
    };
    userId();
  }, [])

  // select 값 변경 핸들러
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [id]: id === 'preferredExerciseLevel' ? Number(value) : value
    }));
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 새로고침 방지
    await editSubmit();
  };
  

  // 정보 수정 제출

  const editSubmit = async (): Promise<void> => {
    if (!userInfo) return;
  
  
    try {
      await axiosInstance.put(`/api/v1/users/${useId.Id}`, userInfo, {headers});
      alert('정보가 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };
  
  // 취소 버튼 핸들러
  const cancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  console.log(userInfo)

  return (
    <>
      <Header />
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <section className="flex flex-col w-full max-w-lg gap-20 mt-8">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-mainColor">선호동물</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-3/4">
                <p className="text-xl font-bold text-mainColor">종류</p>
                <select id="species" className="text-lg border bg-gray-50 border-mainColor" value={userInfo.species}
                onChange={handleSelectChange}>
                  <option value="">종류</option>
                  <option value="강아지">강아지</option>
                  <option value="고양이">고양이</option>
                </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">나이</p>
              <select id="preferredSize" className="text-lg border bg-gray-50 border-mainColor" value={userInfo.preferredSize}
                onChange={handleSelectChange}>
                <option value="">크기</option>
                <option value="소형">소형</option>
                <option value="중형">중형</option>
                <option value="대형">대형</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">성격</p>
              <select id="preferredPersonality" className="text-lg border bg-gray-50 border-mainColor" value={userInfo.preferredPersonality}
                onChange={handleSelectChange}>
                <option value="">성격</option>
                <option value="얌전함">얌전함</option>
                <option value="활발함">활발함</option>
                <option value="사나움">사나움</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">활동량</p>
              <select id="preferredExerciseLevel" className="text-lg border bg-gray-50 border-mainColor" value={userInfo.preferredExerciseLevel}
                onChange={handleSelectChange}>
                <option value="">적음 1 ~ 많음 5</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </section>
        <section className="flex gap-24 mt-8">
          <button type="submit" className="px-4 py-2 text-lg text-mainColor" onClick={editSubmit}>등록</button>
          <button type="button" className="px-4 py-2 text-lg text-cancelColor" onClick={cancel}>취소</button>
        </section>
      </form>
    </>
  );
};

export default PreferPage;
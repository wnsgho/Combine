import React, { useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface UserInfo {
  preferSpecies: string;
  preferredSize: string;
  preferredPersonality: string;
  preferredExerciseLevel: number;
}

const PreferPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용


  const [userInfo, setUserInfo] = useState({
    preferSpecies: "",
    preferredSize: "",
    preferredPersonality: "",
    preferredExerciseLevel: 0,
  })

  // 정보 수정 제출

  const handleEditSubmit = async (): Promise<void> => {
    if (!userInfo) return;
  
  
    try {
      await axios.put(`/api/v1/users/{Id}`, userInfo);
      alert('정보가 수정되었습니다.');
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      <Header />
      <form className="flex flex-col items-center">
        <section className="flex flex-col w-full max-w-lg gap-20 mt-8">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-mainColor">선호동물</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-3/4">
                <p className="text-xl font-bold text-mainColor">종류</p>
                <select id="species" className="text-lg border bg-gray-50 border-mainColor ">
                  <option selected>종류</option>
                  <option value="dog">강아지</option>
                  <option value="cat">고양이</option>
                </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">나이</p>
              <select id="old" className="text-lg border bg-gray-50 border-mainColor ">
                <option selected>크기</option>
                <option value="young">소형</option>
                <option value="middleAge">중형</option>
                <option value="oldAge">대형</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">성격</p>
              <select id="personality" className="text-lg border bg-gray-50 border-mainColor ">
                <option selected>성격</option>
                <option value="good">얌전함</option>
                <option value="activity">활발함</option>
                <option value="ferocity">사나움</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-xl font-bold text-mainColor">활동량</p>
              <select id="personality" className="text-lg border bg-gray-50 border-mainColor">
                <option selected>적음 1 ~ 많음 5</option>
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
          <button className="px-4 py-2 text-lg text-mainColor" onClick={handleEditSubmit}>등록</button>
          <button className="px-4 py-2 text-lg text-cancelColor" onClick={handleCancel}>취소</button>
        </section>
      </form>
    </>
  );
};

export default PreferPage;
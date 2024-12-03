import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";
import MyPageModal from '../../components/MyPageModal';
import Header from '../../components/Header';

import matching from '../../assets/image/matching.png';
import check from '../../assets/image/check.png';
import complete from '../../assets/image/complete.png';
import bar from '../../assets/image/bar.png';
import pu from '../../assets/image/pu.avif';

// 유저 정보 타입 정의
interface UserInfo {
  email: string;
  username: string;
  birthdate: string;
  phoneNumber: string;
  address: string;
  preferredSize: string;
  preferredPersonality: string;
  preferredExerciseLevel: number;
  password: string;
}

const MyPageUser: React.FC = () => {
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 오류 메시지 상태

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get<UserInfo>(`/api/v1/users/{Id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보를 불러오는 중 오류 발생:', error);
      }
    };

    fetchUserInfo();
  }, []);


  // 비밀번호 유효성 검증 함수
  const validatePassword = (password: string): string | null => {
    if (password.length < 8 || password.length > 12) {
      return '비밀번호는 8자 이상 12자 이하로 설정해야 합니다.';
    }
    if (!/[A-Z]/.test(password)) {
      return '비밀번호에 최소 1개의 대문자가 포함되어야 합니다.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return '비밀번호에 최소 1개의 특수문자가 포함되어야 합니다.';
    }
    return null;
  };
  

  // 입력값 변경 처리
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
  
    if (userInfo) { // 먼저 userInfo가 null이 아닌지 확인
      setUserInfo((prev) =>
        prev ? { ...prev, [name]: value } : prev
      );
  
      if (name === 'password') {
        const error = validatePassword(value);
        setPasswordError(error);
      }
    }
  };
  

  // 정보 수정 제출

  const handleEditSubmit = async (): Promise<void> => {
    if (!userInfo) return;

    // 비밀번호 검증
    if (passwordError) { // passwordError 상태로 검증
      alert(passwordError);
      return;
    }


    try {
      await axios.put(`/api/v1/users/{Id}`, userInfo);
      alert('정보가 수정되었습니다.');
      setEditModalOpen(false);
    } catch (error) {
      console.error('정보 수정 중 오류 발생:', error);
      alert('정보 수정에 실패했습니다.');
    }
  };

  // 회원 탈퇴 처리
  const handleDeleteAccount = async (): Promise<void> => {
    try {
      await axios.delete(`/api/v1/users/{Id}`);
      alert('회원탈퇴가 완료되었습니다.');
      setDeleteModalOpen(false);
      // 필요시 리다이렉트 로직 추가
    } catch (error) {
      console.error('회원탈퇴 중 오류 발생:', error);
      alert('회원탈퇴에 실패했습니다.');
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center w-full max-w-lg gap-4 mt-8">
          <div className="flex justify-center">
            <h3 className='text-2xl font-bold'>마이페이지</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">이름</p>
              <p className='text-lg'>{userInfo.username}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">주소</p>
              <p className='text-lg'>{userInfo.address}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">메일(아이디)</p>
              <p className='text-lg'>{userInfo.email}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">생년월일</p>
              <p className='text-lg'>{userInfo.birthdate}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">전화번호</p>
              <p className='text-lg'>{userInfo.phoneNumber}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">선호동물</p>
              <span className='text-lg'>{userInfo.preferredSize}</span>/
              <span className='text-lg'>{userInfo.preferredPersonality}</span>/
              <span className='text-lg'>{userInfo.preferredExerciseLevel}</span>
            </div>
          </div>
          <div className="flex gap-32 mt-10">
            <button
              className="text-lg text-mainColor"
              onClick={() => setEditModalOpen(true)}
            >
              정보수정
            </button>
            <button
              className="text-lg text-cancelColor"
              onClick={() => setDeleteModalOpen(true)}
            >
              회원탈퇴
            </button>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full max-w-lg gap-4 mt-8">
          <div>
            <h3 className="mb-10 text-xl font-bold">신청하신 입양 정보</h3>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <img src={matching} alt="" id="matching" />
              <label htmlFor="matching">매칭 신청</label>
            </div>
            <img src={bar} alt="" className="h-20 w-36" />
            <div className="flex flex-col items-center justify-center gap-3 opacity-30">
              <img src={check} alt="" id="check" />
              <label htmlFor="check">보호소 확인</label>
            </div>
            <img src={bar} alt="" className="h-20 w-36" />
            <div className="flex flex-col items-center justify-center gap-3 opacity-30">
              <img src={complete} alt="" id="complete" />
              <label htmlFor="complete">승인 완료</label>
            </div>
          </div>
        </section>
        <section className="relative flex flex-col items-center w-full max-w-lg my-20 overflow-hidden border border-solid rounded-lg border-mainColor">
          <div>
            <img src={pu} alt="" />
          </div>
          <div className="flex flex-col items-center gap-3 my-5">
            <h3 className="text-xl font-bold">댕구</h3>
            <p>강아지 / 암컷 / 중성화(o) / 0 ~ 3살 / 갈색 / 얌전함</p>
          </div>
        </section>

        {/* 수정 모달 */}
        <MyPageModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">정보 수정</h3>
          <div className="flex flex-col gap-4">
            <label>
              이름:
              <input
                type="text"
                name="username"
                value={userInfo?.username || ''} // userInfo가 null이면 빈 문자열 사용
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              비밀번호:
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </label>
            <label>
              생년월일:
              <input
                type="text"
                name="birthdate"
                value={userInfo.birthdate}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              전화번호:
              <input
                type="text"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              주소:
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              선호동물:
              <Link to='/prefer'>
                <button className="flex items-center w-full p-2 border rounded">
                  {userInfo.preferredSize} / {userInfo.preferredPersonality} / {userInfo.preferredExerciseLevel}
                  <GoChevronRight />
                </button>
              </Link>
            </label>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button className="text-mainColor" onClick={handleEditSubmit}>
              수정완료
            </button>
            <button className="text-cancelColor" onClick={() => setEditModalOpen(false)}>
              취소
            </button>
          </div>
        </MyPageModal>
        {/* 회원탈퇴 모달 */}
        <MyPageModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">정말로 탈퇴하시겠습니까?</h3>
          <div className="flex justify-end gap-4 mt-6">
            <button className="text-mainColor" onClick={handleDeleteAccount}>
              네
            </button>
            <button className="text-cancelColor" onClick={() => setDeleteModalOpen(false)}>
              아니오
            </button>
          </div>
        </MyPageModal>
      </div>
    </div>
  );
};

export default MyPageUser;


import React, { useEffect, useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import { Link, useParams } from 'react-router-dom';
import MyPageModal from '../../components/MyPageModal';

import Header from '../../components/Header';

import mainImage from '../../assets/image/mainimage.webp'; //임시사진
import pu from '../../assets/image/pu.avif'; //임시 사진
import axios from 'axios';

interface ShelterInfo {
  email: string;
  shelterName: string;
  phoneNumber: string;
  address: string;
  password: string;
}

const MyPageShelter: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 Id 추출
  const Id: number = parseInt(id || '1', 10); // 기본값으로 1 설정

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 오류 메시지 상태

  const [shelterInfo, setShelterInfo] = useState({
    shelterName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchShelterInfo = async () => {
      try {
        const response = await axios.get<ShelterInfo>(`/api/v1/shelters/${Id}`);
        setShelterInfo(response.data);
      } catch (error) {
        console.error('보호소 정보를 불러오는 중 오류 발생:', error);
      }
    };
    fetchShelterInfo();
  }, [Id]);

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
  
    if (shelterInfo) { // 먼저 userInfo가 null이 아닌지 확인
      setShelterInfo((prev) =>
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
    if (!shelterInfo) return;

    // 비밀번호 검증
    if (passwordError) { // passwordError 상태로 검증
      alert(passwordError);
      return;
    }


    try {
      await axios.put(`/api/v1/shelters/${Id}`, shelterInfo);
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
        await axios.delete(`/api/v1/shelters/${Id}`);
        alert('회원탈퇴가 완료되었습니다.');
        setDeleteModalOpen(false);
        // 필요시 리다이렉트 로직 추가
      } catch (error) {
        console.error('회원탈퇴 중 오류 발생:', error);
        alert('회원탈퇴에 실패했습니다.');
      }
    };
  
    if (!shelterInfo) {
      return <div>로딩 중...</div>;
    }
  

  return (
    <>
      <div className="relative">
        {/* 헤더 */}
        <Header />
        <div className="flex flex-col items-center">
          <section className="flex flex-col items-center w-full max-w-lg gap-4 m-8">
            <div className="flex justify-center">
              <h3 className='text-2xl font-bold'>마이페이지</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">단체이름</p>
                <p className='text-lg'>{shelterInfo.shelterName}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">주소</p>
                <button className='flex items-center justify-center text-lg'>{shelterInfo.address}<GoChevronRight /></button>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">단체 메일</p>
                <p className='text-lg'>{shelterInfo.email}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">전화번호</p>
                <p className='text-lg'>{shelterInfo.phoneNumber}</p>
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
            <div>
              <Link to='/adoption-list'>
                <button className="flex items-center justify-centert ext-lg text-mainColor">입양 신청 리스트 <GoChevronRight />
                </button>
              </Link>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center w-full max-w-lg gap-4 mt-8">
            <div>
              <h3 className="mb-10 text-xl font-bold">등록 입양 정보</h3>
            </div>
          </section>
          <section className='flex items-center justify-center m-8'>
            <div className='flex flex-wrap justify-center gap-10'>
              <div className='border border-solid rounded-lg min-w-40 max-w-48 min-h-72 max-h-72 border-mainColor'>
                <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
                <div className='m-3'>
                  <h3 className='font-bold'>댕구</h3>
                  <p className='mt-2'>개 / 암컷 / 중성화(o) /<br /> 2살 추정 / 갈색 #온순함</p>
                </div>
              </div>
              <div className='border border-solid rounded-lg min-w-40 max-w-48 min-h-72 max-h-72 border-mainColor'>
                <img src={pu} alt="#" className='w-full h-40 rounded-t-md'/>
                <div className='m-3'>
                  <h3 className='font-bold'>엄지</h3>
                  <p className='mt-2'>개 / 암컷 / 중성화(o) /<br /> 3살 추정 / 갈색 #사나움</p>
                </div>
              </div>
              <div className='border border-solid rounded-lg min-w-40 max-w-48 min-h-72 max-h-72 border-mainColor'>
                <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
                <div className='m-3'>
                  <h3 className='font-bold'>밍이</h3>
                  <p className='mt-2'>개 / 암컷 / 중성화(o) /<br /> 1살 추정 / 갈색 #온순함</p>
                </div>
              </div>
              <div className='border border-solid rounded-lg min-w-40 max-w-48 min-h-72 max-h-72 border-mainColor'>
                <img src={pu} alt="#" className='w-full h-40 rounded-t-md'/>
                <div className='m-3'>
                  <h3 className='font-bold'>루미</h3>
                  <p className='mt-2'>개 / 수컷 / 중성화(o) /<br /> 4살 추정 / 흰색 #온순함</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 정보수정 모달 */}
        <MyPageModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">정보 수정</h3>
          <div className="flex flex-col gap-4">
            <label>
              단체이름:
              <input
                type="text"
                name="name"
                value={shelterInfo.shelterName}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              주소:
              <Link to='/shelter-address'>
                <button className="flex items-center w-full p-2 bg-white border rounded;">
                  {shelterInfo.address}
                  <GoChevronRight />
                </button>
              </Link>
            </label>
            <label>
              전화번호:
              <input
                type="text"
                name="phone"
                value={shelterInfo.phoneNumber}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
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
    </>
  );
};

export default MyPageShelter;
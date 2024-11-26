import React, { useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import MyPageModal from '../../components/MyPageModal';

import Header from '../../components/Header';

import mainImage from '../../assets/image/mainimage.webp'; //임시사진
import pu from '../../assets/image/pu.avif'; //임시 사진

const MyPageShelter = () => {

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '펫케어',
    address: '서울 구로구',
    email: 'aaa@naver.com',
    phone: '010-1111-1111',
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    alert('정보가 수정되었습니다.');
    setEditModalOpen(false);
  };

  const handleDeleteAccount = () => {
    alert('회원탈퇴가 완료되었습니다.');
    setDeleteModalOpen(false);
  };

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
                <p className='text-lg'>{userInfo.name}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">주소</p>
                <button className='flex items-center justify-center text-lg'>{userInfo.address}<GoChevronRight /></button>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">단체 메일</p>
                <p className='text-lg'>{userInfo.email}</p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-xl font-bold text-mainColor">전화번호</p>
                <p className='text-lg'>{userInfo.phone}</p>
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
                value={userInfo.name}
                onChange={handleEditChange}
                className="block w-full p-2 border rounded"
              />
            </label>
            <label>
              주소:
              <Link to='prefer'>
                <button className="flex items-center w-full p-2 bg-white border rounded;">
                  {userInfo.address}
                  <GoChevronRight />
                </button>
              </Link>
            </label>
            <label>
              전화번호:
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
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
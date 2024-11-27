import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";
import MyPageModal from '../../components/MyPageModal';

import Header from '../../components/Header';

import matching from '../../assets/image/matching.png';
import check from '../../assets/image/check.png';
import complete from '../../assets/image/complete.png';
import bar from '../../assets/image/bar.png'; 
import pu from '../../assets/image/pu.avif'; // 임시 이미지 파일


const MyPageUser = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: '김임시',
    address: '서울 구로구',
    email: 'aaa@naver.com',
    birthdate: '1994.01.01',
    phone: '010-1111-1111',
    prefer: '강아지 / 0 ~ 3살 / 얌전함 / 3 / 아파트 / 산책 가능',
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
              <p className='text-lg'>{userInfo.name}</p>
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
              <p className='text-lg'>{userInfo.phone}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">선호동물</p>
              <p className='text-lg'>{userInfo.prefer}</p>
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
      </div>

      {/* 정보수정 모달 */}
      <MyPageModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h3 className="mb-4 text-lg font-bold">정보 수정</h3>
        <div className="flex flex-col gap-4">
          <label>
            이름:
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
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleEditChange}
              className="block w-full p-2 border rounded"
            />
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
              name="phone"
              value={userInfo.phone}
              onChange={handleEditChange}
              className="block w-full p-2 border rounded"
            />
          </label>
          <label>
            선호동물:
            <Link to='/prefer'>
              <button className="flex items-center w-full p-2 border rounded">
                {userInfo.prefer}
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
  );
};

export default MyPageUser;


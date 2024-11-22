import React, { useState } from 'react';
import matching from '../../assets/image/matching.png';
import check from '../../assets/image/check.png';
import complete from '../../assets/image/complete.png';
import bar from '../../assets/image/bar.png';
import pu from '../../assets/image/pu.avif'; // 임시 사진 데이터

const MyPageUser = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "김임시",
    address: "서울 구로구",
    birthdate: "1994.01.01",
    phone: "010-1111-1111",
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    alert("정보가 수정되었습니다.");
    setEditModalOpen(false);
  };

  const handleDeleteAccount = () => {
    alert("회원탈퇴가 완료되었습니다.");
    setDeleteModalOpen(false);
  };

  return (
    <div className="relative">
      {/* 흐림 처리 */}
      {(isEditModalOpen || isDeleteModalOpen) && (
        <div className="fixed inset-0 z-40 bg-black backdrop-blur-sm bg-opacity-30"></div>
      )}

      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center w-full max-w-lg gap-4 mt-8">
          <div className="flex justify-center">
            <h3>마이페이지</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-mainColor">이름</p>
              <p>{userInfo.name}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-mainColor">주소</p>
              <p>{userInfo.address}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-mainColor">생년월일</p>
              <p>{userInfo.birthdate}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-mainColor">전화번호</p>
              <p>{userInfo.phone}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg font-bold text-mainColor">선호동물</p>
              <p>강아지 / 0 ~ 3살 / 얌전함 / 3 / 아파트 / 산책 가능</p>
            </div>
          </div>
          <div className="flex gap-32 mt-10">
            <button
              className="text-mainColor"
              onClick={() => setEditModalOpen(true)}
            >
              정보수정
            </button>
            <button
              className="text-cancelColor"
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
            <img src={bar} alt="" className="w-36" />
            <div className="flex flex-col items-center justify-center gap-3">
              <img src={check} alt="" id="check" />
              <label htmlFor="check">보호소 확인</label>
            </div>
            <img src={bar} alt="" className="w-36" />
            <div className="flex flex-col items-center justify-center gap-3">
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
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
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
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="text-mainColor" onClick={handleEditSubmit}>
                수정완료
              </button>
              <button
                className="text-cancelColor"
                onClick={() => setEditModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 모달 */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-bold">정말로 탈퇴하시겠습니까?</h3>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="text-mainColor"
                onClick={handleDeleteAccount}
              >
                네
              </button>
              <button
                className="text-cancelColor"
                onClick={() => setDeleteModalOpen(false)}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageUser;



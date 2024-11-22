import React, { useState } from "react";

import { GoX, GoChevronRight } from "react-icons/go";


const DetailPage = () => {
  const [postImg, setPostImg] = useState<File[]>([]); // 업로드된 파일 리스트
  const [previewImg, setPreviewImg] = useState<string[]>([]); // 미리보기 이미지 URL 리스트

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files;

    if (fileArr) {
      const fileList = Array.from(fileArr); // File 객체 배열로 변환

      // 기존 이미지와 새로운 이미지를 합쳐 저장
      setPostImg((prev) => [...prev, ...fileList]);

      // 새로운 이미지를 읽어와 미리보기 URL 추가
      const fileUrlPromises = fileList.map(
        (file) =>
          new Promise<string>((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.result) {
                resolve(fileReader.result as string);
              }
            };
            fileReader.readAsDataURL(file);
          })
      );

      // 모든 파일 URL 생성 후 상태 업데이트
      Promise.all(fileUrlPromises).then((urls) => {
        setPreviewImg((prev) => [...prev, ...urls]);
      });
    }
  };

  return (
    <>
      <form className="flex flex-col items-center">
        <div>
          <h3 className="mb-10 text-mainColor">정보를 입력해주세요</h3>
        </div>
        <section className="flex flex-wrap gap-4">
          {/* 미리보기 이미지 렌더링 */}
          {previewImg.map((imgSrc, i) => (
            <div
              key={i}
              className="relative w-24 h-24 overflow-hidden border rounded"
            >
              <button
                type="button"
                onClick={() => {
                  // 이미지 제거 로직
                  setPreviewImg((prev) => prev.filter((_, index) => index !== i));
                  setPostImg((prev) => prev.filter((_, index) => index !== i));
                }}
                className="absolute p-1 bg-white rounded-full top-1 right-1"
              >
                <GoX />
              </button>
              <img
                src={imgSrc}
                alt={`업로드된 이미지 ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {/* 업로드 가능한 경우 업로드 버튼 표시 */}
          {postImg.length < 5 && (
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center w-24 h-24 border border-dashed rounded cursor-pointer"
            >
              <span>+</span>
            </label>
          )}

          {/* 파일 업로드 입력 */}
          <input
            id="fileUpload"
            type="file"
            onChange={saveImgFile}
            accept="image/*"
            multiple
            className="hidden"
          />
        </section>
        <section className="mt-20">
          <div className="flex flex-col flex-wrap gap-3">
            <div className="flex items-center justify-between">
              <label htmlFor="species">종류</label>
              <select id="species" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>종류</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="old">연령</label>
              <select id="old" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>연령</option>
                <option value="young">0~3살</option>
                <option value="middleAge">4~6살</option>
                <option value="oldAge">7~10살</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="gender">성별</label>
              <select id="gender" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>성별</option>
                <option value="cock">수컷</option>
                <option value="female">암컷</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="reason">보호소로 오게 된 이유</label>
              <input type="text" id="reason" placeholder="예) 유기, 보호자 병환" className="w-36"/>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="inoculation">접종 유무</label>
              <select id="inoculation" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>접종유무</option>
                <option value="1">1차</option>
                <option value="2">2차</option>
                <option value="3">3차</option>
                <option value="4">4차</option>
                <option value="5">5차</option>
                <option value="6">6차</option>
                <option value="no">미접종</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="neutering">중성화 유무</label>
              <select id="neutering" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>중성화유무</option>
                <option value="yes">완료</option>
                <option value="no">미완료</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="personality">성격</label>
              <select id="personality" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>성격</option>
                <option value="good">얌전함</option>
                <option value="activity">활발함</option>
                <option value="ferocity">사나움</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="activityLevel">활동량</label>
              <select id="activityLevel" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>적음 1 ~ 많음 5</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="size">크기</label>
              <select id="size" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>크기</option>
                <option value="small">소형</option>
                <option value="middle">중형</option>
                <option value="big">대형</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="home">맡겨지기 전 가정환경</label>
              <input type="text" id="home" placeholder="예) 임시보호, 사육장" className="w-36"/>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="protect">보호기관</label>
              <button id="protect" className="flex items-center justify-center">펫케어 <GoChevronRight /></button>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="add">추가 정보(선택사항)</label>
              <input type="text" id="add" placeholder="동물 추가정보 작성" className="w-36"/>
            </div>
          </div>
        </section>
        <div className="flex gap-32 mt-20">
          <button className="text-mainColor">등록</button>
          <button className="text-cancelColor">취소</button>
        </div>
      </form>
    </>
  );
};

export default DetailPage;


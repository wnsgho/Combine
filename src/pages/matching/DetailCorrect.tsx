import React, { useState } from 'react';

import { GoX, GoChevronRight } from "react-icons/go";
import Header from '../../components/Header';

const DetailCorrect = () => {

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
      <Header />
      <div className="flex flex-col items-center mt-10">
        <section className="flex flex-wrap gap-8">
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
      <section className="flex flex-col w-full max-w-lg gap-8 mt-8">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-mainColor">댕구</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">종류</p>
              <select id="species" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>종류</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
              </select>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">나이</p>
              <select id="old" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>연령</option>
                <option value="young">0~3살</option>
                <option value="middleAge">4~6살</option>
                <option value="oldAge">7~10살</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">성별</p>
              <select id="gender" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>성별</option>
                <option value="cock">수컷</option>
                <option value="female">암컷</option>
              </select>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">접종 유무</p>
              <select id="inoculation" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">중성화 유무</p>
              <select id="neutering" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>중성화유무</option>
                <option value="yes">완료</option>
                <option value="no">미완료</option>
              </select>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">성격</p>
              <select id="personality" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>성격</option>
                <option value="good">얌전함</option>
                <option value="activity">활발함</option>
                <option value="ferocity">사나움</option>
              </select>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">활동량</p>
              <select id="personality" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>적음 1 ~ 많음 5</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">보호소로 오게 된 이유</p>
              <input type="text" id="reason" placeholder="예) 유기, 보호자 병환" className="w-40 text-lg"/>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-full">
              <p className="text-xl font-bold text-mainColor">맡겨지기 전 가정환경</p>
              <input type="text" id="home" placeholder="예) 임시보호, 사육장" className="w-40 text-lg"/>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-mainColor">보호기관</p>
            <button className="flex items-center gap-1 text-lg">
              펫케어 <GoChevronRight />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-mainColor">추가정보</p>
            <input type="text" id="add" placeholder="동물 추가정보 작성" className="w-40 text-lg"/>
          </div>
        </section>
        <section className="flex gap-24 my-8">
          <button className="px-4 py-2 text-lg hover:bg-gray-500 text-cancelColor">취소</button>
          <button className="px-4 py-2 text-lg hover:bg-blue-600 text-mainColor">완료</button>
        </section>
      </div>
    </>
  );
};

export default DetailCorrect;
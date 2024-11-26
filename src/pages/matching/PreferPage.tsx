import React from 'react';

const PreferPage = () => {
  return (
    <>
      <form className="flex flex-col items-center">
        <section className="flex flex-col w-full max-w-lg gap-20 mt-8">
          <div className="flex justify-center">
            <h3 className="text-2xl font-bold text-mainColor">선호동물</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex justify-between w-3/4">
                <p className="text-lg font-bold text-mainColor">종류</p>
                <select id="species" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>종류</option>
                  <option value="dog">강아지</option>
                  <option value="cat">고양이</option>
                </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-lg font-bold text-mainColor">나이</p>
              <select id="old" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>연령</option>
                <option value="young">0~3살</option>
                <option value="middleAge">4~6살</option>
                <option value="oldAge">7~10살</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-lg font-bold text-mainColor">성격</p>
              <select id="personality" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>성격</option>
                <option value="good">얌전함</option>
                <option value="activity">활발함</option>
                <option value="ferocity">사나움</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-lg font-bold text-mainColor">활동량</p>
              <select id="personality" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>적음 1 ~ 많음 5</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-lg font-bold text-mainColor">거주지 형태</p>
              <select id="dwelling" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>거주지 형태</option>
                <option value="APT">아파트</option>
                <option value="villa">빌라</option>
                <option value="house">단독주택</option>
                <option value="etc">기타</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4">
              <p className="text-lg font-bold text-mainColor">산책 가능 여부</p>
              <select id="walk" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>산책 가능 여부</option>
                <option value="yes">가능</option>
                <option value="no">불가능</option>
              </select>
            </div>
          </div>
        </section>
        <section className="flex gap-24 mt-8">
          <button className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500 text-mainColor ">등록</button>
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-cancelColor">취소</button>
        </section>
      </form>
    </>
  );
};

export default PreferPage;
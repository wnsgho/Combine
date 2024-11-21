import React from 'react';

import mainImage from '../../assets/image/mainimage.webp'
import { GoChevronRight } from "react-icons/go";

const MatchingPage = () => {
  return (
    <>
      <div className='max-w-screen'>
        <section>
          <div>
            <p className='px-20 text-3xl text-mainColor'>선택 옵션</p>
          </div>
        </section>
        <section className='flex flex-wrap items-center justify-center mt-10'>
          <form className="flex flex-wrap max-w-xl gap-5 mx-3">
            <select id="species" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-3xl focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>종류</option>
              <option value="dog">강아지</option>
              <option value="cat">고양이</option>
            </select>
            <select id="old" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-3xl focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>연령</option>
              <option value="young">0~3살</option>
              <option value="middleAge">4~6살</option>
              <option value="oldAge">7~10살</option>
            </select>
            <select id="species" className="bg-gray-50 border-2 border-mainColor text-gray-900 text-3xl focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>색상</option>
              <option value="black">검정색</option>
              <option value="white">흰색</option>
              <option value="brown">갈색</option>
            </select>
          </form>     
          <button className='p-3 text-3xl border-2 border-solid rounded-md border-mainColor'>검색</button>
        </section>
        <section className='mt-10'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-5 text-4xl'>매칭이 어려우신가요?</h3>
            <button className='flex items-center justify-center text-mainColor'>AI매칭 바로가기<GoChevronRight /></button>
          </div>
        </section>
        <section className='flex items-center justify-center m-20'>
          <div className='flex flex-wrap justify-center gap-10'>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3 className='font-bold'>댕구</h3>
              <p>개 / 암컷 / 중성화(o) / 2살 추정 / 갈색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>엄지</h3>
              <p>개 / 암컷 / 중성화(o) / 3살 추정 / 갈색 #사나움</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>밍이</h3>
              <p>개 / 암컷 / 중성화(o) / 1살 추정 / 갈색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
            <div className='border border-solid rounded-lg min-w-40 max-w-52 min-h-60 max-h-60 border-mainColor'>
              <img src={mainImage} alt="#" className='w-full h-40 rounded-t-md'/>
              <h3>루미</h3>
              <p>개 / 수컷 / 중성화(o) / 4살 추정 / 흰색 #온순함</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MatchingPage;
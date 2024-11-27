import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

import mainImage from '../../assets/image/mainimage.webp'; //임시사진
import pu from '../../assets/image/pu.avif'; //임시 사진
import { GoChevronRight } from "react-icons/go";



const MatchingPage = () => {

  const shelter = true // (임시) 보호소로 로그인시
  
  return (
    <>
      <div className='max-w-screen'>
        <Header />
        <section className='mt-20'>
          <div className='flex justify-evenly'>
            <p className='text-3xl text-mainColor'>선택 옵션</p>
            <Link to="/detailadd">
            {shelter ? <button className='text-2xl text-cancelColor'>등록</button> : null}
            </Link>
          </div>
        </section>
        <section className='flex flex-wrap items-center justify-center mt-10'>
          <form className="flex flex-wrap max-w-xl gap-20 mx-10">
            <select id="species" className="text-3xl border-2 border-mainColor">
              <option selected>종류</option>
              <option value="dog">강아지</option>
              <option value="cat">고양이</option>
            </select>
            <select id="old" className="text-3xl border-2 border-mainColor">
              <option selected>연령</option>
              <option value="young">0~3살</option>
              <option value="middleAge">4~6살</option>
              <option value="oldAge">7~10살</option>
            </select>
            <select id="species" className="text-3xl border-2 border-mainColor">
              <option selected>색상</option>
              <option value="black">검정색</option>
              <option value="white">흰색</option>
              <option value="brown">갈색</option>
            </select>
          </form>     
          <button className='w-32 p-3 text-3xl border-2 border-solid rounded-md border-mainColor'>검색</button>
        </section>
        <section className='mt-20'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-5 text-4xl font-bold'>매칭이 어려우신가요?</h3>
            <button className='flex items-center justify-center text-lg text-mainColor'>AI매칭 바로가기<GoChevronRight /></button>
          </div>
        </section>
        <section className='flex items-center justify-center m-20'>
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
    </>
  );
};

export default MatchingPage;
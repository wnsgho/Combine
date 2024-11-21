import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { NavLink } from "react-router-dom";
const Announcementpost = () => {
  return (
    <div className="flex flex-col items-center scrollbar-hide">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="relative">
          <div className="bg-slate-400"></div>
          <img src={Walk} alt="walk" className="w-full h-[400px] opacity-85 object-cover object-bottom" />
          <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
            <div className="text-[50px] pb-2">공지사항</div>
            <div className="text-[25px]">다양한 정보를 제공하고 있습니다.</div>
          </div>
        </div>
        <GuideNavigation />
        <div className="max-w-[1000px] mx-auto">
          <div className="text-[35px] text-left border-b-[1px] border-black pb-5">
            [시립마포노인종합복지관] 취업사관학교 시즌2 요양보호직 참여자 모집
          </div>
          <div className="text-lfet  pt-4 pb-20">
            <span className="font-bold text-blue-600">지원</span> | 2024-11-19 | 조회수 79
          </div>
          <div className="text-[20px] py-20">
            [취업사관학교 시즌2]
            <br />
            - 만 55~69세 요양보호사직20명 
            <br />
            - 모집일정 : ~ 마감 시 까지
            <br />
            - 지원자격 : 요양보호사자격증 취득자
            <br />
            - 지원내용 : 요양보호사 직무교육(시니어인턴십)
            <br />
            연락처: 김호은 사회복지사(02-6360-0516)
          </div>
          <NavLink to="/guide/announcement">
            <button
              className="float-right  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]">
              목록으로
            </button>
          </NavLink>

          <button
            className="float-right mr-8  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]">
            삭제하기
          </button>

          <button
            className="float-right mr-8 mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcementpost;

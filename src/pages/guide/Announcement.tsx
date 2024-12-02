import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Announcement {
  id:number;
  title:string;
  content:string;
  createdAt:string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(()=>{
    const fetchAnnouncements = async() => {
      try{
        const response = await axios.get("/announcements");
        setAnnouncements(response.data)
      }catch(error){
        console.error("조회를 실패했습니다.", error)
      }
    }
    fetchAnnouncements()
  },[])

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className=" relative">
            <div className="bg-slate-400"></div>
            <img src={Walk} alt="walk" className="w-[1200px] h-[400px] opacity-85 object-cover object-bottom" />
            <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
          <div className="text-[50px] pb-2">공지사항</div>
          <div className="text-[25px]">다양한 정보를 제공하고 있습니다.</div>
          </div>
        </div>
        <GuideNavigation/>
        <table>
          <thead>
            <tr className="text-[28px]">
              <th className="px-8 pb-5">구분</th>
              <th className="w-[920px] px-4 pb-5 text-left pl-[376px]">제목</th>
              <th className="px-8 pb-5">작성일</th>
            </tr>
          </thead>
          <tbody>
            {/* {announcements.map((announcement)=>(
              <tr className="text-[20px]" key={announcement.id}>
              <th className="text-red-600">공지</th>
              <NavLink to="/guide/announcement/{announcement.id}" className="float-left px-4 py-3 font-normal">{announcement.title}</NavLink>
              <th className="font-normal">{announcement.createdAt}</th>
            </tr>
            ))} */}
            <tr className="text-[20px]">
              <th className="text-red-600">공지</th>
              <NavLink to="/guide/announcement/postId" className="float-left px-7 py-3 font-normal">분양 서비스 시작</NavLink>
              <th className="font-normal">2024-11-21</th>
            </tr>
            
            
          </tbody>
        </table>
        <NavLink to="/guide/announcement/create">
            <button
              className="float-right mr-5 my-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]">
              작성하기
            </button>
          </NavLink>
      </div>
    </div>
  );
};

export default Announcement;

import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FAQ from "../../components/FAQ";
import Chat from "../../components/Chat";

interface Announcement {
  id:number;
  title:string;
  content:string;
  category:string;
  createdAt:string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const navigate = useNavigate()

  //게시글 목록 불러오기
  useEffect(()=>{
    const fetchAnnouncements = async() => {
      try{
        const response = await axios.get("http://15.164.103.160:8080/api/v1/announcements");
        setAnnouncements(response.data)
      }catch(error){
        console.error("조회를 실패했습니다.", error)
      }
    }
    fetchAnnouncements()
  },[])

  return (
    <div className="flex flex-col justify-center items-center ">
      <FAQ/>
      <Chat/>
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
              <tr className="text-[20px] cursor-pointer" key={announcement.id}>
              <th className="text-red-600">{announcement.category}</th>
              <th onClick={()=> navigate(`/guide/announcement/announcement.id`)} className="float-left px-4 py-3 font-normal">{announcement.title}</th>
              <th className="font-normal">{announcement.createdAt}</th>
            </tr>
            ))} */}
            <tr className="text-[20px] cursor-pointer">
              <th className="text-red-600 ">공지</th>
              <th onClick={() => navigate("/guide/announcement/postId")} className="float-left px-7 py-3 font-normal">분양 서비스 시작</th>
              <th className="font-normal">2024-11-21</th>
            </tr>
            
            
          </tbody>
        </table>
            <div
              className="float-right mr-5 my-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
              onClick={() => navigate("/guide/announcement/create")}
              >
              작성하기
            </div>
      </div>
    </div>
  );
};

export default Announcement;

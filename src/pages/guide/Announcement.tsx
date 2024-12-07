import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FAQ from "../../components/FAQ";
import Chat from "../../components/Chat";
import Header from "../../components/Header";
import useUserStore from "../../store/store";

interface Announcement {
  id:number;
  title:string;
  content:string;
  category:string;
  viewCount:number;
  created_at:string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const navigate = useNavigate()
  const role = useUserStore((state) => state.role)


  //공지사항 목록 조회
  useEffect(() => {
    const fetchAnnouncements = async() => {
      try {
        const response = await axios.get("http://15.164.103.160:8080/api/v1/announcements");
        
        if (response.data && response.data.content) {
          setAnnouncements(response.data.content);
        }
      } catch(error) {
        console.error("조회를 실패했습니다.", error);
      }
    }
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <Header/>
      <FAQ/>
      <Chat/>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="relative">
            <div className="bg-slate-400"></div>
            <div className="bg-[#3c2a13]/90 h-[300px]"></div>
            <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
              <div className="text-[50px] pb-2 text-white">공지사항</div>
              <div className="text-[25px] text-white">다양한 정보를 제공하고 있습니다.</div>
            </div>
          </div>
          <GuideNavigation/>
          <div className="max-w-[1200px] mx-auto px-4">
            <table className="mb-40 w-full border-t border-b border-gray-300 ">
              <thead>
                <tr className="text-[28px] border-b border-gray-300">
                  <th className="px-8 py-5">구분</th>
                  <th className="w-[748px] px-4 py-5 text-left pl-[376px]">제목</th>
                  <th className="px-8 py-5">조회수</th>
                  <th className="px-8 py-5">작성일</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement)=>(
                  <tr className="text-[20px] border-b border-gray-300" key={announcement.id}>
                    <th className={`${announcement.category === "NOTICE" ? "text-red-500" : "text-blue-500"}`}>
                      {announcement.category === "NOTICE" ? "공지" : "지원"}
                    </th>
                    <th onClick={() => navigate(`/guide/announcement/${announcement.id}`)} className="float-left px-4 py-4 font-normal hover:text-blue-500 cursor-pointer">
                      {announcement.title}
                    </th>
                    <th className="font-normal">{announcement.viewCount}</th>
                    <th className="font-normal">{announcement.created_at}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            {role === "ROLE_ADMIN" && (
              <div className="flex justify-end mb-20">
                <div
                  className="bg-[#3c2a13]/90 p-4 text-white font-bold text-[20px] cursor-pointer rounded-xl hover:scale-105 transition-transform"
                  onClick={() => navigate("/guide/announcement/create")}
                >
                  작성하기
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;

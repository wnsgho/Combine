import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import useUserStore from "../../store/store";

interface AnnouncementPost {
  id: number;
  title: string;
  content: string;
  category: string;
  viewCount : number;
  created_at: string;
}

const Announcementpost = () => {
  const [announcementPost, setAnnouncementPost] = useState<AnnouncementPost | null>(null);
  const navigate = useNavigate();
  const { id } = useParams()
  const [userId, setUserId] = useState<number | null>(null)
  const role = useUserStore((state)=> state.role)

  //조회
  useEffect(() => {
    const fetchAnnouncementPost = async () => {
      try {
        const response = await axios.get(`http://15.164.103.160:8080/api/v1/announcements/${id}`);
        setAnnouncementPost(response.data);
      } catch (error) {
        console.error("불러오기 실패", error);
        navigate("/guide/announcement")
      }
    };
    if(id){
      fetchAnnouncementPost();
    }
  }, [id]);

  //삭제
  const handleDelete = async () => {
    if(!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;
    
    try{
      const token = localStorage.getItem("accessToken")
      await axios.delete(`http://15.164.103.160:8080/api/v1/announcements/${id}?userId=${userId}`,
        {
        headers: {
          Authorization : token,
          'Content-Type': 'application/json',
        }
      }

      )
      alert("삭제되었습니다.")
      navigate("/guide/announcement")
    }catch(error){
      console.error("삭제 실패", error)
      alert("삭제에 실패하였습니다.")
    }
  }

  return (
    <div>
    <Header/>
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
        {announcementPost && ( 
            <div className="max-w-[1000px] mx-auto" key={announcementPost.id}>
              <div className="text-[35px] text-left border-b-[1px] border-black pb-5">{announcementPost.title}</div>
              <div className="text-left pt-4 pb-20">
              <span className={announcementPost.category === "NOTICE" ? ("text-red-500") : ("text-blue-500")}>{announcementPost.category === "NOTICE" ? ("공지") : ("지원")}</span> | {announcementPost.created_at} | {announcementPost.viewCount}
              </div>
              <div className="text-[20px] pb-20" dangerouslySetInnerHTML={{ __html: announcementPost.content }} />
              <div
                className="float-right mb-20 bg-[#AB654B]/90 p-4 text-white font-bold text-[20px] cursor-pointer"
                onClick={() => navigate("/guide/announcement")}>
                목록으로
              </div>

              {role === "ROLE_ADMIN" && (
                <>
                <div
                className="float-right mr-8 mb-20 bg-[#AB654B]/90 p-4 text-white font-bold text-[20px] cursor-pointer"
                onClick={handleDelete}>
                삭제하기
              </div>

              <div
                className="float-right mr-8 mb-20 bg-[#AB654B]/90 p-4 text-white font-bold text-[20px] cursor-pointer"
                onClick={() => navigate(`/guide/announcement/edit/${announcementPost.id}`)}>
                수정하기
              </div>
              </>
              )}
            </div>
          )}
      </div>
    </div>
    </div>
  );
};

export default Announcementpost;

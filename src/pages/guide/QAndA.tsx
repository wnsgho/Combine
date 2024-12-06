import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import useUserStore from "../../store/store";

interface Comment {
  id: number;
  content: string;
  adminName: string;
  created_at: string;
}

interface QnA {
  id:number;
  title:string;
  content:string;
  writerName:string;
  viewCount:number;
  created_at:string;
  comments: Comment[];
}

const QAndA = () => {
  const [QnA, setQnA] = useState<QnA[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQnA = async () => {
      try{
        const response = await axios.get("http://15.164.103.160:8080/api/v1/inquiries")
        if (response.data && response.data.content) {
          setQnA(response.data.content);
        }
      }catch(error){
        console.error("호출 실패", error)
      }
    }
    fetchQnA()
  },[])

  return (
    <div>
      <Header/>
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[1200px] mx-auto ">
        <div className=" relative">
          <div className="bg-slate-400"></div>
          <img src={Walk} alt="walk" className="w-[1200px] h-[400px] opacity-85 object-cover object-bottom" />
          <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
            <div className="text-[50px] pb-2">문의 게시판</div>
            <div className="text-[25px]">무엇이든 물어보세요.</div>
          </div>
        </div>
        <GuideNavigation />
        <table>
          <thead>
            <tr className="text-[28px] ">
              <th className="px-8 pb-5  text-center">번호</th>
              <th className="w-[588px] px-4 pb-5">제목</th>
              <th className="px-10 pb-5  text-center">조회수</th>
              <th className="px-10 pb-5  text-center">작성자</th>
              <th className="px-10 pb-5  text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {QnA.map((item, num) => (
              <tr className="text-[20px] " key={item.id}
              >  
              <td className=" text-center">{QnA.length - num}</td>
              <td className="text-left px-4 py-5 font-normal max-w-[508px] whitespace-nowrap overflow-hidden truncate cursor-pointer "
             onClick={()=> navigate(`/guide/qna/${item.id}`)}>
                  {item.title}
                </td>
              <td className="font-norma text-center">{item.viewCount}</td>
              <td className="font-norma text-center">{item.writerName}</td>
              
              <td className="font-normal text-center">{item.created_at}</td>
            </tr>
            ))}
          </tbody>
        </table>
            <div
              className="float-right mr-5 my-[86px] bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
              onClick={() => navigate("/guide/qna/create")}>
              작성하기
            </div>
          
      </div>
    </div>
    </div>
  );
};

export default QAndA;

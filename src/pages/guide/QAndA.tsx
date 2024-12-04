import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface QnA {
  id:number;
  title:string;
  content:string;
  userName:string;
  createdAt:string;
}

const QAndA = () => {
  const [QnA, setQnA] = useState<QnA[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQnA = async () => {
      try{
        const response = await axios.get("http://15.164.103.160:8080/api/v1/inquries")
        setQnA(response.data)
      }catch(error){
        console.error("호출 실패", error)
      }
    }
    fetchQnA()
  },[])

  return (
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
              <th className="w-[752px] px-4 pb-5">제목</th>
              <th className="px-10 pb-5  text-center">작성자</th>
              <th className="px-10 pb-5  text-center">작성일</th>
            </tr>
          </thead>
          <tbody>
            {/* {QnA.map((QnA) => (
              <tr className="text-[20px] cursor-pointer " key={QnA.id}>
              <td className=" text-center">{QnA.id}</td>
              <td className="text-left px-4 py-5 font-normal max-w-[588px] whitespace-nowrap overflow-hidden truncate">
              <td className="font-norma text-center">{QnA.userName}</td>
                <NavLink to="/guide/qna/{QnA.id}">
                  {QnA.title}
                </NavLink>
              </td>
              <td className="font-normal text-center">{QnA.createdAt}</td>
            </tr>
            ))} */}
            <tr className="text-[20px] cursor-pointer">
              <td className=" text-center">2</td>
              <td className="text-left px-4 py-5 font-normal max-w-[588px] whitespace-nowrap overflow-hidden truncate">
                <td onClick={() => navigate("/guide/qna/postId")}>
                  분양은 어떻게 진행되나요?분양은 어떻게 진행되나요?분양은 어떻게 진행되나요?분양은 어떻게 진행되나요?
                </td>
              </td>
              <td className="font-norma text-center">김*시</td>
              <td className="font-normal text-center">2024-11-21</td>
            </tr>
            <tr className="text-[20px] cursor-pointer">
              <td className=" text-center">1</td>
              <td
                onClick={() => navigate("/guide/qna/postId")}
                className="text-left px-4 py-3 font-normal max-w-[588px] whitespace-nowrap overflow-hidden truncate">
                분양은 어떻게 진행되나요?
              </td>
              <td className="font-norma text-center">김*시</td>
              <td className="font-normal text-center">2024-11-20</td>
            </tr>
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
  );
};

export default QAndA;

import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// {
//   "email": "text01@example.com",
//   "username": "test01",
//   "password": "1594",
//   "birthDate": "1990-01-01",
//   "phoneNumber": "010-1234-1234",
//   "address": "456 User Avenue, Example City",
//   "preferredSize": "Medium",
//   "preferredPersonality": "Friendly",
//   "preferredExerciseLevel": 2,
//   "userRole": "ROLE_USER"
//   }

interface QnApost {
  id:number;
  title:string;
  content:string;
  createdAt:string;
}

const QAandApost = () => {
  const [qnapost, setQnapost] = useState<QnApost[]>([])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    const fetchQnapost = async() => {
      try{
        const response = await axios.get(`/inquries/${id}`)
        setQnapost(response.data)
      }catch(error){
        console.error("불러오기 실패", error)
        navigate("/guide/qna")
      }
    }
    if(id){
      fetchQnapost()
    }
  },[id])

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
        {/* {qnapost.map((post)=>(
          <div className="max-w-[1000px] mx-auto" key={post.id}>
          <div className="text-[35px] text-left border-b-[1px] border-black pb-5">{post.title}</div>
          <div className="text-lfet  pt-4">
           {post.createdAt}
          </div>
          <div className="text-[20px] py-20">
            {post.content}
          </div>
            <button
              className="float-right  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]"
              onClick={() => navigate("/guide/qna")}>
              목록으로
            </button>
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
        ))} */}
        <div className="max-w-[1000px] mx-auto">
          <div className="text-[35px] text-left border-b-[1px] border-black pb-5">분양은 어떻게 진행되나요?</div>
          <div className="text-lfet  pt-4">
            <span className="font-bold">김 * 시</span> | 2024-11-19 | 조회수 79
          </div>
          <div className="text-[20px] py-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque natus delectus rerum nobis, temporibus at
            ducimus expedita laudantium. Consectetur minima at culpa distinctio non mollitia recusandae molestias
            assumenda cum dignissimos.
            <br />
          </div>
            <button
              className="float-right  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]"
              onClick={() => navigate("/guide/qna")}>
              목록으로
            </button>
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

export default QAandApost;

import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

interface QnApost {
  id: number;
  title: string;
  content: string;
  viewCount : number;
  writerName: string;
  created_at: string;
}

const QAandApost = () => {
  const [userId, setUserId] = useState(7);
  const [qnapost, setQnapost] = useState<QnApost | null>(null);
  const navigate = useNavigate();
  const { id, commentId } = useParams();
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const [edit, setEdit] = useState(false)
  const [editContent, setEditContent] = useState("")


  //조회
  useEffect(() => {
    const fetchQnapost = async () => {
      try {
        const response = await axios.get(`http://15.164.103.160:8080/api/v1/inquiries/${id}`);
        setQnapost(response.data);
      } catch (error) {
        console.error("불러오기 실패", error);
        navigate("/guide/qna");
      }
    };
    if (id) {
      fetchQnapost();
    }
  }, [id]);

  //삭제
  const handleDelete = async () => {
    if (!window.confirm("정말로 게시글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://15.164.103.160:8080/api/v1/inquries/${id}?userId=${userId}`);
      alert("삭제되었습니다.");
      navigate("/guide/qna");
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패하였습니다.");
    }
  };

  //답변 작성
  const handleReply = async () => {
    try{
      await axios.post(`http://15.164.103.160:8080/api/v1/inquries/${id}/comments`,{
        content,
      })
    }catch(error){
      console.error("답변 작성이 취소되었습니다.", error)
      setContent("")
      setReply(false)
    }
  }

  //답변 삭제
  const handleReplyDelete = async () => {
    if (!window.confirm("정말로 답변을 삭제하시겠습니까?")) return;

    try{
      await axios.delete(`http://15.164.103.160:8080/api/v1/inquries/${id}/comments/${commentId}`)
      alert("답변이 삭제되었습니다.")
      setReply(false)
    }catch(error){
      console.error("삭제 실패",error)
      alert("삭제에 실패하였습니다.")
    }
  }

  //답변 수정
  const handleReplyEdit = async () => {
    try{
      await axios.put(`http://15.164.103.160:8080/api/v1/inquries/${id}/comments/${commentId}`,{
        content
      })
      alert("수정 되었습니다.")
      setContent("")
    }catch(error){  
      console.error("수정 실패", error)
      alert("수정을 실패하였습니다.")
    }
  }

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
        { qnapost && (
          <div className="max-w-[1000px] mx-auto" key={qnapost.id}>
          <div className="text-[35px] text-left border-b-[1px] border-black pb-5">{qnapost.title}</div>
          <div className="text-lfet  pt-4">
          {qnapost.writerName} | {qnapost.created_at} | {qnapost.viewCount}
          </div>
          <div className="text-[20px] py-20">
          <div dangerouslySetInnerHTML={{ __html: qnapost.content }}/>
          <hr className="border-black border-1 my-20" />
             <div className="bg-gray-200 w-full h-auto p-5 rounded-lg">
              <div className="pb-10 font-bold">답변 문의</div>
              {edit ? (
                <>
                <textarea className="w-full h-80 p-3"
                value={editContent}
                onChange={(e)=>setContent(e.target.value)}/>
                <div className="pt-10">2024-12-04</div>
              <div className="flex gap-5 justify-end">
              <div className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={()=>setEdit(false)}>취소</div>
              <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReplyEdit}>수정</div>
              </div>
              </>
              ) : (
                <>
                <div>해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.</div>
                <div className="pt-10">2024-12-04</div>
              <div className="flex gap-5 justify-end">
              <div className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReplyDelete}>삭제</div>
              <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={()=> setEdit(true)}>수정</div>
              </div>
              </>
                )}
            </div>

           

            {reply && (
              <div className="bg-gray-200 w-full h-auto p-5 rounded-lg my-10">
                <div className="pb-5 font-bold">답변 작성</div>
                <div>
                  <textarea
                    className="w-full h-96 p-3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end pt-5">
                  <div
                    className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer"
                    onClick={() => setReply(false)}>
                    취소
                  </div>
                  <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReply}>작성</div>
                </div>
              </div>
            )}



          </div>

            <div
            className="float-right  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={() => navigate("/guide/qna")}>
            목록으로
          </div>
          <div
            className="float-right mr-8  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={handleDelete}>
            삭제하기
          </div>
          <div
            className="float-right mr-8 mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={() => navigate(`/guide/qna/edit`)}>
            수정하기
          </div>
          {!reply && (
            <div
              className="float-right mr-8 mb-20 bg-[#AB654B]
            /90 p-4 text-white font-bold text-[20px] cursor-pointer"
              onClick={() => setReply(!reply)}>
              답변하기
            </div>
          )}
        </div>
        )}

        {/* <div className="max-w-[1000px] mx-auto">
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
            <hr className="border-black border-1 my-10" />

            
            <div className="bg-gray-200 w-full h-auto p-5 rounded-lg">
              <div className="pb-10 font-bold">답변 문의</div>
              {edit ? (
                <>
                <textarea className="w-full h-80 p-3"
                value={editContent}
                onChange={(e)=>setContent(e.target.value)}/>
                <div className="pt-10">2024-12-04</div>
              <div className="flex gap-5 justify-end">
              <div className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={()=>setEdit(false)}>취소</div>
              <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReplyEdit}>수정</div>
              </div>
              </>
              ) : (
                <>
                <div>해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.해당 건은 저희가 해결 할 수 없습니다.</div>
                <div className="pt-10">2024-12-04</div>
              <div className="flex gap-5 justify-end">
              <div className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReplyDelete}>삭제</div>
              <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={()=> setEdit(true)}>수정</div>
              </div>
              </>
                )}
            </div>

           

            {reply && (
              <div className="bg-gray-200 w-full h-auto p-5 rounded-lg my-10">
                <div className="pb-5 font-bold">답변 작성</div>
                <div>
                  <textarea
                    className="w-full h-96 p-3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end pt-5">
                  <div
                    className="bg-red-400 px-5 py-3 rounded-md font-bold cursor-pointer"
                    onClick={() => setReply(false)}>
                    취소
                  </div>
                  <div className="bg-blue-400 px-5 py-3 rounded-md font-bold cursor-pointer" onClick={handleReply}>작성</div>
                </div>
              </div>
            )}

          </div>
          <div
            className="float-right  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={() => navigate("/guide/qna")}>
            목록으로
          </div>
          <div
            className="float-right mr-8  mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={handleDelete}>
            삭제하기
          </div>
          <div
            className="float-right mr-8 mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px] cursor-pointer"
            onClick={() => navigate(`/guide/qna/edit`)}>
            수정하기
          </div>
          {!reply && (
            <div
              className="float-right mr-8 mb-20 bg-[#AB654B]
            /90 p-4 text-white font-bold text-[20px] cursor-pointer"
              onClick={() => setReply(!reply)}>
              답변하기
            </div>
          )}
           */}
        </div>
      </div>
    </div>
  );
};

export default QAandApost;

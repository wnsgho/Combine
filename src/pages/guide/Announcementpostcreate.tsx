import GuideNavigation from "../../components/GuideNavigation";
import Walk from "../../../public/walk.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Announcementpostcreate = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/announcements', {
        title,
        content,
        createdAt: new Date().toISOString(),
      });
      
      if (response.status === 201) {
        navigate("/guide/announcement");
      }
    } catch (error) {
      console.error('공지사항 작성 실패:', error);
      alert('공지사항 작성에 실패했습니다.');
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image"
  ];

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[1200px] mx-auto ">
        <div className=" relative">
          <div className="bg-slate-400"></div>
          <img src={Walk} alt="walk" className="w-[1200px] h-[400px] opacity-85 object-cover object-bottom" />
          <div className="absolute inset-0 flex flex-col justify-center text-center font-bold">
            <div className="text-[50px] pb-2">공지사항</div>
            <div className="text-[25px]">다양한 정보를 제공하고 있습니다.</div>
          </div>
        </div>
        <GuideNavigation />
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-[#AB654B]/90 p-8 rounded-lg">
            <select className="mb-6 w-auto p-2 font-bold">
              <option value="notice">공지</option>
              <option value="support">지원</option>
            </select>
            <div className="mb-6">
              <input type="text" className="w-full p-3" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="h-[1000px] bg-white">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-[958px]"
                placeholder="내용을 입력하세요"
              />
            </div>
          </div>
          <div className="mt-7">
            <button
              className="float-right   mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]"
              onClick={handleSubmit}>
              작성하기
            </button>
              <button
                className="float-right mr-8 mb-20 bg-[#AB654B]
              /90 p-4 text-white font-bold text-[20px]"
              onClick={()=> navigate("/guide/announcement")}>
                취소
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcementpostcreate;

import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import FAQEdIt from "./FAQEdIt";
import axios from "axios";

//목록 전체를 가져와서 재귀방식으로 하는 방법으로 변경

interface TopFAQ {
  faqId: number;
  content: string | number;
  refFaqId: null | number;
}

const FAQ = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectFAQ, setSelectFAQ] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [topContent, setTopContent] = useState<TopFAQ[]>([]);
  const [refContent, setRefContent] = useState<TopFAQ[]>([]);
  const [parentId, setParentId] = useState<number | null>(null);

  //작성창 열기
  const handleEditClick = () => {
    setEdit(!edit);
  };

  //FAQ채팅 열기
  const handleClick = () => {
    setOpen(!open);
    setSelectFAQ(null);
  };

  //선택한 FAQ만 남기기 & 다시 누르면 전체목록 보이기
  const handleSelectFAQ = (FAQ: string, faqId: number) => {
    if (selectFAQ === FAQ) {
      setSelectFAQ(null);
      setParentId(null);
    } else {
      setSelectFAQ(FAQ);
      setParentId(faqId);
    }
  };

  //최상위 질문 불러오기
  useEffect(() => {
    const fetchTopFAQ = async () => {
      try {
        const response = await axios.get("http://15.164.103.160:8080/api/v1/faqs");
        setTopContent(response.data);
      } catch (error) {
        console.error("최상위 질문 불러오기 실패", error);
      }
    };
    fetchTopFAQ();
  }, []);

  //하위 질문 불러오기
useEffect(() => {
    const fetchRefFAQ = async () => {
        if (!parentId) { 
            setRefContent([]);  
            return;
        }
        
        try {
            const response = await axios.get(`http://15.164.103.160:8080/api/v1/faqs/${parentId}`);
            if (response.data && response.data.length > 0) {
                setRefContent(response.data);
            } else {
                setRefContent([]); 
            }
        } catch (error) {
            console.error("하위 질문 불러오기 실패", error);
            setRefContent([]); 
        }
    };
    fetchRefFAQ();
}, [parentId]);

  return (
    <div>
      <div
        className="bg-green-500 m-6 p-6 rounded-full font-bold text-[40px] w-16 h-16 flex justify-center items-center pl-[24.6px] pb-[29px] cursor-pointer fixed bottom-2 right-2 hover:scale-105 transition-transform"
        onClick={handleClick}>
        {open ? "x" : "?"}
      </div>
      {open && (
        <>
          <div className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] w-96 h-[556px] fixed right-[90px] bottom-2 m-6 z-50 rounded-md">
            <div className=" bg-green-500 font-bold text-xl px-3 py-2 flex  rounded-t-md content-center justify-between">
              <div>FAQ</div>
              <div className="flex gap-2">
                <div className="cursor-pointer float-end" onClick={handleEditClick}>
                  +
                </div>
                <div className="cursor-pointer" onClick={() => setOpen(false)}>
                  x
                </div>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
              <div className="flex px-5 py-3">
                <div className="rounded-full w-12 h-12">
                  <img src={logo} alt="logo" />
                </div>
                <div className="ml-5 p-2 rounded-xl content-center bg-gray-200">어떤 도움이 필요하신가요?</div>
              </div>
              {!selectFAQ ? (
                <>
                  {/* 최상위 질문 가져오기 */}
                  {topContent.map((faq) => (
                    <div className="flex px-5 py-1 justify-end" key={faq.faqId}>
                      <div
                        className="mr-2 p-2 rounded-xl content-center border-2 border-green-500 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() => handleSelectFAQ(faq.content.toString(), faq.faqId)}>
                        {faq.content}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                {/* 질문이 한개만 있다면 전에 클릭한 질문 나타나게하기 */}
                {refContent.length === 1 ? (
                    <>
                    <div className="flex px-5 py-1 justify-end" >
                      <div
                        className="mr-2 p-2 rounded-xl content-center border-2 border-green-500 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white"
                        >
                        {selectFAQ}
                      </div>
                    </div>
                    {/* 자식 질문이 한개일때 답변 */}
                    {refContent.map((ref) => (
                    <div className="flex px-5 py-3">
                    <div className="rounded-full w-12 h-12 min-w-[48px] min-h-[48px]">
                        <img src={logo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-5 p-2 rounded-xl bg-gray-200 break-words">
                    {ref.content}
                    </div>
                </div>
                  ))}
                  </>
                  ) : (
                    <>
                    {/* 자식 질문이 여러개일때 */}
                    {refContent.map((ref) => (
                    <div className="flex px-5 py-1 justify-end" key={ref.faqId}>
                      <div className="mr-2 p-2 rounded-xl content-center border-2 border-green-500 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white">
                        {ref.content}
                      </div>
                    </div>
                  ))}
                  </>
                  )}
                  
                </>
              )}
            </div>
          </div>
          {edit && <FAQEdIt Close={() => setEdit(false)} />}
        </>
      )}
    </div>
  );
};

export default FAQ;

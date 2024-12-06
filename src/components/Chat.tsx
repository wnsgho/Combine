import { useState } from "react";
import logo from "../assets/logo.png";

const Chat = () => {
  const [makeChatRoom, setMakeChatRoom] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);

  const handlemakechatroom = () => {
    setMakeChatRoom(!makeChatRoom);
    setChatRoomOpen(false);
  };

  const handlechatroomopen = () => {
    setChatRoomOpen(true);
    setMakeChatRoom(false);
  };

  return (
    <div className="fixed bottom-[89px] right-2 z-50">
      <div>
        {/* 채팅방 생성 UI*/}
        {makeChatRoom && (
          <div className="bg-yellow-500 absolute -left-96 -top-16 w-96 h-56 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="p-5 ">
              <div className="pb-3 font-bold">채팅 할 대상의 이메일을 작성하세요.</div>
              <input type="text" className="w-full h-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 mb-10 rounded-md" />
            </div>
            <div className="bg-blue-500 inline px-2 py-1 mx-5 rounded-md text-white font-bold cursor-pointer float-end">
              생성
            </div>
          </div>
        )}

        {/* 채팅방 생성 버튼 */}
        <div
          className="bg-yellow-500 m-6 p-6 rounded-full font-bold text-[40px] w-16 h-16 flex justify-center items-center pl-[24.6px] pb-[35px] cursor-pointer  hover:scale-105 transition-transform"
          onClick={handlemakechatroom}>
          +
        </div>
      </div>
      

      {/* 채팅방 내부  */}
      {chatRoomOpen && (
        <div className="fixed bottom-[30px] right-[114px] z-50">
        <div className="bg-yellow-500 w-[384px] h-[590px] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] ">
            {/* 헤더 */}
          <div className="bg-white p-3 rounded-t-lg flex justify-between ">
            <div className="font-bold">사용자 이름</div>
            <div onClick={() => setChatRoomOpen(false)} className="cursor-pointer flex gap-3">
                <div>🗑️</div>
              <div>✖️</div>
            </div>
          </div>

          <div className="bg-white mx-3 mt-3 w-76 h-[477px] rounded-t-lg overflow-y-auto max-h-[500px] scrollbar-hide">
            {/* 채팅 내역 (상대방)*/}
            <div className="flex p-4">
              <div className="rounded-full w-10 h-10 min-w-10 min-h-10">
                <img src={logo} alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="ml-2 pb-1.5 text-sm">사용자 이름</div>
                <div className="ml-2 p-2 rounded-xl bg-gray-300 break-words inline-block">안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</div>
              </div>
            </div>

            {/* 채팅 내역 (자신)*/}
            <div className="flex p-4 justify-end">
              <div className="flex flex-col items-end">
                <div className="text-sm pb-1.5 pr-1">사용자 이름</div>
                <div className="p-2 rounded-xl bg-gray-300 break-words">
                  안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
                </div>
              </div>
              <div className="rounded-full w-10 h-10 min-w-10 min-h-10 ml-2">
                <img src={logo} alt="logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="bg-white mx-3 w-76 h-10 rounded-b-lg border-t-2 border-black flex justify-between">
            <input type="text" className=" w-80 focus:outline-none p-2 text-sm" />
            <div className="text-3xl px-1 cursor-pointer hover:scale-105 transition-transform duration-300">➤</div>
          </div>
        </div>
        </div>
      )}

      {/* 채팅방1 아이콘 (목록 조회)*/}
      <div className="transition-transform hover:scale-105">
      <div
        className="bg-yellow-500 rounded-full w-16 h-16 m-6 items-center justify-center cursor-pointer"
        // 특정 채팅방 목록을 조회해야함
        onClick={handlechatroomopen}>
        <div className="absolute top-13 right-5">
          <div className=" bg-red-600 text-white rounded-full px-1.5 min-w-[20px] h-[20px] flex items-center justify-center text-sm font-bold ">
            12
          </div>
        </div>
        <div className="p-3.5 pl-3 text-3xl">💬</div>
      </div>
      </div>

      {/* 채팅방2 99+일때 */}
      <div className="transition-transform hover:scale-105">
      <div className="bg-yellow-500 rounded-full w-16 h-16 m-6 cursor-pointer"
      onClick={handlechatroomopen}>
        <div className="absolute top-15 right-5">
          <div
            className="bg-red-600 text-white rounded-full pl-1.5 
                    pr-1 min-w-[20px] h-[20px] flex items-center justify-center text-sm font-bold">
            99 <span className="pb-[4px] pl-[1px]">+</span>
          </div>
        </div>
        <div className="p-3.5 pl-[12px] text-3xl">💬</div>
      </div>
      </div>

    </div>
  );
};

export default Chat;

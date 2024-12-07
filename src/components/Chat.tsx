import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import useStore from "../store/store";
import { Client } from "@stomp/stompjs";

//gyutest@gmail.com (일반)
//gyutest123

//gyutest2@gmail.com (보호소)
//gyutest123

//gyutest3@gmail.com (일반)
//gyutest123

//로그인시에 웹소켓이 연결이되게
//채팅알람, 삭제 알람 연결되게

//그리고 특정 채팅 들어가면 채팅 구독 연결
//특정 채팅 나가면 구독 해제

//로그아웃시에 웹소켓이 연결 끝기게
//다른페이지에서도 유지가 되는지?

interface userChatRoom {
  chatRoomId: number;
  unReadCount: number;
  oppositeEmail: string;
  oppositeName: string;
  userEmail: string;
}

interface chatUser {
  username: string;
  email: string;
}

interface chatMessage {
  message: string;
  chatDate: string;
  senderEmail: string;
  senderName: string;
  unRead: number;
}

const Chat = () => {
  const [makeChatRoom, setMakeChatRoom] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);
  const [oppositeEmail, setOppositeEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userChatRoom, setUserChatRoom] = useState<userChatRoom[]>([]);
  const [chatUser, setChatUser] = useState<chatUser[]>([]);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [chatMessage, setChatMessage] = useState<chatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const clientRef = useRef<Client | null>(null);

  const handlemakechatroom = () => {
    setMakeChatRoom(!makeChatRoom);
    setChatRoomOpen(false);
  };

  const handlechatroomopen = async (RoomId: number) => {
    // 이미 열려있는 같은 채팅방을 클릭한 경우 닫기
    if (chatRoomOpen && chatRoomId === RoomId) {
      handleCloseChatRoom();
      return;
    }

    console.log("채팅방 열기 - 룸ID:", RoomId);
    setChatRoomOpen(true);
    setMakeChatRoom(false);
    setChatRoomId(RoomId);

    try {
      // 이전 메시지 조회
      const messageResponse = await axios.get(`http://15.164.103.160:8080/api/v1/chatmessages/${RoomId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      });
      setChatMessage(messageResponse.data);

      // 읽음 처리
      await axios.put(
        `http://15.164.103.160:8080/api/v1/unread/init`,
        {
          userEmail: userEmail,
          chatRoomId: RoomId
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        }
      );

      // 이전 구독 해제
      if (currentSubscription) {
        currentSubscription.unsubscribe();
        console.log(`이전 채팅방 구독 해제 완료 - 룸ID: ${RoomId}`);
      }

      // 새로운 채팅방 구독
      if (clientRef.current?.connected) {
        try {
          const subscription = clientRef.current.subscribe(`/topic/chatroom/${RoomId}`, (message) => {
            console.log('수신된 메시지:', message.body);
            const receivedMessage = JSON.parse(message.body);
            setChatMessage(prev => [...prev, receivedMessage]);
            
            // 새 메시지가 오을 때 채팅방 목록을 새로 불러와서 unReadCount 업데이트
            fetchChatroom().then(() => {
              console.log('채팅방 목록 새로고침 완료');
            }).catch(error => {
              console.error('채팅방 목록 새로고침 실패:', error);
            });
          });
          setCurrentSubscription(subscription);
        } catch (error) {
          console.error(`채팅방 구독 실패 - 룸ID: ${RoomId}`, error);
        }
      }

      await fetchChatroom();
    } catch (error) {
      console.error("채팅방 열기 실패", error);
    }
  };

  // 채팅방 닫을 때 구독 해제
  const handleCloseChatRoom = () => {
    if (currentSubscription) {
      try {
        currentSubscription.unsubscribe();
        console.log(`채팅방 구독 해제 완료`);
        setCurrentSubscription(null);
      } catch (error) {
        console.error("채팅방 구독 해제 실패:", error);
      }
    }
    setChatRoomOpen(false);
  };

  // 현재 사용자의 이메일 추출
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const email = payload.email;
      setUserEmail(email);
    }
  }, [userEmail]);

  //채팅창 생성시 새로고침 함수
  const fetchChatroom = async () => {
    try {
      const response = await axios.get("http://15.164.103.160:8080/api/v1/chatrooms/user", {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      });
      console.log('채팅방 목록 응답:', response.data);  // 응답 데이터 확인
      setUserChatRoom(response.data);
    } catch (error) {
      console.error("목록 조회 실패", error);
      throw error;  // 에러를 다시 던져서 위에서 catch할 수 있도록
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchChatroom();
    }
  }, [userEmail]);

  //채팅방 생성
  const handleCreateChat = async () => {
    try {
      await axios.post(
        "http://15.164.103.160:8080/api/v1/chatrooms",
        {
          userEmail,
          oppositeEmail
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json"
          }
        }
      );
      alert("채팅방이 생성 되었습니다.");
      await fetchChatroom(); // 새로고침
      setMakeChatRoom(false);
    } catch (error) {
      console.error("채팅방 생성 실패", error);
      alert("채팅방 생성에 실패하였습니다.");
    }
  };

  //참여중인 채팅방 목록 조회
  useEffect(() => {
    const fetchChatroom = async () => {
      try {
        const response = await axios.get("http://15.164.103.160:8080/api/v1/chatrooms/user", {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        });
        setUserChatRoom(response.data);
      } catch (error) {
        console.error("목록 조회 실패", error);
      }
    };

    if (userEmail) {
      fetchChatroom();
    }
  }, []);

  //채팅방 삭제
  const handleChatDelete = async () => {
    console.log(chatRoomId);
    try {
      await axios.delete(`http://15.164.103.160:8080/api/v1/chatrooms/${chatRoomId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken")
        }
      });
      alert("채팅방을 삭제 하였습니다.");
      await fetchChatroom();
      setChatRoomOpen(false);
    } catch (error) {
      console.error("채팅방 삭제 실패", error);
    }
  };

  // 스크롤 관리를 위한 ref 추가
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 이동 함수
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 새 메시지가 추가될 때마다 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]); // chatMessage가 변경될 때마다 실행

  const sendMessage = () => {
    if (!message.trim() || !clientRef.current?.connected) {
      return;
    }

    const messageData = {
      message: message,
      senderEmail: userEmail,
      receiverEmail: oppositeEmail
    };

    try {
      clientRef.current.publish({
        destination: `/app/chat/send/${chatRoomId}`,
        body: JSON.stringify(messageData)
      });
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  //회원 목록 조회
  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const response = await axios.get("http://15.164.103.160:8080/api/v1/users/chat-users", {
          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
        });
        setChatUser(response.data);
      } catch (error) {
        console.error("회원 목록 조회에 실패하였습니다.", error);
      }
    };
    fetchChatUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    if (!token) return;

    const client = new Client({
      brokerURL: `ws://15.164.103.160:8080/ws?authorization=${token}`,
      connectHeaders: {
        Authorization: token
      },
      onConnect: () => {
        console.log("WebSocket 연결 성공");

        // 전체 채팅 알림 구독
        if (client.connected) {
          try {
            client.subscribe("/user/queue/notifications", (message) => {
              console.log("새 메시지 알림:", message.body);
              // 새 메시지가 오�� 채팅방 목록 새로고침
              fetchChatroom();
            });
            console.log("채팅 알림 구독 성공");
          } catch (error) {
            console.error("채팅 알림 구독 실패:", error);
          }
        }
      }
    });

    try {
      client.activate();
      clientRef.current = client;
      console.log("WebSocket 클라이언트 활성화 성공");
    } catch (error) {
      console.error("WebSocket 연결 실�:", error);
    }

    return () => {
      if (clientRef.current?.connected) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-[89px] right-2 z-50">
      <div>
        {/* 채팅방 생성 UI*/}

        {makeChatRoom && (
          <div className="bg-[#f1a34a] absolute -left-96 -top-16 w-96 h-56 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <div className="p-5 ">
              <div className="pb-3 font-bold">채팅 할 대상을 선택하세요</div>
              <select
                className="w-full h-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 mb-10 rounded-md"
                value={oppositeEmail}
                onChange={(e) => setOppositeEmail(e.target.value)}>
                <option value="">유저를 선택하세요</option>
                {chatUser.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="bg-blue-500 inline px-2 py-1 mx-5 rounded-md text-white font-bold cursor-pointer float-end"
              onClick={handleCreateChat}>
              생성
            </div>
          </div>
        )}

        {/* 채팅방 생성 버튼 */}
        <div
          className="bg-[#f1a34a] m-6 p-6 rounded-full font-bold text-[40px] w-16 h-16 flex justify-center items-center pl-[24.6px] pb-[35px] cursor-pointer  hover:scale-105 transition-transform"
          onClick={handlemakechatroom}>
          +
        </div>
      </div>

      {/* 채팅방 내부  */}
      {chatRoomOpen && (
        <div className="fixed bottom-[30px] right-[114px] z-50">
          <div className="bg-yellow-500 w-[384px] h-[590px] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {/* 헤더 */}
            {userChatRoom
              .filter((item) => item.chatRoomId === chatRoomId)
              .map((item) => (
                <div className="bg-white p-3 rounded-t-lg flex justify-between" key={item.chatRoomId}>
                  <div className="font-bold">{item.oppositeName}</div>
                  <div className="cursor-pointer flex gap-3">
                    <div onClick={handleChatDelete}>🗑️</div>
                    <div onClick={handleCloseChatRoom}>✖️</div>
                  </div>
                </div>
              ))}

            <div className="bg-white mx-3 mt-3 w-76 h-[477px] rounded-t-lg overflow-y-auto max-h-[500px] scrollbar-hide">
              {chatMessage.map((message, index) =>
                message.senderEmail === userEmail ? (
                  // 자신의 메시지
                  <div className="flex p-4 justify-end" key={message.chatDate + index}>
                    <div className="flex flex-col items-end">
                      <div className="text-sm pb-1.5 pr-1">{message.senderName}</div>
                      <div className="flex items-end gap-1">
                        <div className="p-2 rounded-xl bg-gray-300 break-words">{message.message}</div>
                      </div>
                    </div>
                    <div className="rounded-full w-10 h-10 min-w-10 min-h-10 ml-2">
                      <img src={logo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                ) : (
                  // 상대방의 메시지
                  <div className="flex p-4" key={message.chatDate + index}>
                    <div className="rounded-full w-10 h-10 min-w-10 min-h-10">
                      <img src={logo} alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="ml-2 pb-1.5 text-sm">{message.senderName}</div>
                      <div className="flex items-end gap-1">
                        <div className="ml-2 p-2 rounded-xl bg-gray-300 break-words">{message.message}</div>
                      </div>
                    </div>
                  </div>
                )
              )}
              {/* 스크롤 위치 지정을 위한 더미 div */}
              <div ref={messageEndRef} />
            </div>

            <div className="bg-white mx-3 w-76 h-10 rounded-b-lg border-t-2 border-black flex justify-between">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="w-80 focus:outline-none p-2 text-sm"
                placeholder="메시지를 입력하세요"
              />
              <div
                onClick={sendMessage}
                className="text-3xl px-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                ➤
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 채팅방1 아이콘 (목록 조회)*/}
      {userChatRoom.map((item) => (
        <div className="transition-transform hover:scale-105" key={item.chatRoomId}>
          <div
            className="bg-yellow-500 rounded-full w-16 h-16 m-6 items-center justify-center cursor-pointer"
            onClick={() => handlechatroomopen(item.chatRoomId)}>
            <div className="absolute top-13 right-5">
              <div className=" bg-red-600 text-white rounded-full px-1.5 min-w-[20px] h-[20px] flex items-center justify-center text-sm font-bold ">
                {item.unReadCount > 99 ? (
                  <>
                    {item.unReadCount}
                    <span className="pb-[4px] pl-[1px]">+</span>
                  </>
                ) : (
                  item.unReadCount
                )}
              </div>
            </div>
            <div className="p-3 pl-3.5 pt-3.5 font-bold text-3xl text-center ">{item.oppositeName.charAt(0)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;

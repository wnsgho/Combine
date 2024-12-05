import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Alarm = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<
    { id: number; content: string; type: string; isRead: boolean; createdAt: string }[]
  >([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인 되어 있지 않아 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    const authHeader = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;

    const fetchNotifications = async () => {
      try {
        const [notificationsResponse, unreadCountResponse] = await Promise.all([
          axiosInstance.get("/api/v1/notifications", {
            headers: { Authorization: authHeader },
          }),
          axiosInstance.get("/api/v1/notifications/unread-count", {
            headers: { Authorization: authHeader },
          }),
        ]);

        setUnreadCount(unreadCountResponse.data.count || 0); 
        setNotifications(notificationsResponse.data.content);
      } catch {
        setError("알림 목록을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [navigate]);

  const markAsRead = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const authHeader = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;

    try {
      await axiosInstance.patch(`/api/v1/notifications/${id}/read`, null, {
        headers: {
          Authorization: authHeader,
        },
      });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0)); 
    } catch {
      console.error("알림 읽음 처리 중 오류 발생");
    }
  };

  const deleteNotification = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const authHeader = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;

    try {
      await axiosInstance.delete(`/api/v1/notifications/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    } catch {
      console.error("알림 삭제 중 오류 발생");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="relative flex items-center px-10 py-6 bg-white shadow-md z-50">
        <img
          src="/src/assets/before.svg"
          alt="Back"
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex-grow text-center">
          <span className="text-4xl font-bold" style={{ color: "#7F5546" }}>
            알림
          </span>
        </div>
      </header>

      {/* 내용 */}
      <main className="flex-grow flex flex-col items-center bg-gray-100 py-6 px-4">
        {/* 읽지 않은 알림 */}
        <div className="w-full max-w-[80%] flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            읽지 않은 알림: {error ? "정보 없음" : unreadCount}
          </span>
        </div>

        {/* 알림 목록 */}
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-xl text-gray-500">알림을 불러오는 중 입니다.</h1>
          </div>
        ) : error ? (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-xl text-gray-500">{error}</h1>
          </div>
        ) : notifications.length > 0 ? (
          <div className="w-full max-w-[80%] space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`shadow-md rounded-xl p-5 relative ${
                  notification.isRead ? "bg-gray-200" : "bg-white hover:bg-[#f0efef]"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                  <img
                    src="/src/assets/x2.svg"
                    alt="Delete"
                    className="w-5 h-5 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  />
                </div>
                <p>{notification.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-2xl text-gray-500">현재 알림이 없습니다.</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Alarm;
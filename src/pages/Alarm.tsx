import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Alarm = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<
    { id: number; title: string; createdAt: string; isRead: boolean }[]
  >([]);
  const [unreadCount, setUnreadCount] = useState<number | string>("정보 없음");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 날짜 형식 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 알림 목록 및 읽지 않은 알림 수 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
        return;
      }

      const authHeader = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;

      try {
        const [notificationsResponse, unreadCountResponse] = await Promise.all([
          axiosInstance.get(`/api/v1/announcements?page=${page}`, {
            headers: { Authorization: authHeader },
          }),
          axiosInstance.get("/api/v1/notifications/unread-count", {
            headers: { Authorization: authHeader },
          }),
        ]);

        const newNotifications = notificationsResponse.data.content.map((item: any) => ({
          id: item.id,
          title: item.title,
          createdAt: item.created_at,
          isRead: false,
        }));

        setNotifications((prev) => [...prev, ...newNotifications]); 
        setUnreadCount(unreadCountResponse.data ?? "정보 없음");
        setTotalPages(notificationsResponse.data.page.totalPages); 
      } catch (err) {
        setError("알림 목록을 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page, navigate]);

  // 알림 삭제
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
        headers: { Authorization: authHeader },
      });
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    } catch {
      console.error("알림 삭제 중 오류 발생");
    }
  };

  // 알림 읽음 처리
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
        headers: { Authorization: authHeader },
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
      setUnreadCount((prev) =>
        typeof prev === "number" ? Math.max(prev - 1, 0) : prev
      );
    } catch (err) {
      console.error("알림 읽음 처리 중 오류 발생:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-grow flex flex-col items-center bg-gray-100 py-6 px-4">
        {/* 읽지 않은 알림 */}
        <div className="w-full max-w-[92%] sm:max-w-[92%] md:max-w-[92%] lg:max-w-[87%] xl:max-w-[82%] 2xl:max-w-[77%] flex justify-between items-center mb-4">
          <span className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-bold pl-5">
            읽지 않은 알림: {error ? "정보 없음" : unreadCount}
          </span>
        </div>

        {loading && page === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-gray-500">알림을 불러오는 중 입니다.</h1>
          </div>
        ) : error ? (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl text-gray-500">{error}</h1>
          </div>
        ) : notifications.length > 0 ? (
          <div className="w-full max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%] space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={`${notification.id}-${index}`}
                className={`shadow-md rounded-xl p-5 sm:p-5 md:p-6 lg:p-6 xl:p-6 2xl:p-6 relative ${
                  notification.isRead ? "bg-gray-200" : "bg-white hover:bg-[#f0efef]"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-gray-500">{formatDate(notification.createdAt)}</span>
                  <img
                    src="/src/assets/x2.svg"
                    alt="Delete"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7 2xl:w-7 2xl:h-7 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteNotification(notification.id); 
                    }}
                  />
                </div>
                <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">{notification.title}</p>
              </div>
            ))}
            {page < totalPages - 1 && (
              <div className="w-full flex justify-end">
                <span
                  className="text-gray-500 text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl cursor-pointer hover:underline mr-2"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  더보기
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-500">현재 알림이 없습니다.</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Alarm;

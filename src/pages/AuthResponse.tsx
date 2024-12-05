// /Users/chacha/Desktop/PAWS/src/pages/AuthResponse.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AuthResponse = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const processToken = () => {
      if (token) {
        const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        localStorage.setItem("accessToken", formattedToken);
        localStorage.setItem("isSocialLogin", "true");

        console.log("저장된 accessToken 확인: ", localStorage.getItem("accessToken"));
        console.log("저장된 isSocialLogin 확인: ", localStorage.getItem("isSocialLogin"));

        // CustomEvent 트리거 및 storage 업데이트 반영
        setTimeout(() => {
          const headerUpdateEvent = new CustomEvent("updateHeader", {
            detail: { accessToken: formattedToken },
          });
          console.log("CustomEvent 트리거: ", headerUpdateEvent.detail);
          window.dispatchEvent(headerUpdateEvent);

          // 상태 업데이트 시간을 준 후 navigate 호출
          navigate("/");
        }, 200);
      } else {
        alert("토큰이 없습니다. 다시 로그인해주세요.");
        navigate("/login");
      }
    };

    processToken();
  }, [token, navigate]);

  return null;
};

export default AuthResponse;

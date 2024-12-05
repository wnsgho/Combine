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

        setTimeout(() => {
          const headerUpdateEvent = new CustomEvent("updateHeader", {
            detail: { accessToken: formattedToken },
          });
          console.log("CustomEvent 트리거: ", headerUpdateEvent.detail);
          window.dispatchEvent(headerUpdateEvent);

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

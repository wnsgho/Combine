import axiosInstance from "../../utils/axiosInstance";

export const naverLogin = async (
  onSuccess: (token: string) => void,
  onError: (message: string) => void
) => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID; 
  const callbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URL; 

  if (!clientId || !callbackUrl) {
    onError("네이버 로그인을 할 수 없습니다.");
    return;
  }

  const state: string = Math.random().toString(36).substr(2); 
  const popupUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&state=${state}&auth_type=reauthenticate`;

  const popup = window.open(popupUrl, "NaverLogin", "width=500,height=700");

  if (!popup) {
    onError("팝업이 차단되었습니다.");
    return;
  }

  const popupInterval = setInterval(async () => {
    try {
      if (popup.location.href.includes("code=")) {
        const query = new URLSearchParams(popup.location.search);
        const authCode: string | null = query.get("code");
        popup.close();
        clearInterval(popupInterval);

        if (!authCode) {
          onError("네이버 로그인을 할 수 없습니다.");
          return;
        }

        try {
          const response = await axiosInstance.post("/api/v1/auth/oauth2/naver", {
            code: authCode,
            state,
          });

          if (response.status !== 200) {
            throw new Error("백엔드와의 통신 오류");
          }

          const data = response.data;
          onSuccess(data.accessToken);
        } catch (error) {
          console.error("네이버 로그인 중 백엔드 오류:", error);
          onError("네이버 로그인을 할 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("팝업 인증 코드 추출 오류:", error);
    }

    if (popup.closed) {
      clearInterval(popupInterval);
    }
  }, 500);
};

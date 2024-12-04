import axiosInstance from "../../utils/axiosInstance";

export const kakaoLogin = async (
  onSuccess: (token: string) => void,
  onError: (message: string) => void
) => {
  if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()) {
    const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
    if (kakaoKey) {
      window.Kakao.init(kakaoKey);
    } else {
      onError("카카오 JavaScript 키가 설정되지 않았습니다.");
      return;
    }
  }

  try {
    window.Kakao.Auth.login({
      throughTalk: false,
      success: async (authObj: { access_token: string }) => {
        try {
          const response = await axiosInstance.post("/api/v1/auth/oauth2/kakao", {
            token: authObj.access_token, 
          });
          const { accessToken } = response.data;
          onSuccess(accessToken);
        } catch (error) {
          console.error("카카오 로그인 백엔드 오류:", error);
          onError("카카오 로그인을 할 수 없습니다.");
        }
      },
      fail: () => onError("카카오 로그인 실패"),
    });
  } catch (error) {
    console.error("카카오 로그인 중 오류:", error);
    onError("카카오 로그인 중 오류가 발생했습니다.");
  }
};

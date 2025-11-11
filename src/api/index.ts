import axios from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  sub: number;
  profileImageUrl: string;
  email: string;
  username: string;
}
const userApi = axios.create({
  baseURL: "http://localhost/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshTokenApi = axios.create({
  baseURL: "http://localhost/auth",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${btoa("client:secrets")}`,
  },
});

export const refreshToken = async () => {
  console.log("Call get new access token");
  try {
    const res = await refreshTokenApi.post("/oath2/token", {
      client_id: "client",
      refresh_token: localStorage.getItem("refreshToken"),
      grant_type: "refresh_token",
    });
    localStorage.setItem("accessToken", res.data["access_token"]);
    localStorage.setItem("refreshToken", res.data["refresh_token"]);
    localStorage.setItem("tokenId", res.data["id_token"]);
    console.log("Set new access token");
  } catch (err) {
    console.log(err);
  }
};

userApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

userApi.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;
    console.log("Retry: " + originalRequest._retry);
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("refresh token");
        await refreshToken();
        console.log("new acess token: " + localStorage.getItem("accessToken"));
        console.log(
          "accessToken is new:" + originalRequest.headers.Authorization !==
            `Bearer ${localStorage.getItem("accessToken")}`
        );
        return userApi(originalRequest);
      } catch (refreshErr) {
        console.log(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);


export const getUser = async (): Promise<User> => {
  const res = await userApi.get("userinfo");
  return res.data;
};


export { userApi };

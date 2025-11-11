import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { MdQuiz } from "react-icons/md";
function Callback() {
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    const code = params.get("code")!;
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Basic ${btoa("client:secrets")}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "client");
    urlencoded.append("redirect_uri", "http://localhost/callback");
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: urlencoded.toString(),
      redirect: "follow",
    };
    fetch("http://localhost/auth/oauth2/token", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        localStorage.setItem("tokenId", json["id_token"]);
        localStorage.setItem("accessToken", json["access_token"]);
        localStorage.setItem("refreshToken", json["refresh_token"]);
        setParams("");
        window.location.replace("/admin/home");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center p-5 gap-2.5 text-orange-400">
        <div>
          <MdQuiz size={30} />
        </div>
        <div className="text-[20px] font-semibold fotn-sans">
          Redirecting...
        </div>
      </div>
    </div>
  );
}
export default Callback;

import { createAtempt } from "@/api/quizzes";
import { AuthContext } from "@/App";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function PreGamePage() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(() => (user ? user.username : ""));
  const [error, setError] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();
  const handleStartGame = () => {
    if (username.trim() === "") {
      setError("the username is required");
      return;
    }
    createAtempt(params?.quizId as string, username)
      .then((res) =>
        navigate(
          `/quizzes/play/${params.quizId}/attempts/${res.data.attemptId}`
        )
      )
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message);
        } else {
          console.log(err);
        }
      });
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 ">
      <div className="flex flex-1 h-full items-center justify-center p-[100px] bg-orange-100">
        <div className="w-[400px] flex flex-col gap-3.5  border border-[#e5e7eb] p-5 rounded-lg bg-white">
          <label
            htmlFor=""
            className="font-semibold font-sans text-[#797979] text-[14px]"
          >
            Your player name is ...
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="outline-none border border-[#e5e7eb] text-[20px] p-2.5 rounded-lg font-sans focus:border-orange-400"
          />
          {error && error.trim() !== "" && (
            <small className="font-sans text-red-500 font-semibold">
              {error}
            </small>
          )}
          <button
            onClick={handleStartGame}
            className="bg-orange-500 py-2 border-b-6 border-b-[#895b0565] text-[20px] font-semibold text-white cursor-pointer rounded-lg active:border-0 active:bg-orange-900 transition-all duration-100 ease-in-out hover:opacity-[0.8]"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

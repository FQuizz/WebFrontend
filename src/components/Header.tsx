import { AuthContext } from "@/App";
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import LogoImage from "@/assets/logo.png";
import { MdQuiz } from "react-icons/md";
export default function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="absolute top-0 right-0 h-[70px] w-[100%] border border-[#cbcaca] flex items-center justify-between px-[30px]">
      <div className="flex-1 flex items-center gap-2.5 text-orange-500">
        <MdQuiz size={35}/>
        <div className="w-[100px] h-[100px]">
          <img
            src={LogoImage}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="w-[35%] h-[60%] focus-within:w-[50%] transition-all duration-600 ease-in-out">
        <div className="border border-[#908c8c] flex items-center justify-center h-full rounded-[10px] gap-[15px] px-[10px]">
          <FaSearch />
          <input
            type="text"
            placeholder="Search public quizzes"
            className="outline-0 flex-1"
          />
        </div>
      </div>
      {user && (
        <div className="flex items-center justify-end flex-1 gap-[15px]">
          <div className="w-[50px] h-[50px]">
            <img
              src={user?.profileImageUrl}
              alt=""
              className="w-[100%] h-[100%] object-cover rounded-[50%]"
            />
          </div>
          <div className="font-semibold">{user?.username}</div>
        </div>
      )}
      {!user && (
        <div className="flex items-center justify-end flex-1 gap-[15px]">
          <button
            className="flex items-center justify-around gap-1.5 px-3 py-2 bg-orange-400 text-white rounded-lg text-[13px] cursor-pointer hover:opacity-[0.8]"
            onClick={() =>
              window.location.replace(
                "http://localhost/auth/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http://localhost:3000/callback"
              )
            }
          >
            <span>
              <BiLogIn size={20} />
            </span>
            <span className="font-semibold">Login</span>
          </button>
        </div>
      )}
    </div>
  );
}

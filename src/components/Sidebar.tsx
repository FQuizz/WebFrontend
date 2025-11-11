import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router";
import { MdQuiz } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "@/App";
import axios from "axios";
const links = [
  {
    path: "/admin/home",
    label: "Home",
    icon: <FaHome size={20} />,
    isAuth: false,
  },
  {
    path: "/admin/quizzes",
    label: "My quizzes",
    icon: <MdQuiz size={20} />,
    isAuth: true,
  },
  {
    path: "/admin/questions",
    label: "My questions",
    icon: <FaList size={20} />,
    isAuth: true,
  },
  {
    path: "/admin/reports",
    label: "Reports",
    icon: <IoBarChart size={20} />,
    isAuth: true,
  },
];
const activeStyle = "bg-orange-400 text-white font-[600] text-[15px]";
const inActiveStyle = "font-[600] text-[15px] hover:bg-orange-200";
export default function Sidebar() {
  const { isAuth } = useContext(AuthContext);
  return (
    <div className="w-[var(--sidebar-width)] border border-[#c8c6c6] fixed left-[0px] h-[calc(100%-70px)] bottom-[0px] z-1 box-border flex justify-center border-t-0 ">
      <div className="w-full p-[10px] flex justify-center">
        <div className="flex flex-col flex-1 p-[3px]">
          <div className="flex flex-col flex-1 p-[3px] gap-[3px]">
            {links
              .filter((link) => link.isAuth === isAuth || link.isAuth === false)
              .map((link, index) => (
                <NavLink
                  to={link.path}
                  key={index}
                  className={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingInline: 15,
                    paddingBlock: 10,
                    borderRadius: 8,
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
          </div>
          {isAuth && (
            <div className="flex items-center justify-center p-[3px] w-full">
              <button
                onClick={async () => {
                  const tokenId = localStorage.getItem("tokenId");
                  localStorage.clear();
                  window.location.href = `http://authorization-server:8086/logout?token_id_hint=${tokenId}&post_logout_redirect_uri=http://web-ui:3000/admin/home`;
                }}
                className="flex items-center justify-center gap-2.5 w-full px-4 py-2 bg-orange-400 text-white rounded-lg text-[13px] cursor-pointer hover:opacity-[0.8]"
              >
                <span>
                  <TbLogout size={20} />
                </span>
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

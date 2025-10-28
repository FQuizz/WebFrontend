import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router";
import { MdQuiz } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
const links = [
  {
    path: "/admin/home",
    label: "Home",
    icon: <FaHome size={20}/>,
  },
  {
    path: "/admin/quizzes",
    label: "My quizzes",
    icon: <MdQuiz size={20}/>
  },
  {
    path: "/admin/questions",
    label: "My questions",
    icon: <FaList size={20}/>
  },
  {
    path: "/admin/reports",
    label: "Reports",
    icon: <IoBarChart size={20}/>
  }
];
const activeStyle = "bg-orange-400 text-white font-[600] text-[15px]";
const inActiveStyle = "font-[600] text-[15px] hover:bg-orange-200";
export default function Sidebar() {
  return (
    <div className="w-[var(--sidebar-width)] border border-[#c8c6c6] fixed left-[0px] h-[calc(100%-70px)] bottom-[0px] z-1 box-border flex justify-center border-t-0 ">
      <div className="w-full p-[10px] flex justify-center">
        <div className="flex flex-col flex-1 p-[3px] gap-[3px]">
          {links.map((link,index) => (
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
                borderRadius: 8
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

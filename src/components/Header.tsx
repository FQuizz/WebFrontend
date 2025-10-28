import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <div className="absolute top-0 right-0 h-[70px] w-[100%] border border-[#cbcaca] flex items-center justify-between px-[30px]">
      <div className="flex-1">Logo</div>
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
      <div className="flex items-center justify-end flex-1 gap-[15px]">
        <div className="w-[50px] h-[50px]">
          <img
            src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-[50%]"
          />
        </div>
        <div className="font-semibold">Khoa nguyen</div>
      </div>
    </div>
  );
}

import { IconType } from "react-icons";

interface Props {
  size: number;
  title: string;
  icon: React.ReactNode;
  callback: Function;
}
export default function FunctionButton({ size, title, icon, callback }: Props) {
  return (
    <button
      onClick={() => callback()}
      style={{ paddingInline: size, paddingBlock: size - 5 }}
      className={`flex items-center gap-[8px] rounded-[16px] border border-[#e5e7eb] hover:bg-[#e5e7eb] cursor-pointer`}
    >
      <span>{icon}</span>
      <span className="font-[600] text-[14px]">{title}</span>
    </button>
  );
}

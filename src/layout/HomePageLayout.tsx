import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function HomePageLayout({ children }: Props) {
  return (
    <div className="fixed top-[0px] right-[0px] left-[0px] bottom-[0px]">
      <Header />
      <div className="absolute bottom-[0px] left-[0px] right-[0px] h-[calc(100%-100px)]">
        <Sidebar />
        <div className="w-[calc(100%-300px)] absolute top-[0px] right-[0px] bottom-[0px] h-full ">{children}</div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import { MainNav } from "@/components/MainNav";
import { Search } from "@/components/Search";
import TeamSwitcher from "@/components/TeamSwitcher";
import { UserNav } from "@/components/UserNav";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app using the components.",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex-col hidden md:flex">
        <div className="border-b">
          <div className="flex items-center h-16 px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="flex items-center ml-auto space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 p-8 pt-6 space-y-4">{children}</div>
      </div>
    </>
  );
}

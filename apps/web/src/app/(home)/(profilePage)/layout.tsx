import "./globals.css";
import NavBarProfile from "./profile/_components/Navbarprofile";
import SideBarProfile from "./profile/_components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SideBarProfile />
      <div className="flex-1 overflow-y-auto bg-latar/40 px-5">
        <NavBarProfile />
        {children}
      </div>
    </div>
  );
}

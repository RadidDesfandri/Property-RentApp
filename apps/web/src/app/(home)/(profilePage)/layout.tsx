import "./globals.css";
import NavBarProfile from "./profile/_components/Navbarprofile";
import SideBarProfile from "./profile/_components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <div className="mx-auto flex w-full justify-between">
        <SideBarProfile />
        <main className="flex-1 bg-latar/40 px-5">
          <NavBarProfile />
          {children}
        </main>
      </div>
    </main>
  );
}

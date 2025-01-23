import NavBar from "./dashboard/_components/NavBar";
import SideBarDashboard from "./dashboard/_components/SideBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <div className="mx-auto flex w-full justify-between">
        <SideBarDashboard />
        <main className="flex-1 bg-latar/40 px-5">
          <NavBar />
          {children}
        </main>
      </div>
    </main>
  );
}

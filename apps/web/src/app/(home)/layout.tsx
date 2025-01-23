import ToastComp from "@/components/ToastComp";
import "./globals.css";
import { Raleway } from "next/font/google";
const raleway = Raleway({
  subsets: ["latin"],
  weight: ['100','400','500']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${raleway.className} font-[400]`}>
      <ToastComp />
      {children}
    </div>
  );
}

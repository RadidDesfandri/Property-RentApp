import Footer from "@/components/Footer";
import ReservationNav from "./_components/reservationNav";
import { Raleway } from "@next/font/google";
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
    <div className={`${raleway.className} font-[400] flex min-h-screen flex-col`}>
      <ReservationNav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

// ${raleway.className}

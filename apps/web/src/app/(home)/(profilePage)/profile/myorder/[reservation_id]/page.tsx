import MyReservationDetail from "./_components";
import { Raleway } from "@next/font/google";
import "@smastrom/react-rating/style.css";
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "500"],
});

export default function MyOrderDetail() {
  return (
    <div className={`rounded-xl my-2 lg:py-10 bg-white font-[400] ${raleway.className}`}>
      <MyReservationDetail />
    </div>
  );
}

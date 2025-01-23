import Image from "next/image";
import { FaStar } from "react-icons/fa";
import FeedbackModal from "./feeedback";
import { id } from "date-fns/locale";
interface IProps {
  username: string;
  propName: string;
  content: string;
  rating: string;
  avatar: string;
  id: number;
  feedback: string | null;
}
export default function ReviewList({
  username,
  propName,
  content,
  rating,
  avatar,
  feedback,
  id,
}: IProps) {
  return (
    <div className="flex min-h-[250px] flex-col gap-2 border-b-2 py-6 lg:flex-row lg:gap-4">
      <Image
        src={avatar ? `${avatar}` : "/dummy/profilDummy.jpg"}
        width={200}
        height={200}
        alt="profilpic"
        className="h-[50px] w-[50px] rounded-full object-cover lg:h-[100px] lg:w-[100px]"
      />
      <div className="flex flex-col lg:min-w-[150px]">
        <h3 className="text-lg font-semibold">{username}</h3>
        <h3 className="text-btn">{propName}</h3>
      </div>
      <div className="flex flex-col items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-xl">
            <FaStar className="text-xl text-yellow-400" />
            <p className="font-medium">{rating}/5</p>
          </div>
          <p className="text-sm">{content}</p>
        </div>
        {feedback ? (
          <>
            <div className="flex flex-col mt-4">
              <h3 className="font-semibold">Balasan Anda : </h3>

              <p className="text-sm">{feedback}</p>
            </div>
          </>
        ) : (
          <FeedbackModal id={id} />
        )}
      </div>
    </div>
  );
}

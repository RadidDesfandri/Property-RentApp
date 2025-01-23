import Image from "next/image";
export default function PropInfo() {
  return (
    <div className="w-[60%] rounded-xl border-2 p-4 mt-4">
      <h1 className="text-lg font-bold mb-4">Room & Property</h1>
      <div className="flex gap-2" >
        <Image
          src={"/dummy/kamar.jpg"}
          width={500}
          height={500}
          alt="kamar"
          className="w-[150px] rounded-lg"
        />
        <div className="flex flex-col justify-start">
          <h2 className="text-sm font-light">Deluxe</h2>
          <h2 className="font-semibold text-lg">IBIS</h2>
          <h2 className="mt-2 justify-self-end">Bandung</h2>
        </div>
      </div>
    </div>
  );
}

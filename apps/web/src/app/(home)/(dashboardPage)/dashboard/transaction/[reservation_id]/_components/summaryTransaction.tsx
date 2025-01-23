interface IProps {
  booking_id: String;
  property: string;
  room: string;
  location: string;
  checkin: string;
  checkout: string;
  username: string;
  email: string;
  phone: string;
}
export default function SummaryTransaction({
  booking_id,
  property,
  room,
  location,
  checkin,
  checkout,
  username,
  email,
  phone,
}: IProps) {
  const info = [
    { text: "Booking id", info: booking_id },
    { text: "Property", info: property },
    { text: "Room", info: room },
    { text: "Lokasi", info: location },
    { text: "Check-in", info: checkin },
    { text: "Check-out", info: checkout },
  ];

  const customers = [
    { text: "Nama", info: username },
    { text: "Email", info: email },
    { text: "No.Handphone", info: `+62 ${phone}` },
  ];
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold">Ringkasan</h1>
      <div className="mb-2 mt-4 border-b-2"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between">
        <div className="flex flex-col gap-2">
          {info.map((item, idx) => {
            return (
              <div key={idx} className="flex gap-4 font-medium">
                <p className="min-w-[80px] text-gray-500">{item.text}</p>
                <p className="text-gray-500">:</p>
                <p className={`col-span-2`}>{item.info as string}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Pemesan</p>
          {customers.map((item, idx) => {
            return (
              <div key={idx} className="flex gap-4 font-medium">
                <p className="text-gray-500 lg:min-w-[120px]">{item.text}</p>
                <p className="text-gray-500">:</p>
                <p
                  className={`${item.text == "Email" ? "text-blue-500 underline underline-offset-1" : ""} col-span-2`}
                >
                  {item.info}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

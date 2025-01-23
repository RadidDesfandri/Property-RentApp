import ListCardOrder from "./ListCardOrder";

const MyOrderpage = () => {
  return (
    <div className="mt-6 pb-10 md:mt-0 lg:px-5 bg-white  py-2 rounded-xl">
      <p className="text-2xl px-2 font-semibold">Pesanan saya</p>
      
      <ListCardOrder />
    </div>
  );
};

export default MyOrderpage;


import SalesProperty from "./_components/salesProperty";
import SalesTransaction from "./_components/salesTransaction";
import SalesUser from "./_components/salesUser";

export default function SalesReport() {
  return (
    <div className="flex flex-col w-full my-2 gap-4 rounded-xl bg-white p-4">
      <SalesTransaction/>
      <SalesProperty/>
      <SalesUser />
    </div>
  );
}

import Link from "next/link";

const HeaderSpin = () => {
  return (
    <div className="flex justify-between  bg-teal-500  w-[360px] mx-auto">
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
        <Link href="info" >Info</Link>
      </div>
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
        Tobulinimai
      </div>
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
      <Link href="pages" >Ridenk</Link>
      </div>
    </div>
  );
};
export default HeaderSpin;

import Link from "next/link";

const HeaderSpin = () => {
  return (
    <div className="flex justify-around  bg-teal-600  sm:rounded-t-lg myShadow w-[360px] mx-auto">
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
        <Link href="/games/spin/info" >Info</Link>
      </div>
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
        <Link href="/games/spin/upgrade">Tobulinimai</Link>
      </div>
      <div className="p-1 hover:scale-110  cursor-pointer hover:text-gray-300 transition-all duration-500">
      <Link href="/games/spin" >Ridenk</Link>
      </div>
    </div>
  );
};
export default HeaderSpin;

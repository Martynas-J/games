const Upgrade = () => {
  return (
    <div className="pt-2 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Patobulinimai</h1>
      <div className="flex gap-5 items-center">
        <div className="hover:scale-110  cursor-pointer bg-gradient-to-r from-lime-900 to-green-400 w-16 h-16 p-1 rounded-2xl  border-2 myShadow border-lime-950 flex justify-center items-center">
          <div>
            <span className=" text-lg font-serif text-[32px] font-bold">I</span>
            <div className="text-[14px]">3M</div>
          </div>
        </div>
        <div>
          Visam laikui{" "}
          <span className="text-green-600 font-semibold">X2</span>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <div className="hover:scale-110  cursor-pointer bg-gradient-to-r from-pink-950 to-red-400 w-16 h-16 p-1 rounded-2xl  border-2 myShadow border-red-950 flex justify-center items-center">
          <div>
            <span className=" text-lg font-serif text-[32px] font-bold">I</span>
            <div className="text-[14px]">10M</div>
          </div>
        </div>
        <div>
          Pridėti sekmės{" "}
          <span className="text-green-600 font-semibold">10%</span>
        </div>
      </div>


    </div>
  );
};
export default Upgrade;

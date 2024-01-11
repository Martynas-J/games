import Image from "next/image";

const Info = () => {
  const time = [1, 2, 3];
  return (
    <div>
      <div className="flex items-center">
        {time.map((_, index) => (
          <div
            key={index}
            className={`mt-2 myShadowOut  w-10 h-10 rounded-full mx-1`}
          ></div>
        ))}
        <span className="px-2">-</span>
        <span className="text-xs w-36">
          {" "}
          Surink vienodus Rutulius ir laimėk pinigų
        </span>
      </div>
      <div className="flex justify-between items-start ">
        <div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-blue-300 to-blue-50`}
            >
              <span className="text-[10px]">Normal </span>
            </div>
            <span className=""> +1 Euras </span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-orange-500  to-orange-100`}
            >
              <span className="text-[10px]">Rare </span>
            </div>
            <span className=""> +50 Eurų </span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-blue-700  to-blue-300 border border-gray-200`}
            >
              <span className="text-[10px]">Blue </span>
            </div>
            <span className=""> +500 Eurų </span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-yellow-700  to-yellow-200 border border-blue-300`}
            >
              <span className="text-[10px]">Gold </span>
            </div>
            <span className=""> +1K Eurų </span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-gray-300 to-gray-400  border border-yellow-200`}
            >
              <span className="text-[10px]">Platina </span>
            </div>
            <span className=""> +50K Eurų </span>
          </div>
          <div className="flex items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-purple-500 to-purple-100`}
            >
              <span className="text-[10px]">Nova </span>
            </div>
            <span className=""> +1M Eurų </span>
          </div>
        </div>
        <div className="w-[170px]">
          <div className="flex justify-center items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadow  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-green-300 to-green-200  hover:from-green-300 hover:to-green-100`}
            >
              <span className="">+5 </span>
            </div>
            <div className="text-xs w-[120px] "> nuo 5 iki 100 sukimų</div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <div
              className={`flex justify-center items-center  myShadow  w-10 h-10 rounded-full mx-1 bg-gradient-to-r from-blue-500 to-blue-200  hover:from-blue-400 hover:to-blue-100`}
            >
              <span className="">X5 </span>
            </div>
            <div className="text-xs w-[120px] ">
              5 sukimai ir laimėjimas X5{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;

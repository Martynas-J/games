import Balls from "../components/balls/Balls";
import { ballsData } from "../config/config";

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
          {ballsData.map((data, index) => (
            <Balls key={index} {...data} texts={true} />
          ))}
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

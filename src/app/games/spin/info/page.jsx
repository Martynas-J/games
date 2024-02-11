import CardElement from "../components/Cards/CardElement";
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
      </div>
    </div>
  );
};
export default Info;

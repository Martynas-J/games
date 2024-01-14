import Balls from "../components/balls/Balls";
import { ballsData } from "../config/config";

const Wins = () => {
  return (
    <div className="flex justify-between items-start ">
      {ballsData.map((data, index) => (
        <div key={index}>
          <Balls {...data} text={false} />
          <div>Ar turite</div>
        </div>
      ))}
    </div>
  );
};
export default Wins;

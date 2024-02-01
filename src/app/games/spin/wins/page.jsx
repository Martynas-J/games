"use client";
import { useSession } from "next-auth/react";
import Balls from "../components/balls/Balls";
import { NeedBallsForReward, ballsData } from "../config/config";
import Loading from "@/components/Loading/Loading";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import ProgressBar from "../components/brogressBar/progresBar";

const Wins = () => {
  const session = useSession();
  const { result, isLoading } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );

  if (isLoading) {
    return <Loading />;
  }

  const allBalls = [
    result?.ballsNormal,
    result?.ballsRare,
    result?.ballsBlue,
    result?.ballsGold,
    result?.ballsPlatina,
    result?.ballsNova,
  ];
  return (
    <div className="flex flex-col ">
       <h2 className="text-xl">Coming soon...</h2>
      {ballsData.map((data, index) => {
        const number = formatLargeNumber(allBalls[index] || 0);
        return (
          <div key={index} className="  flex items-center gap-1">
           
            <Balls {...data} text={false} />
            <ProgressBar
              lvl={0}
              numberMin={number}
              numberMax={NeedBallsForReward[1]}
              valueBefore={NeedBallsForReward[0]}
              type="numbers"
            />

            <button className=" myShadow bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-1 rounded-full shadow-md">
              Pasiimti
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Wins;

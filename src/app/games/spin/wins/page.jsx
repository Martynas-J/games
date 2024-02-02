"use client";
import { useSession } from "next-auth/react";
import Balls from "../components/balls/Balls";
import {
  NeedBallsForReward,
  ballsData,
  rewardForBalls,
} from "../config/config";
import Loading from "@/components/Loading/Loading";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import ProgressBar from "../components/brogressBar/progresBar";
import { updateResultData } from "@/components/updateResultData";

const Wins = () => {
  const session = useSession();
  const { result, isLoading, mutate } = FromDb(
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
  const rewardsDb = result?.rewards || {
    normalReward: 0,
    rareReward: 0,
    blueReward: 0,
    goldReward: 0,
    platinaReward: 0,
    novaReward: 0,
  };
  // console.log(rewardsDb);

  const saveResult = async (reward, rewardsLvl, rewardsKey) => {
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: result?.spinMoney + reward,
          rewards: {
            ...result?.rewards,
            [rewardsKey]: rewardsLvl + 1,
          },
        },
        "saveSpinResults"
      );
      if (response.ok) {
        mutate();
      } else {
        console.error("Failed to save the result.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-1 ">
      <h2 className="text-xl">Pinigai: {result?.spinMoney}</h2>
      {ballsData.map((data, index) => {
        const number = allBalls[index] || 0;
        const key = Object.keys(rewardsDb)[index];
        const rewardsLvl = rewardsDb[key];
        const rewards =
          rewardForBalls[rewardsLvl] *
          Math.pow(index + 1, rewardForBalls.length - 1 ? 5 : 4);
        const allowed = number >= NeedBallsForReward[rewardsLvl];

        return (
          <div key={index} className="  flex items-center gap-1">
            <Balls {...data} text={false} />
            <ProgressBar
              lvl={0}
              numberMin={number}
              numberMax={NeedBallsForReward[rewardsLvl]}
              valueBefore={NeedBallsForReward[rewardsLvl > 0 && rewardsLvl - 1]}
              type="numbers"
            />

            <button
              onClick={
                allowed ? () => saveResult(rewards, rewardsLvl, key) : null
              }
              className={` ${
                allowed
                  ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
                  : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
              } myShadow  px-1 py-1 rounded-full shadow-md min-w-[90px]`}
            >
              +{formatLargeNumber(rewards, rewardsLvl, key)}€
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Wins;

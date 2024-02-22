"use client";
import { useSession } from "next-auth/react";
import Balls from "../components/balls/Balls";
import {
  NeedBallsForReward,
  ballsData,
  dayRewards,
  rewardForBalls,
} from "../config/config";
import Loading from "@/components/Loading/Loading";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import ProgressBar from "../components/brogressBar/progresBar";
import { updateResultData } from "@/components/updateResultData";
import { addDays, format, setHours, setMinutes, setSeconds } from "date-fns";
import { lt } from "date-fns/locale";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wins = () => {
  const session = useSession();
  const { result, isLoading, mutate } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );

  if (isLoading) {
    return <Loading />;
  }
  if (!result?.spins) {
    return <div>Pasuk nors kartą ir sužinosi</div>;
  }
  const allowed = true;
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

  const now = new Date();
  let dailyRewardData = result?.dailyRewardData || 0;

  const saveResult = async (
    reward,
    rewardsLvl,
    rewardsKey,
    dailyRewardData
  ) => {
    if (!rewardsKey) {
      reward = reward * (result?.level + 1);
    }
    if (dailyRewardData) {
      dailyRewardData = setSeconds(
        setMinutes(setHours(addDays(new Date(), 1), 0), 0),
        0
      );
    }
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: result?.spinMoney + reward,
          ...(rewardsKey && {
            rewards: { ...result?.rewards, [rewardsKey]: rewardsLvl + 1 },
          }),
          ...(dailyRewardData && {
            dailyRewardData,
          }),
        },
        "saveSpinResults"
      );
      if (response.ok) {
        toast.info(`Gavote +${formatLargeNumber(reward)}€`);
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
      <h2 className="text-xl">
        Pinigai: {formatLargeNumber(result?.spinMoney)}€
      </h2>
      <button
        onClick={
          now >= new Date(dailyRewardData)
            ? () =>
                saveResult(
                  dayRewards[Math.floor(Math.random() * 11)],
                  "",
                  "",
                  dailyRewardData
                )
            : null
        }
        className={` ${
          now >= new Date(dailyRewardData)
            ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
            : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
        } myShadow  px-1 py-1 rounded-full shadow-md min-w-[90px]`}
      >
        Dienos prizas
      </button>
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
              +{formatLargeNumber(rewards)}€
            </button>
          </div>
        );
      })}
      <div className=" border-t-2 mt-2 bg-blue-200 rounded-3xl -m-2 p-2">
        <div>Surink 5k sukimų Surink 5k sukimų Surink 5k sukimų</div>
        <div className="flex items-center gap-1">
          <ProgressBar
            lvl={0}
            numberMin={5}
            numberMax={100}
            valueBefore={0}
            type="numbers"
          />
          <button
            // onClick={
            //   allowed ? () => saveResult(rewards, rewardsLvl, key) : null
            // }
            className={` ${
              allowed
                ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
                : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
            } myShadow  px-1 py-1 rounded-full shadow-md min-w-[90px]`}
          >
            +{formatLargeNumber(50000)}€
          </button>
        </div>
      </div>
    </div>
  );
};
export default Wins;

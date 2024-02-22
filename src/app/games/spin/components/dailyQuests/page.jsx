"use client";
import { formatLargeNumber } from "@/components/Functions/simpleFunctions";
import ProgressBar from "../brogressBar/progresBar";

const DailyQuests = ({ result }) => {
  if (!result) {
    return;
  }

  const {
    spinMoney,
    bestWin,
    spins,
    upgradeX,
    upgradeLucky,
    upgradeSpeed,
    allTimeMoney,
    ballsNormal,
    ballsRare,
    ballsBlue,
    ballsGold,
    ballsPlatina,
    ballsNova,
    level,
    cardsData,
  } = result;
  const needSpinsByLvl = (level || 1) * 500;

  const needNumber = (nr) => (level || 1) * nr;
  const quests = [
    {
      title: `Išsuk ${formatLargeNumber(needNumber(50000))} sukimų`,
      condition: needNumber(50000),
      conditionItem: 0,
      isDone: spins >= needNumber(50000),
      reward: needNumber(50000),
    },
    {
      title: `Surink ${formatLargeNumber(needNumber(50))} Normal`,
      condition: needNumber(500),
      isDone: spins >= needSpinsByLvl,
      reward: "Card",
    },
  ];
  console.log(quests[0]);
  const allowed = true;
  return (
    <div className=" border-t-2 mt-2 bg-blue-200 rounded-3xl -m-2 p-2">
      <div>Coming soon !!!</div>
      <div>{quests[0].title}</div>
      <div className="flex items-center gap-1">
        <ProgressBar
          lvl={0}
          numberMin={quests[0].conditionItem}
          numberMax={quests[0].condition}
          valueBefore={0}
          type="numbers"
        />
        <button
          // onClick={
          //   allowed ? () => saveResult(rewards, rewardsLvl, key) : null
          // }
          className={` ${
            quests[0].isDone
              ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
              : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
          } myShadow  px-1 py-1 rounded-full shadow-md min-w-[90px]`}
        >
          +{formatLargeNumber(quests[0].reward)}€
        </button>
      </div>
    </div>
  );
};
export default DailyQuests;

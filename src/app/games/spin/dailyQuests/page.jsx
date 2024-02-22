"use client";
import { formatLargeNumber } from "@/components/Functions/simpleFunctions";
import ProgressBar from "../components/brogressBar/progresBar";

const DailyQuests = () => {
  const allowed = true;
  return (
    <div className="py-3">
      <div className="flex items-center gap-1">
        <div>uzduotis</div>
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
  );
};
export default DailyQuests;

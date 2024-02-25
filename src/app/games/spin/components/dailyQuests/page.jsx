"use client";
import { formatLargeNumber } from "@/components/Functions/simpleFunctions";
import ProgressBar from "../brogressBar/progresBar";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";

const DailyQuests = ({
  spinsNow,
  updateState,
  dailyQuestsData,
  level,
  winBalls,
  result,
}) => {
  if ((!spinsNow, !dailyQuestsData, !level, !winBalls)) {
    return null;
  }

  const now = new Date();
  if (now >= new Date(dailyQuestsData?.date)) {
    const nextDayData = {
      date: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 0), 0), 0),
      condition: spinsNow,
      question: 0,
    };
    updateState(0, nextDayData);
  }

  const needNumber = (nr) => (result.level || 1) * nr;
  const needMoney = (nr) => (result.level ** 1 * 2 || 1) * nr;
  const quests = [
    {
      title: `Išsuk ${formatLargeNumber(needNumber(100))} sukimų`,
      conditionName: "spins",
      conditionItem: spinsNow,
      condition: needNumber(100),
      conditionString: spinsNow - dailyQuestsData.condition,
      isDone: spinsNow - dailyQuestsData?.condition >= needNumber(100),
      reward: needMoney(10000),
    },
    {
      title: (
        <div>
          Surink{" "}
          <span className="text-green-700">
            {formatLargeNumber(needNumber(5))}{" "}
          </span>
          <span className="font-bold">Normal</span>
        </div>
      ),
      conditionName: "Normal",
      conditionItem: winBalls.Normal,
      condition: needNumber(5),
      conditionString: winBalls.Normal - dailyQuestsData.condition,
      isDone: winBalls.Normal - dailyQuestsData?.condition >= needNumber(5),
      reward: needMoney(15000),
    },
    {
      title: (
        <div>
          Surink{" "}
          <span className="text-green-700">
            {formatLargeNumber(needNumber(4))}{" "}
          </span>
          <span className="font-bold">Rare</span>
        </div>
      ),
      conditionName: "Rare",
      conditionItem: winBalls.Rare,
      condition: needNumber(4),
      conditionString: winBalls.Rare - dailyQuestsData.condition,
      isDone: winBalls.Rare - dailyQuestsData?.condition >= needNumber(4),
      reward: needMoney(20000),
    },
    {
      title: (
        <div>
          Surink{" "}
          <span className="text-green-700">
            {formatLargeNumber(needNumber(3))}{" "}
          </span>
          <span className="font-bold">Blue</span>
        </div>
      ),
      conditionName: "Blue",
      conditionItem: winBalls.Blue,
      condition: needNumber(3),
      conditionString: winBalls.Blue - dailyQuestsData.condition,
      isDone: winBalls.Blue - dailyQuestsData?.condition >= needNumber(3),
      reward: needMoney(25000),
    },
    {
      title: (
        <div>
          Surink{" "}
          <span className="text-green-700">
            {formatLargeNumber(needNumber(2))}{" "}
          </span>
          <span className="font-bold">Gold</span>{" "}
        </div>
      ),
      conditionName: "Gold",
      conditionItem: winBalls.Gold,
      condition: needNumber(2),
      conditionString: winBalls.Gold - dailyQuestsData.condition,
      isDone: winBalls.Gold - dailyQuestsData?.condition >= needNumber(2),
      reward: needNumber(30000),
    },
    {
      title: (
        <div>
          Surink{" "}
          <span className="text-green-700">
            {formatLargeNumber(needNumber(1))}{" "}
          </span>{" "}
          <span className="font-bold">Platina</span>{" "}
        </div>
      ),
      conditionName: "Platina",
      conditionItem: winBalls.Platina,
      condition: needNumber(1),
      conditionString: winBalls.Platina - dailyQuestsData.condition,
      isDone: winBalls.Platina - dailyQuestsData?.condition >= needNumber(1),
      reward: needNumber(500000),
    },
    {
      title: (
        <div>
          Surink <span className="text-green-700">1</span>{" "}
          <span className="font-bold">Nova</span> kamuoliuką
        </div>
      ),
      conditionName: "Nova",
      conditionItem: winBalls.Platina,
      condition: 1,
      conditionString: winBalls.Platina - dailyQuestsData.condition,
      isDone: winBalls.Platina - dailyQuestsData?.condition >= 1,
      reward: needNumber(500000),
    },
    {
      title: "Surinkote visas užduotis",
      conditionName: "Nex Day",
      conditionItem: 0,
      condition: 0,
      conditionString: 0,
      isDone: false,
      reward: 0,
    },
  ];

  const questionNr = dailyQuestsData.question;
  const updateDate = (moneyPlus) => {
    const nextDayData = {
      date: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 0), 0), 0),
      condition: quests[questionNr + 1].conditionItem,
      question: dailyQuestsData.question + 1,
    };
    updateState(moneyPlus, nextDayData, questionNr);
  };

  return (
    <div className="border-t-2 border-t-gray-500 mt-2 shadow-3xl rounded-3xl -m-2 p-2">
      <div className="font-bold text-lg mb-2 font-serif border-b-2">
        DIENOS UŽDUOTYS
      </div>
      {questionNr < 7 ? (
        <>
          <div className="flex flex-col font-semibold text-gray-800 text-[18px]">
            {" "}
            <div className="">{questionNr + 1}. </div>
            <div>{quests[questionNr].title}</div>
          </div>
          <div className="flex items-center gap-2">
            <ProgressBar
              lvl={0}
              numberMin={quests[questionNr].conditionString}
              numberMax={quests[questionNr].condition}
              valueBefore={0}
              type="numbers"
            />
            <button
              onClick={
                quests[questionNr].isDone
                  ? () => updateDate(quests[questionNr].reward)
                  : null
              }
              className={`${
                quests[questionNr].isDone
                  ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white cursor-pointer"
                  : "bg-gradient-to-r from-blue-400 to-blue-600 text-black cursor-not-allowed"
              } myShadow px-3 py-1 rounded-full shadow-md min-w-[90px]`}
              disabled={!quests[questionNr].isDone}
            >
              +{formatLargeNumber(quests[questionNr].reward)}€
            </button>
          </div>
        </>
      ) : (
        <div className="font-semibold text-gray-600">Laukite kitos dienos</div>
      )}
    </div>
  );
};
export default DailyQuests;

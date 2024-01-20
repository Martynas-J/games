"use client";
import { FromDb, formatLargeNumber } from "@/components/Functions/simpleFunctions";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  checkIntervals,
  intervalColors,
  spinOptions,
  winMappings,
} from "./config/config";
import Loading from "@/components/Loading/Loading";

const Engine = () => {
  const session = useSession();
  const { result, isLoading} = FromDb(`getSpinResults/${session.data?.user.name}`)
  useEffect(() => {
    if (result) {
      const {
        spinMoney,
        bestWin,
        spins,
        upgradeX,
        upgradeLucky,
        allTimeMoney,
        ballsNormal,
        ballsRare,
        ballsBlue,
        ballsGold,
        ballsPlatina,
        ballsNova,
      } = result;

      setMoney(spinMoney);
      setBiggestWin(bestWin);
      setSpins(spins);
      setUpgradeX(upgradeX === 0 ? 1 : upgradeX);
      setUpgradeLucky(upgradeLucky);
      setAllMoney(allTimeMoney);
      setWinBalls({
        Normal: ballsNormal,
        Rare: ballsRare,
        Blue: ballsBlue,
        Gold: ballsGold,
        Platina: ballsPlatina,
        Nova: ballsNova,
      });
    }
  }, [result]);

  const [results, setResults] = useState(["", "", ""]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervals, setIntervals] = useState([0, 0, 0]);
  const [winBalls, setWinBalls] = useState({
    Normal: 0,
    Rare: 0,
    Blue: 0,
    Gold: 0,
    Platina: 0,
    Nova: 0,
  });
  const [money, setMoney] = useState(10);
  const [allMoney, setAllMoney] = useState(0);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [biggestWin, setBiggestWin] = useState(0);
  const [upgradeX, setUpgradeX] = useState(1);
  const [upgradeLucky, setUpgradeLucky] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const renderSpinOption = ({ amount, cost, multiplier = 1 }, index) => {
    const buttonType = index < 4;

    const canAutoSpin =
      money >= cost && !isSpinning && multiply === 1 && !buttonClicked;

    const canBay = money >= cost;

    const gradientColors = buttonType
      ? "bg-gradient-to-r from-green-300 to-green-200  hover:from-green-300 hover:to-green-100"
      : "bg-gradient-to-r from-blue-500 to-blue-200  hover:from-blue-400 hover:to-blue-100";

    const buttonClass = `myShadow w-14 h-14 ${gradientColors} hover:cursor-pointer hover:xl  rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg `;

    const textStyle = ` ${
      canBay
        ? canAutoSpin
          ? ""
          : "cursor-not-allowed text-gray-800"
        : "text-red-800 font-bold cursor-not-allowed"
    }`;

    return (
      <div
        onClick={() =>
          canAutoSpin ? autoSpin(amount, cost, multiplier) : null
        }
        className={buttonClass}
      >
        <div className={textStyle}>
          <span className="text-lg">
            {buttonType ? "+" : "X"}
            {amount}
          </span>
          <div className="text-[8px]">-{formatLargeNumber(cost)}€</div>
        </div>
      </div>
    );
  };

  const saveResult = async () => {
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: money,
          spins: spins,
          bestWin: biggestWin,
          allTimeMoney: allMoney,
          ballsNormal: winBalls.Normal,
          ballsRare: winBalls.Rare,
          ballsBlue: winBalls.Blue,
          ballsGold: winBalls.Gold,
          ballsPlatina: winBalls.Platina,
          ballsNova: winBalls.Nova,
        },
        "saveSpinResults"
      );
      if (response.ok) {
      } else {
        console.error("Failed to save the result.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const spinSlotMachine = () => {
    setIsSpinning(true);
    setSpins((prev) => prev + 1);
    const newResults = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 99) + 1
    );

    setTimeout(() => {
      setIsSpinning(false);
      setResults(newResults);
      setIntervals(
        newResults.map((value) => checkIntervals(value, upgradeLucky))
      );
      MoneyPlusHandler(newResults);
    }, 1000);
  };

  const MoneyPlusHandler = (newResults) => {
    const winMultiplier = winMappings[newResults[0]] || 1;
    const isAllResultsSame = newResults.every(
      (value) => value === newResults[0]
    );
    const moneyPlus = isAllResultsSame
      ? winMultiplier * multiply * upgradeX
      : 1 * multiply * upgradeX;
    isAllResultsSame &&
      setWinBalls((prev) => ({
        ...prev,
        [newResults[0]]: prev[newResults[0]] + 1,
      }));

    // setWinBalls([newResults[0]]);
    setWinMoney(moneyPlus);
    setBiggestWin((prev) => Math.max(prev, moneyPlus));
  };
  const autoSpin = async (nr, cost, multiply) => {
    setButtonClicked(true);
    setMoney((prev) => prev - cost);
    setMultiply(multiply);
    let spinsLeft = nr;
    for (let i = 0; i < nr; i++) {
      spinsLeft--;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      spinSlotMachine();
    }
    setTimeout(() => {
      setMultiply(1);
      setButtonClicked(false);
    }, 1500);
  };

  useEffect(() => {
    if (results[0] > 0) {
      MoneyPlusHandler(intervals);
      setAddMoney(true);
    }
  }, [results]);

  useEffect(() => {
    if (addMoney) {
      setAddMoney(false);
      setMoney((prevMoney) => prevMoney + winMoney);
      setAllMoney((prev) => prev + winMoney);
      session.data ? saveResult() : "";
    }
  }, [addMoney]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="text-2xl font-bold text-gray-800 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-600">Losimas: </span>
          <span className="text-blue-500">{formatLargeNumber(spins)}</span>
        </div>{" "}
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-600">
            Viso laiko laimėta:{" "}
            <span className="text-green-500">
              {formatLargeNumber(allMoney)}€
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Top win:{" "}
            <span className="text-red-500">
              {formatLargeNumber(biggestWin, 0)}€
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {formatLargeNumber(money)}€
          </div>
        </div>
      </div>

      <div
        className={`mb-5 h-10 ${
          winMoney > 2 ? "text-[34px] text-lime-700" : ""
        } text-xl font-bold text-gray-800`}
      >
        {!isSpinning && winMoney
          ? `+ ${formatLargeNumber(winMoney)} €`
          : isSpinning && (
              <div className="flex justify-center items-center">
                <div className="w-[34px] h-[34px] border-t-4 border-blue-500 border-solid animate-spin rounded-full"></div>
              </div>
            )}
      </div>

      <div
        className={`flex justify-center space-x-4 slot-machine ${
          isSpinning ? "spinning" : ""
        }`}
      >
        {intervals.map((value, index) => (
          <div key={index} className={`relative `}>
            <div
              className={` myShadowOut border-teal-500 w-24 h-24 border-2  border-solid rounded-full 
      ${value === 0 ? "bg-gradient-to-r from-black to-white" : ""}
      ${isSpinning ? "animate-[spin_1s_ease-in-out]" : ""} ${
                intervalColors[value] || ""
              }
      transition-opacity
      `}
              style={{ animationDelay: `${index * 0.3}s` }}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-lg font-bold transition-opacity duration-5000 ease-in-out ${
                isSpinning ? "opacity-0" : "text-black"
              }`}
            >
              <span className=" text-gray-800">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className=" relative">
        <button
          className={` myShadow m-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white hover:scale-95 font-bold py-4 px-5 text-xl rounded-full transform transition-transform  shadow-md ${
            isSpinning ? "cursor-not-allowed" : ""
          }`}
          onClick={
            isSpinning || multiply > 1 || buttonClicked ? null : spinSlotMachine
          }
        >
          Sukti!
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center gap-5">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {spinOptions.map((option, index) => (
              <div key={index}> {renderSpinOption(option, index)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine;

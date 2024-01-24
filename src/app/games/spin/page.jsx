"use client";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  ballsData,
  checkIntervals,
  intervalColors,
  premiumMoney,
  premiumSpins,
  spinOptions,
  winMappings,
} from "./config/config";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Balls from "./components/balls/Balls";

const Engine = () => {
  const session = useSession();
  const { result, isLoading } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );
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
        level,
      } = result;

      setMoney(spinMoney);
      setBiggestWin(bestWin);
      setSpins(spins);
      setUpgradeX(upgradeX === 0 ? 1 : upgradeX);
      setUpgradeLucky(upgradeLucky);
      setAllMoney(allTimeMoney);
      setLvl(level);
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
  const [winBallsNow, setWinBallsNow] = useState({
    Normal: 0,
    Rare: 0,
    Blue: 0,
    Gold: 0,
    Platina: 0,
    Nova: 0,
  });
  const [winBallsToday, setWinBallsToday] = useState({
    Normal: 0,
    Rare: 0,
    Blue: 0,
    Gold: 0,
    Platina: 0,
    Nova: 0,
  });
  const [isToggled, setToggled] = useState(false);

  const [money, setMoney] = useState(10);
  const [momentMoney, setMomentMoney] = useState(0);
  const [leftSpins, setLeftSpins] = useState(0);
  const [leftSpinsMax, setLeftSpinsMax] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [allMoney, setAllMoney] = useState(0);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [biggestWin, setBiggestWin] = useState(0);
  const [upgradeX, setUpgradeX] = useState(1);
  const [upgradeLucky, setUpgradeLucky] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const renderSpinOption = ({ amount, cost, multiplier = 1 }, index) => {
    const buttonType = index < 4;

    const canAutoSpin =
      money >= cost && !isSpinning && multiply === 1 && !buttonClicked;

    const canBay = money >= cost;

    const gradientColors = buttonType
      ? "bg-gradient-to-r from-green-300 to-green-200  hover:from-green-300 hover:to-green-100"
      : "bg-gradient-to-r from-blue-500 to-blue-200  hover:from-blue-400 hover:to-blue-100";

    const buttonClass = `myShadow w-14 h-14 ${gradientColors} hover:cursor-pointer hover:xl  rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg `;

    const textStyle = ` ${canBay
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
  const resetAllResults = () => {
    setWinBallsToday({
      Normal: 0,
      Rare: 0,
      Blue: 0,
      Gold: 0,
      Platina: 0,
      Nova: 0,
    });
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
          level: lvl,
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

  const spinSlotMachine = (spinsLeft) => {
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
      setLeftSpins(spinsLeft);
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
    if (isAllResultsSame) {
      setWinBalls((prev) => ({
        ...prev,
        [newResults[0]]: prev[newResults[0]] + 1,
      }));

      setWinBallsNow((prev) => ({
        ...prev,
        [newResults[0]]: prev[newResults[0]] + 1,
      }));
      setWinBallsToday((prev) => ({
        ...prev,
        [newResults[0]]: prev[newResults[0]] + 1,
      }));

    }

    setWinMoney(moneyPlus);
    setBiggestWin((prev) => Math.max(prev, moneyPlus));
  };
  const autoSpin = async (nr, cost, multiply) => {
    resetAllResults()
    setToggled(false)
    setMomentMoney(0);
    setButtonClicked(true);
    setMoney((prev) => prev - cost);
    setMultiply(multiply);
    let spinsLeft = nr;
    setLeftSpinsMax(nr);
    for (let i = 0; i < nr; i++) {
      spinsLeft--;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      spinSlotMachine(spinsLeft);
    }

    setTimeout(() => {
      setMultiply(1);
      setButtonClicked(false);
      setToggled(true);
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
      let addPremiumMoney = 0;

      if (spins >= premiumSpins[lvl]) {
        setLvl((prev) => prev + 1);
        addPremiumMoney = premiumMoney[lvl];
        toast.success(
          `Jūs pasiekėte: ${lvl + 1} lygi ir gavote ${formatLargeNumber(
            premiumMoney[lvl]
          )}€`
        );
      }

      setMoney((prevMoney) => prevMoney + winMoney + addPremiumMoney);
      setAllMoney((prev) => prev + winMoney + addPremiumMoney);
      setMomentMoney((prev) => prev + winMoney);
      session.data ? saveResult() : "";
    }
  }, [addMoney]);

  if (isLoading) {
    return <Loading />;
  }
  const progress = parseFloat(
    (
      (lvl === 0 ? spins * 100 : (spins - premiumSpins[lvl - 1]) * 100) /
      (lvl === 0
        ? premiumSpins[lvl]
        : premiumSpins[lvl] - premiumSpins[lvl - 1])
    ).toFixed(2)
  );
  const allValuesZero = Object.values(winBallsNow).every(value => value <= 0);
  return (
    <div className="relative">
      <div className="relative bg-slate-400 h-5 w-full rounded-lg overflow-hidden">
        <span
          className={`absolute left-0 rounded-2xl bg-gradient-to-r from-green-200 to-green-700 h-5  overflow-hidden`}
          style={{ width: `${progress}%` }}
        ></span>
        <span className="absolute left-[47%] text-black z-50 ">{`${progress}%`}</span>
      </div>
      <div className="  text-2xl font-bold text-gray-800 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-sm">
            <span className="text-gray-600">Lygis: </span>
            <span className="text-red-500">{lvl} lvl</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Losimas: </span>
            <span className="text-blue-500">{formatLargeNumber(spins)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-600">
            Iš viso laimėta:{" "}
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

      {isToggled && (
        <div
          onClick={handleToggle}
          className="p-2 absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-100/95 to-blue-300 inline-block h-auto w-auto hover:cursor-pointer border-2 border-teal-700 rounded-xl z-10"
        >
          <div>
            {allValuesZero ? "Nieko neišsukote :(" : ballsData.map((data, index) => (
              <div key={index}>

                {Object.values(winBallsToday)[index] > 0 && (
                  <div className="flex justify-start items-center gap-3">
                    <Balls {...data} text={false} />
                    <div className="text-green-950 font-bold">
                      {Object.values(winBallsToday)[index]}
                    </div>

                    (<div>+{Object.values(winBallsNow)[index]}</div>
                    <div className="text-green-950 font-bold">
                      <div className="text-green-950 font-normal">
                        +
                        {formatLargeNumber(Object.values(winBallsNow)[index]) *
                          Object.values(winMappings)[index]}
                        €
                      </div>)
                      +
                      {formatLargeNumber(Object.values(winBallsToday)[index]) *
                        Object.values(winMappings)[index]}
                      €
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-5">
        <div
          className={`text-lg w-10 h-10 ${momentMoney >= 10000
            ? "text-xl font-bold text-red-700"
            : momentMoney >= 1000
              ? "text-xl font-semibold text-green-500"
              : ""
            }`}
        >
          {momentMoney > 0 && "+" + formatLargeNumber(momentMoney) + "€"}
        </div>
        <div
          className={`  h-10 text-gray-800 ${winMoney <= 10
            ? "text-black text-[36px]"
            : winMoney <= 10000
              ? "text-lime-700 text-[36px]"
              : "text-red-600 text-[46px]"
            } text-xl font-bold`}
        >
          {!isSpinning && winMoney
            ? `+ ${formatLargeNumber(winMoney)} €`
            : isSpinning && (
              <div className="flex justify-center items-center">
                <div className="w-[34px] h-[34px] border-t-4 border-blue-500 border-solid animate-spin rounded-full"></div>
              </div>
            )}
        </div>

        <div className="w-10 h-10  myShadowOut  rounded-full ">
          {leftSpins > 0 && (
            <CircularProgressbar
              value={leftSpins}
              maxValue={leftSpinsMax}
              text={`${leftSpins}`}
              strokeWidth="50"
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "but",
                textSize: "34px",
                pathTransitionDuration: 0.5,
                marginTop: -100,
                // Colors
                pathColor: `rgba(0, 128, 128, ${leftSpinsMax / 10})`,
                textColor: "#000000",
                trailColor: "#e2dbdb",
                backgroundColor: "#0057fa",
              })}
            />
          )}
        </div>
      </div>
      <div
        className={`flex justify-center space-x-4 slot-machine ${isSpinning ? "spinning" : ""
          }`}
      >
        {intervals.map((value, index) => (
          <div key={index} className={`relative `}>
            <div
              className={` myShadowOut border-teal-500 w-24 h-24 border-2  border-solid rounded-full 
      ${value === 0 ? "bg-gradient-to-r from-black to-white" : ""}
      ${isSpinning ? "animate-[spin_1s_ease-in-out]" : ""} ${intervalColors[value] || ""
                }
      transition-opacity
      `}
              style={{ animationDelay: `${index * 0.3}s` }}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center text-lg font-bold transition-opacity duration-5000 ease-in-out ${isSpinning ? "opacity-0" : "text-black"
                }`}
            >
              <span className=" text-gray-800">{value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className=" relative">
        <button
          className={` myShadow m-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white hover:scale-95 font-bold py-4 px-5 text-xl rounded-full transform transition-transform  shadow-md ${isSpinning ? "cursor-not-allowed" : ""
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

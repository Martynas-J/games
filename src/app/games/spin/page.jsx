"use client";
import { useEffect, useState } from "react";

const Engine = () => {
  const [results, setResults] = useState(["", "", ""]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervals, setIntervals] = useState([0, 0, 0]);
  const [money, setMoney] = useState(10000);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [biggestWin, setBiggestWin] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const intervalColors = {
    Normal: "bg-gradient-to-r from-blue-300 to-blue-50 ",
    Rare: "bg-gradient-to-r from-orange-500  to-orange-100",
    Blue: "bg-gradient-to-r from-blue-700  to-blue-300 border border-gray-200",
    Gold: "bg-gradient-to-r from-yellow-700  to-yellow-200 border border-blue-300",
    Platina:
      "bg-gradient-to-r from-gray-300 to-gray-400  border border-yellow-200",
    Nova: "bg-gradient-to-r from-purple-500 to-purple-100",
  };

  const spinOptions = [
    { amount: 5, cost: 6 },
    { amount: 10, cost: 13 },
    { amount: 50, cost: 70 },
    { amount: 100, cost: 200 },

    { amount: 5, cost: 500, multiplier: 5 },
    { amount: 10, cost: 1500, multiplier: 10 },
    { amount: 50, cost: 100000, multiplier: 50 },
    { amount: 100, cost: 300000, multiplier: 100 },
  ];

  const renderSpinOption = ({ amount, cost, multiplier = 1 }, index) => {
    const buttonType = index < 4;

    const canAutoSpin =
      money >= cost && !isSpinning && multiply === 1 && !buttonClicked;

    const canBay = money >= cost;

    const gradientColors = buttonType
      ? "bg-gradient-to-r from-green-300 to-green-200  hover:from-green-300 hover:to-green-100"
      : "bg-gradient-to-r from-blue-500 to-blue-200  hover:from-blue-400 hover:to-blue-100";

    const buttonClass = `myShadow w-14 h-14 ${gradientColors} hover:cursor-pointer hover:xl  rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg `;

    const textStyle = ` ${canBay ? (canAutoSpin  ? "" : "cursor-not-allowed text-gray-800")
     : "text-red-800 font-bold cursor-not-allowed"}`;

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
          <div className="text-[8px]">-{formatLargeNumber(cost, 0)}€</div>
        </div>
      </div>
    );
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
      setIntervals(newResults.map(checkIntervals));
      MoneyPlusHandler(newResults);
    }, 1000);
  };
  const checkIntervals = (value) => {
    if (value >= 1 && value < 40) return "Normal";
    if (value >= 77 && value <= 99) return "Rare";
    if (value >= 40 && value < 58) return "Blue";
    if (value >= 60 && value < 72) return "Gold";
    if (value >= 72 && value < 77) return "Platina";
    if (value >= 58 && value < 60) return "Nova";
  };
  const MoneyPlusHandler = (newResults) => {
    const winMappings = {
      Normal: 10,
      Rare: 50,
      Blue: 500,
      Gold: 10000,
      Platina: 50000,
      Nova: 1000000,
    };
    const winMultiplier = winMappings[newResults[0]] || 1;
    const isAllResultsSame = newResults.every(
      (value) => value === newResults[0]
    );
    const moneyPlus = isAllResultsSame
      ? winMultiplier * multiply
      : 1 * multiply;

    setWinMoney(moneyPlus);
    setBiggestWin((prev) => Math.max(prev, moneyPlus));
  };
  const formatLargeNumber = (value, toFixedNr) => {
    const suffixes = ["", "K", "M", "B", "T"];

    let suffixIndex = 0;
    let formattedValue = value;

    while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
      formattedValue /= 1000;
      suffixIndex++;
    }

    return `${formattedValue.toFixed(toFixedNr)}${suffixes[suffixIndex]}`;
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
    }
  }, [addMoney]);
  return (
    <div >

      <div className="text-2xl font-bold text-gray-800 flex justify-between items-center gap-5">
        <div className="text-sm">Losimas:{formatLargeNumber(spins, 0)}</div>{" "}
        <div>
          <div className=" relatyve text-sm">
            Top win: {formatLargeNumber(biggestWin, 0)}
          </div>
          <div className="text-xl font-bold text-gray-800 ">
            {formatLargeNumber(money, 2)} €
          </div>
        </div>
      </div>

      <div
        className={`mb-5 h-10 ${
          winMoney > 2 ? "text-[34px] text-lime-700" : ""
        } text-xl font-bold text-gray-800`}
      >
        {!isSpinning && winMoney
          ? `+ ${formatLargeNumber(winMoney, 0)} €`
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
      ${value === 0 ? "bg-gradient-to-r from-white via-black to-white" : ""}
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
          className={` bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-blue-700 mt-4 mb-10 ${
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

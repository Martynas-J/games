"use client";
import { useEffect, useState } from "react";

const Page2 = () => {
  const [results, setResults] = useState(["", "", ""]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervals, setIntervals] = useState([0, 0, 0]);
  const [money, setMoney] = useState(1000000);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [biggestWin, setBiggestWin] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const spinOptions = [
    { amount: 5, cost: 6, multiplier: 1, symbol: "+" },
    { amount: 10, cost: 13, multiplier: 1, symbol: "+" },
    { amount: 50, cost: 70, multiplier: 1, symbol: "+" },
    { amount: 100, cost: 200, multiplier: 1, symbol: "+" },

    { amount: 5, cost: 500, multiplier: 5, symbol: "X" },
    { amount: 10, cost: 1500, multiplier: 10, symbol: "X" },
    { amount: 50, cost: 100000, multiplier: 50, symbol: "X" },
    { amount: 100, cost: 300000, multiplier: 100, symbol: "X" },
  ];

  const checkIntervals = (value) => {
    if (value >= 1 && value < 40) return "Normal";
    if (value >= 77 && value <= 99) return "Rare";
    if (value >= 40 && value < 58) return "Blue";
    if (value >= 60 && value < 72) return "Gold";
    if (value >= 72 && value < 77) return "Platina";
    if (value >= 58 && value < 60) return "Nova";
  };

  const intervalColors = {
    Normal: "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 ",
    Rare: "bg-gradient-to-r from-orange-100  via-orange-500  to-orange-100",
    Blue: "bg-gradient-to-r from-blue-300  via-blue-700  to-blue-300 border border-gray-300",
    Gold: "bg-gradient-to-r from-yellow-300  via-yellow-700  to-yellow-300 border border-blue-300",
    Platina:
      "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400  border border-yellow-300",
    Nova: "bg-gradient-to-r from-purple-200 via-purple-500 to-purple-200",
  };

  const renderSpinOption = ({ amount, cost, multiplier, symbol }) => (
    <div
      onClick={() =>
        money >= cost && !isSpinning && multiply === 1 && !buttonClicked
          ? autoSpin(amount, cost, multiplier, symbol)
          : null
      }
      className={`w-14 h-14 border-teal-500 bg-gradient-to-r from-green-300 to-green-200 hover:cursor-pointer hover:xl hover:bg-gradient-to-r hover:from-green-300 hover:to-green-100 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg  ${
        money >= cost ? "" : "hover:cursor-not-allowed"
      }`}
    >
      <div
        className={`${
          money >= cost ? "text-gray-800" : "text-red-800 font-bold"
        }`}
      >
        <span className="text-lg">
          {symbol}
          {amount}
        </span>
        <div className="text-[8px]">-{formatLargeNumber(cost, 0)}€</div>
      </div>
    </div>
  );

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
    const moneyPlus = isAllResultsSame ? winMultiplier * multiply : 1;

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
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md w-[360px] mx-auto">
      <div className="text-2xl font-bold text-gray-800 mb-10 flex justify-between items-center gap-5">
        {!isSpinning && winMoney ? (
          <div
            className={` z-50 ${
              winMoney > 2 ? " text-[34px] text-lime-700" : ""
            } absolute top-[70px] right-[170px] text-xl font-bold text-gray-800 `}
          >
            + {formatLargeNumber(winMoney, 0)} €
          </div>
        ) : (
          ""
        )}
        <div className="text-sm">Losimas:{formatLargeNumber(spins, 0)}</div>{" "}
        <div>
          <div className=" relatyve text-sm">Top win: {formatLargeNumber(biggestWin, 0)}</div>
          <div className="text-xl font-bold text-gray-800 ">{formatLargeNumber(money, 2)} €</div>
        </div>
      </div>

      <div
        className={`flex justify-center space-x-4 slot-machine ${
          isSpinning ? "spinning" : ""
        }`}
      >
        {intervals.map((value, index) => (
          <div key={index} className={`relative `}>
            <div
              className={`border-teal-500 w-24 h-24 border-2  border-solid rounded-full 
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
              <div key={index}> {renderSpinOption(option)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;


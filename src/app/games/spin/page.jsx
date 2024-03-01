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
  amountSpins,
  ballsColors,
  ballsData,
  cards,
  checkIntervals,
  intervalColors,
  premiumMoney,
  premiumSpins,
  spinsCost,
  winMappings,
} from "./config/config";
import Loading from "@/components/Loading/Loading";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Balls from "./components/balls/Balls";
import CurrentDateTime from "./components/date/date";
import TimeCheckComponent from "./components/refresh/refresh";
import { moneyColors } from "./components/functions/moneyColors";
import ProgressBar from "./components/brogressBar/progresBar";
import CardSelect from "./components/cardSelect/cardSelect";
import DailyQuests from "./components/dailyQuests/page";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";

const Engine = () => {
  const session = useSession();
  const { result, isLoading } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );
  useEffect(() => {
    if (result) {
      const {
        dailyQuestsData,
        spinMoney,
        bestWin,
        spins,
        spinsLeft,
        multiplyDbNr,
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
      if (dailyQuestsData) {
        setDailyQuestsDb(dailyQuestsData);
      }
      setMoney(spinMoney);
      setBiggestWin(bestWin);
      setSpins(spins);
      if (spinsLeft) {
        autoSpin(spinsLeft, 1, multiplyDbNr)      
      }
      setUpgradeX(upgradeX === 0 ? 1 : upgradeX);
      setUpgradeLucky(upgradeLucky);
      setUpgradeSpeed(upgradeSpeed);
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
      if (cardsData) {
        setCardsDb(cardsData);
      }
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
  const [cardsDb, setCardsDb] = useState({
    JackOfSpades: 0,
    JackOfClubs: 0,
    JackOfHearts: 0,
    JackOfDiamonds: 0,

    QueenOfSpades: 0,
    QueenOfClubs: 0,
    QueenOfHearts: 0,
    QueenOfDiamonds: 0,

    KingOfSpades: 0,
    KingOfClubs: 0,
    KingOfHearts: 0,
    KingOfDiamonds: 0,

    AceOfSpades: 0,
    AceOfClubs: 0,
    AceOfHearts: 0,
    AceOfDiamonds: 0,
  });

  const [dailyQuestsDb, setDailyQuestsDb] = useState({
    date: setSeconds(setMinutes(setHours(addDays(new Date(), 1), 0), 0), 0),
    condition: 0,
    question: 0,
  });
  const [winBallsNow, setWinBallsNow] = useState({
    Normal: { count: 0, money: 0 },
    Rare: { count: 0, money: 0 },
    Blue: { count: 0, money: 0 },
    Gold: { count: 0, money: 0 },
    Platina: { count: 0, money: 0 },
    Nova: { count: 0, money: 0 },
  });
  const [winBallsToday, setWinBallsToday] = useState({
    Normal: { count: 0, money: 0 },
    Rare: { count: 0, money: 0 },
    Blue: { count: 0, money: 0 },
    Gold: { count: 0, money: 0 },
    Platina: { count: 0, money: 0 },
    Nova: { count: 0, money: 0 },
  });
  const [isToggled, setToggled] = useState(false);
  const [isToggled2, setToggled2] = useState(false);
  const [isEvent, setIsEvent] = useState(false);
  const [money, setMoney] = useState(10);
  const [momentMoney, setMomentMoney] = useState(0);
  const [leftSpins, setLeftSpins] = useState(0);
  const [leftSpinsMax, setLeftSpinsMax] = useState(0);
  const [spinsToday, setSpinsToday] = useState(0);
  const [lvl, setLvl] = useState(0);
  const [allMoney, setAllMoney] = useState(0);
  const [winMoney, setWinMoney] = useState(0);
  const [spins, setSpins] = useState(0);
  const [multiply, setMultiply] = useState(1);
  const [biggestWin, setBiggestWin] = useState(0);
  const [upgradeX, setUpgradeX] = useState(1);
  const [upgradeLucky, setUpgradeLucky] = useState(0);
  const [upgradeSpeed, setUpgradeSpeed] = useState(0);
  const [addMoney, setAddMoney] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [randomNr, setRandomNr] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  //1500 1100
  const procents = (upgradeSpeed * 5) / 100;
  const spinsTime = 1500 - 1500 * procents;
  const spinsAnimationTime = 1100 - 1100 * procents;

  const handleSelectChange = (event) => {
    setSelectedNumber(parseInt(event.target.value, 10));
  };
  const handleWheelChange = (event) => {
    event.preventDefault();

    const delta = Math.sign(event.deltaY);
    const newNumber = selectedNumber + delta;

    const clampedNumber = Math.min(Math.max(newNumber, 1), 10);

    setSelectedNumber(clampedNumber);
  };

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const getId = (cardId) => {
    setCardsDb((prev) => ({
      ...prev,
      [cards[cardId].name]: prev[cards[cardId].name] + 1,
    }));
    setIsUpdated(true);
  };
  const renderSpinOption = (amount, multiplier, index) => {
    let cost = Math.round(spinsCost[index] * multiplier ** 5 * 10);
    if (isEvent) {
      cost *= 0.8;
    }

    const canAutoSpin = money >= cost && !isSpinning && !buttonClicked;

    const canBay = money >= cost;

    const buttonClass = `myShadow w-[65px] h-[65px] ${ballsColors[index]} hover:cursor-pointer hover:xl  rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110 shadow-lg `;

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
            <div>
              {amount}x
              <span className="text-red-900 font-semibold">{multiplier}</span>
            </div>
          </span>
          <div className="text-[10px] ">-{formatLargeNumber(cost)}€</div>
        </div>
      </div>
    );
  };
  const resetAllResults = () => {
    setWinBallsNow({
      Normal: { count: 0, money: 0 },
      Rare: { count: 0, money: 0 },
      Blue: { count: 0, money: 0 },
      Gold: { count: 0, money: 0 },
      Platina: { count: 0, money: 0 },
      Nova: { count: 0, money: 0 },
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
          cardsData: cardsDb,
          dailyQuestsData: dailyQuestsDb,
          spinsLeft:leftSpins,
          multiplyDbNr: multiply,
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

  const spinSlotMachine = (spinsLeft, multiples = 1) => {
    setIsSpinning(true);
    setSpins((prev) => prev + multiples);
    setSpinsToday((prev) => prev + 1);
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
    }, spinsAnimationTime);
  };

  const MoneyPlusHandler = (newResults) => {
    const winMultiplier = winMappings[newResults[0]] || 1;
    const isAllResultsSame = newResults.every(
      (value) => value === newResults[0]
    );

    if (newResults[0] === "Card" && newResults[1] === "Card") {
      setToggled2(true);
    }
    if (newResults[2] === "Card" && newResults[1] === "Card") {
      setRandomNr(4);
      setToggled2(true);
    }
    if (newResults[0] === "Card" && newResults[2] === "Card") {
      setRandomNr(8);
      setToggled2(true);
    }
    if (
      newResults[0] === "Card" &&
      newResults[1] === "Card" &&
      newResults[2] === "Card"
    ) {
      setRandomNr(12);
      setToggled2(true);
    }

    const moneyPlus = isAllResultsSame
      ? winMultiplier * multiply * upgradeX
      : 1 * multiply * upgradeX;
    if (isAllResultsSame && newResults[0] !== "Card") {
      setWinBalls((prev) => ({
        ...prev,
        [newResults[0]]: prev[newResults[0]] + 1,
      }));

      setWinBallsNow((prev) => ({
        ...prev,
        [newResults[0]]: {
          count: prev[newResults[0]].count + 1,
          money: prev[newResults[0]].money + moneyPlus,
        },
      }));
      setWinBallsToday((prev) => ({
        ...prev,
        [newResults[0]]: {
          count: prev[newResults[0]].count + 1,
          money: prev[newResults[0]].money + moneyPlus,
        },
      }));
    }

    setWinMoney(moneyPlus);
    setBiggestWin((prev) => Math.max(prev, moneyPlus));
  };
  const autoSpin = async (nr, cost, multiples) => {
    resetAllResults();
    setToggled(false);
    setToggled2(false);
    setMomentMoney(0);
    setButtonClicked(true);
    setMoney((prev) => prev - cost);
    setMultiply(multiples);
    let spinsLeft = nr;
    setLeftSpinsMax(nr);
    for (let i = 0; i < nr; i++) {
      spinsLeft--;
      await new Promise((resolve) => setTimeout(resolve, spinsTime));
      spinSlotMachine(spinsLeft, multiples);
    }

    setTimeout(() => {
      setMultiply(1);
      setButtonClicked(false);
      setToggled(true);
    }, spinsTime);
  };
  useEffect(() => {
    if (isUpdated && session?.data) {
      saveResult();
      setIsUpdated(false);
    }
  }, [isUpdated]);

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

  if (isLoading || !session.data) {
    return <Loading />;
  }

  const updateState = (moneyPlus, nextDayData, questionNr) => {
    if (moneyPlus) {
      setMoney((prev) => prev + moneyPlus);
      if (lvl > 5) {
        if (questionNr === 2) {
          setRandomNr(Math.floor(Math.random() * 13));  
          setToggled2(true);
        }
        if (questionNr === 3) {
          setRandomNr(Math.floor(Math.random() * 9) + 4);
          setToggled2(true);
        }
        if (questionNr === 4) {
          setRandomNr(Math.floor(Math.random() * 5) + 8);
          setToggled2(true);
        }
        if (questionNr >= 5) {
          setRandomNr(12);
          setToggled2(true);
        }
      }
    }
    if (nextDayData) {
      setDailyQuestsDb(nextDayData);
    }
  };
  const allValuesZero = Object.values(winBallsToday).every(
    (value) => value.count <= 0
  );
  return (
    <div className="relative">
      <TimeCheckComponent setIsAllowed={setIsEvent} isAllowed={isEvent} />
      <ProgressBar
        lvl={lvl}
        numberMin={spins}
        numberMax={premiumSpins[lvl]}
        valueBefore={premiumSpins[lvl - 1]}
        type="percent"
      />
      <div className="  text-2xl font-bold text-gray-800 flex justify-between items-center">
        <div className="flex flex-col">
          <CurrentDateTime time={true} />
          <div className="text-sm">
            <span className="text-gray-600">Lygis: </span>
            <span className="text-red-500">{lvl} lvl</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Lošimai: </span>
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
          className=" zoom-in p-2 absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-100/95 to-blue-300 inline-block h-auto w-auto hover:cursor-pointer border-2 border-teal-700 rounded-xl z-10"
        >
          <div>
            {allValuesZero ? (
              "Nieko neišsukote :("
            ) : (
              <div className="flex flex-col">
                {ballsData.map((data, index) => (
                  <div key={index}>
                    {Object.values(winBallsToday)[index].count > 0 && (
                      <div className="flex  items-center gap-3">
                        <Balls {...data} text={false} />
                        <div className=" w-[80%] flex justify-between items-center gap-3">
                          <div className="text-green-950 font-bold">
                            {Object.values(winBallsToday)[index].count}
                          </div>

                          {Object.values(winBallsNow)[index].count > 0 && (
                            <div>
                              <div className=" flex gap-1">
                                <div>(</div>
                                <div>
                                  {Object.values(winBallsNow)[index].count}
                                </div>
                                <div className="">
                                  +
                                  {formatLargeNumber(
                                    Object.values(winBallsNow)[index].money
                                  )}
                                  €
                                </div>
                                <div>)</div>
                              </div>
                            </div>
                          )}

                          <div className="text-gray-700 font-bold">
                            +
                            {formatLargeNumber(
                              Object.values(winBallsToday)[index].money
                            )}
                            €
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="w-full border-b-2 border-b-teal-700 pt-2"></div>
                <div className="flex justify-between gap-4">
                  <div className="flex gap-1">
                    Sukimai:{" "}
                    <span className="text-gray-700 font-semibold">
                      {formatLargeNumber(spinsToday)}
                    </span>
                  </div>
                  <div className="text-gray-950 font-bold">
                    {formatLargeNumber(
                      Object.values(winBallsToday).reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.money,
                        0
                      )
                    )}
                    €
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isToggled2 && <CardSelect sendId={getId} randomNr={randomNr} />}
      <div className="flex justify-between items-center mb-5">
        <div className={`text-lg w-10 h-10  ${moneyColors(momentMoney, 10)}`}>
          {momentMoney > 0 && "+" + formatLargeNumber(momentMoney) + "€"}
        </div>
        <div
          className={`  h-10 text-gray-800 ${moneyColors(
            winMoney
          )} text-xl font-bold`}
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
            {amountSpins.map((amount, index) => (
              <div key={index}>
                {" "}
                {renderSpinOption(amount, selectedNumber, index)}
              </div>
            ))}
            <div className="">
              {isEvent && (
                <div className="text-2xl animate-bounce transition duration-500">
                  EVENTAS
                </div>
              )}
              <select
                id="numberSelect"
                value={selectedNumber}
                onWheel={handleWheelChange}
                onChange={handleSelectChange}
                className=" appearance-none myShadow w-full p-2 border-0 border-green-300 rounded-[10px] text-center focus:outline-none focus:shadow-2xl bg-gradient-to-r from-teal-800 to-blue-200"
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    -- x{index + 1} --
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <DailyQuests
          result={result}
          winBalls={winBalls}
          level={lvl}
          dailyQuestsData={dailyQuestsDb}
          spinsNow={spins}
          moneyNow={money}
          updateState={updateState}
        />
      )}
    </div>
  );
};

export default Engine;

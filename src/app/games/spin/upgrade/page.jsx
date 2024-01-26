"use client";
import { FromDb, formatLargeNumber } from "@/components/Functions/simpleFunctions";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import { uLuckyArray, uSpeedArray, uXArray } from "../config/config";

const Upgrade = () => {
  const session = useSession();

   const { result, isLoading, mutate} = FromDb(`getSpinResults/${session.data?.user.name}`)
  // const result = {
  //   spinMoney: 100000000,
  //   upgradeX: 2,
  //   upgradeLucky: 50,
  //   upgradeSpeed: 9,
  //   spins: 100,
  // }

  const money = result?.spinMoney;
  const saveResult = async (money, uX, uLucky, uSpeed) => {
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: money,
          upgradeX: uX,
          upgradeLucky: uLucky,
          upgradeSpeed: uSpeed,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-4 border-solid"></div>
        <div className="ml-4 text-blue-500 text-2xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  const buttons = (
    cost,
    color,
    aroundColor,
    text,
    symbol,
    onclickFunction,
    num
  ) => {
    const notAllowed = money < cost || num === "MAX";

    return (
      <div className="flex gap-5 items-center">
        <div
          onClick={money >= cost && num !== "MAX" ? onclickFunction : null}
          className={`${notAllowed 
            ? "cursor-not-allowed text-red-950 opacity-70 "
            : "cursor-pointer hover:scale-110 "
            }  ${color} w-16 h-16 p-1 rounded-2xl  border-2 myShadow ${aroundColor} flex justify-center items-center`}
        >
          <div>
            <span className=" text-lg font-serif text-[35px] font-bold">
              {num}
            </span>
            <div className={`text-[14px] font-bold `}>
              {formatLargeNumber(cost)}
            </div>
          </div>
        </div>
        {num !== "MAX" ?
        <div>
          {text}{" "}
          <span className={`text-green-600 font-semibold`}>{symbol}</span>
        </div> :
        <div>Pasiektas maksimalus lygis</div> }
      </div>
    );
  };
  let uX = result?.upgradeX == 0 ? 1 : result?.upgradeX;
  let uLucky = result?.upgradeLucky == 0 ? 5 : result?.upgradeLucky;
  let uSpeed = result?.upgradeSpeed;

  const RomNumber = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "MAX",
  ];
  let uXCost = uXArray[uX - 1];
  let uLuckyCost = uLuckyArray[uLucky / 5 - 1];
  let uSpeedCost = uSpeedArray[uSpeed - 1];
  if (session.status === "unauthenticated") {
    return <div>Reikia prisijungti</div>;
  }
  if (!result?.spins) {
    return <div>Pasuk nors kartą ir sužinosi</div>;
  }

  return (
    <div className="pt-2 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        Jūs turite {result ? formatLargeNumber(result.spinMoney) : "0"}€
      </h1>
      {buttons(
        uXCost,
        "bg-gradient-to-r from-lime-900 to-green-400",
        "border-lime-950",
        "Visam laikui",
        `X${uX + 1}`,
        () => saveResult(money - uXCost, uX + 1),
        RomNumber[uX - 1]
      )}
      {buttons(
        uLuckyCost,
        "bg-gradient-to-r from-pink-950 to-red-400",
        "border-red-950",
        "Pridėti sekmės",
        `${uLucky}%`,
        () => saveResult(money - uLuckyCost, uX, uLucky + 5),
        RomNumber[uLucky / 5 - 1]
      )}
      {buttons(
        uSpeedCost,
        "bg-gradient-to-r from-blue-950 to-teal-400",
        "border-red-950",
        "Pridėti greičio",
        `${uSpeed}%`,
        () => saveResult(money - uLuckyCost, uX, uLucky, uSpeed + 1),
        RomNumber[uSpeed - 1]
      )}
    </div>
  );
};
export default Upgrade;

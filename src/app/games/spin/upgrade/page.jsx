"use client";
import { API_URL } from "@/app/config/config";
import { formatLargeNumber } from "@/components/Functions/simpleFunctions";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const Upgrade = () => {
  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {
    data: result,
    mutate,
    isLoading,
  } = useSWR(
    `${API_URL}/api/getSpinResults/${session.data?.user.name}`,
    fetcher
  );
  const money = result?.spinMoney;
  const saveResult = async (money, uX, uLucky) => {
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: money,
          upgradeX: uX,
          upgradeLucky: uLucky,
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
          className={`${
            notAllowed
              ? "cursor-not-allowed text-red-950"
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
        <div>
          {text}{" "}
          <span className={`text-green-600 font-semibold`}>{symbol}</span>
        </div>
      </div>
    );
  };
  let uX = result?.upgradeX == 0 ? 2:result?.upgradeX;
  let uLucky = result?.upgradeLucky == 0 ? 5 : result?.upgradeLucky;
  const uXArray = [
    1000000, 3000000, 10000000, 23000000, 50000000, 150000000, 350000000,
    900000000, 2000000000, 10,
  ];
  const nr = 5
  const uLuckyArray = [
    1000000 * nr,
    3000000 * nr,
    10000000 * nr,
    23000000 * nr,
    50000000 * nr,
    150000000 * nr,
    350000000 * nr,
    900000000 * nr,
    2000000000 * nr,
    10,
  ];
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
  let uXCost = uXArray[uX - 2];
  let uLuckyCost = uLuckyArray[uLucky / 5 - 1];
if ( !result?.spins) {
 return <div>Pasuk nors kartą ir sužinosi</div>
}
if (session.status === "unauthenticated") {
  return <div>Reikia prisijungti</div>
 }
  return (
    <div className="pt-2 flex flex-col gap-2">
      <h1 className="font-bold text-2xl">
        Jūs turite {result ? formatLargeNumber(result.spinMoney, 2) : "0"}€
      </h1>
      {buttons(
        uXCost,
        "bg-gradient-to-r from-lime-900 to-green-400",
        "border-lime-950",
        "Visam laikui",
        `X${uX}`,
        () => saveResult(money - uXCost, uX + 1),
        RomNumber[uX - 2]
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
    </div>
  );
};
export default Upgrade;

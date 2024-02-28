"use client";
import { FromDb } from "@/components/Functions/simpleFunctions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  NeedBallsForReward,
  uLuckyArray,
  uSpeedArray,
  uXArray,
} from "../../config/config";


const HeaderSpin = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const session = useSession();
  const { result, isLoading, mutate } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const navigationItems = [
    { href: "/games/spin/cards", label: "Kortos" },
    { href: "/games/spin/upgrade", label: "Tobulinimai" },
    { href: "/games/spin/wins", label: "Laimėjimai" },
    { href: "/games/spin", label: "Sukti" },
    { href: "/games/spin/chat", label: "Žinutės" },
    { href: "/games/spin/market", label: "Turgus" },
    // { href: "/games/spin/dailyQuests", label: "Užduotys" },
    { href: "/games/spin/players", label: "Žaidėjai" },
    { href: "/games/spin/info", label: "Info" },
  ];
  const NavigationItem = ({ href, label, index, activeIndex, onClick }) => {
    if (isLoading) {
      return "";
    }
    const allBalls = [
      result?.ballsNormal,
      result?.ballsRare,
      result?.ballsBlue,
      result?.ballsGold,
      result?.ballsPlatina,
      result?.ballsNova,
    ];

    let uX = result?.upgradeX == 0 ? 1 : result?.upgradeX;
    let uLucky = result?.upgradeLucky == 0 ? 5 : result?.upgradeLucky;
    let uSpeed = result?.upgradeSpeed;
    const isUpgrade =
      result?.spinMoney >= uXArray[uX - 1] ||
      result?.spinMoney >= uLuckyArray[uLucky / 5 - 1] ||
      result?.spinMoney >= uSpeedArray[uSpeed - 1];
    const rewardsDb = result?.rewards;
    let dailyRewardData = result?.dailyRewardData || 0;
    const now = new Date();
    const allowed =
      (rewardsDb &&
        Object.values(rewardsDb).some((rewardsLvl, index) => {
          return allBalls[index] >= NeedBallsForReward[rewardsLvl];
        })) ||
      now >= new Date(dailyRewardData);

    return (
      <div
        className={` relative p-1 hover:scale-110 cursor-pointer hover:text-gray-300 transition-all duration-500 ${
          index === activeIndex
            ? "text-red-800 hover:text-red-300 font-bold"
            : ""
        }`}
        onClick={() => onClick(index)}
      >
        {((label === "Tobulinimai" && isUpgrade) ||
          (label === "Laimėjimai" && allowed)) && (
          <span className=" absolute top-1 -right-1 w-2 h-2 bg-red-500 myShadowGreen rounded-full animate-pulse"></span>
        )}
        <Link href={href}>{label}</Link>
      </div>
    );
  };
  return (

      <div className="flex flex-wrap justify-around gap-x-1  bg-teal-600  sm:rounded-t-lg myShadow w-[360px] mx-auto">
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            href={item.href}
            label={item.label}
            index={index}
            activeIndex={activeIndex}
            onClick={handleItemClick}
          />
        ))}
        
      
    </div>
  );
};
export default HeaderSpin;

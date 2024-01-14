"use client";
import Link from "next/link";
import React, { useState } from "react";

const HeaderSpin = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const navigationItems = [
    { href: "/games/spin/info", label: "Info" },
    { href: "/games/spin/upgrade", label: "Tobulinimai" },
    { href: "/games/spin/wins", label: "Laimėjimai" },
    { href: "/games/spin", label: "Sukti" },
  ];
  const NavigationItem = ({ href, label, index, activeIndex, onClick }) => {
    return (
      <div
        className={`p-1 hover:scale-110 cursor-pointer hover:text-gray-300 transition-all duration-500 ${
          index === activeIndex ? "text-red-800 hover:text-red-300 font-bold" : ""
        }`}
        onClick={() => onClick(index)}
      >
        <Link href={href}>{label}</Link>
      </div>
    );
  };
  return (
    <div className="flex justify-around  bg-teal-600  sm:rounded-t-lg myShadow w-[360px] mx-auto">
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

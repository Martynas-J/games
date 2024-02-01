export const ballsData = [
  {
    color: "bg-gradient-to-r from-blue-300 to-blue-50",
    title: "Normal",
    text: "+10 Euras",
  },
  {
    color: "bg-gradient-to-r from-orange-500  to-orange-100",
    title: "Rare",
    text: "+50 Eurų",
  },
  {
    color: "bg-gradient-to-r from-blue-700  to-blue-300 border border-gray-200",
    title: "Blue",
    text: "+500 Eurų",
  },
  {
    color:
      "bg-gradient-to-r from-yellow-700  to-yellow-200 border border-blue-300",
    title: "Gold",
    text: "+10K Eurų",
  },
  {
    color:
      "bg-gradient-to-r from-gray-300 to-gray-400  border border-yellow-200",
    title: "Platina",
    text: "+50K Eurų",
  },
  {
    color: "bg-gradient-to-r from-purple-500 to-purple-100",
    title: "Nova",
    text: "+1M Eurų",
  },
];

export const intervalColors = {
  Normal: "bg-gradient-to-r from-blue-300 to-blue-50 ",
  Rare: "bg-gradient-to-r from-orange-500  to-orange-100",
  Blue: "bg-gradient-to-r from-blue-700  to-blue-300 border border-gray-200",
  Gold: "bg-gradient-to-r from-yellow-700  to-yellow-200 border border-blue-300",
  Platina:
    "bg-gradient-to-r from-gray-300 to-gray-400  border border-yellow-200",
  Nova: "bg-gradient-to-r from-purple-500 to-purple-100",
};

export const premiumMoney = [
  500, 1000, 5000, 10000, 30000, 50000, 100000, 300000, 500000, 1000000, 5000000, 10000000
];
export const premiumSpins = [
  100, 500, 1000, 2000, 4000, 8000, 10000, 20000, 40000, 80000,160000,320000,
  1000000000000000,
];
export const ballsColors = [
  "bg-gradient-to-r from-green-300 to-green-200  hover:from-green-300 hover:to-green-100",
  "bg-gradient-to-r from-teal-500 to-blue-200  hover:from-teal-400 hover:to-blue-100",
  "bg-gradient-to-r from-blue-500 to-blue-200  hover:from-blue-400 hover:to-blue-100",
  "bg-gradient-to-r from-blue-700 to-blue-500  hover:from-blue-800 hover:to-blue-300",
];
export const spinsCost = [3, 6, 10, 20];

export const amountSpins = [25, 50, 75, 100];

export const winMappings = {
  Normal: 10,
  Rare: 50,
  Blue: 500,
  Gold: 10000,
  Platina: 50000,
  Nova: 1000000,
};

export const uXArray = [
  500000, 1000000, 10000000, 50000000, 200000000, 800000000, 2000000000,
  8000000000, 20000000000, 10,
];

export const uLuckyArray = uXArray.map((value) => value * 5);
export const uSpeedArray = uXArray.map((value) => value * 7);

export const checkIntervals = (value, upgradeLucky) => {
  if (upgradeLucky === 0) {
    if (value >= 1 && value < 40) return "Normal";
    if (value >= 77 && value <= 99) return "Rare";
    if (value >= 40 && value < 58) return "Blue";
    if (value >= 60 && value < 72) return "Gold";
    if (value >= 72 && value < 77) return "Platina";
    if (value >= 58 && value < 60) return "Nova";
  } else if (upgradeLucky === 10) {
    if (value >= 1 && value < 38) return "Normal";
    if (value >= 80 && value <= 99) return "Rare";
    if (value >= 38 && value < 54) return "Blue";
    if (value >= 57 && value < 71) return "Gold";
    if (value >= 71 && value < 80) return "Platina";
    if (value >= 54 && value < 57) return "Nova";
  } else if (upgradeLucky === 15) {
    if (value >= 1 && value < 36) return "Normal";
    if (value >= 81 && value <= 99) return "Rare";
    if (value >= 36 && value < 50) return "Blue";
    if (value >= 54 && value < 70) return "Gold";
    if (value >= 70 && value < 81) return "Platina";
    if (value >= 50 && value < 54) return "Nova";
  } else if (upgradeLucky === 20) {
    if (value >= 1 && value < 34) return "Normal";
    if (value >= 78 && value <= 99) return "Rare";
    if (value >= 34 && value < 46) return "Blue";
    if (value >= 51 && value < 67) return "Gold";
    if (value >= 67 && value < 78) return "Platina";
    if (value >= 46 && value < 51) return "Nova";
  } else if (upgradeLucky === 25) {
    if (value >= 1 && value < 32) return "Normal";
    if (value >= 79 && value <= 99) return "Rare";
    if (value >= 32 && value < 44) return "Blue";
    if (value >= 50 && value < 67) return "Gold";
    if (value >= 67 && value < 79) return "Platina";
    if (value >= 44 && value < 50) return "Nova";
  } else if (upgradeLucky === 30) {
    if (value >= 1 && value < 30) return "Normal";
    if (value >= 80 && value <= 99) return "Rare";
    if (value >= 30 && value < 42) return "Blue";
    if (value >= 49 && value < 67) return "Gold";
    if (value >= 67 && value < 80) return "Platina";
    if (value >= 42 && value < 49) return "Nova";
  } else if (upgradeLucky === 35) {
    if (value >= 1 && value < 28) return "Normal";
    if (value >= 78 && value <= 99) return "Rare";
    if (value >= 28 && value < 40) return "Blue";
    if (value >= 48 && value < 64) return "Gold";
    if (value >= 64 && value < 78) return "Platina";
    if (value >= 40 && value < 48) return "Nova";
  } else if (upgradeLucky === 40) {
    if (value >= 1 && value < 26) return "Normal";
    if (value >= 78 && value <= 99) return "Rare";
    if (value >= 26 && value < 38) return "Blue";
    if (value >= 47 && value < 63) return "Gold";
    if (value >= 63 && value < 78) return "Platina";
    if (value >= 38 && value < 47) return "Nova";
  } else if (upgradeLucky === 45) {
    console.log("9");
    if (value >= 1 && value < 24) return "Normal";
    if (value >= 78 && value <= 99) return "Rare";
    if (value >= 24 && value < 36) return "Blue";
    if (value >= 46 && value < 62) return "Gold";
    if (value >= 62 && value < 78) return "Platina";
    if (value >= 36 && value < 46) return "Nova";
  }
  //  else if (upgradeLucky === 50) {
  //   console.log("max")
  //   if (value >= 1 && value < 22) return "Normal";
  //   if (value >= 79 && value <= 99) return "Rare";
  //   if (value >= 22 && value < 34) return "Blue";
  //   if (value >= 45 && value < 61) return "Gold";
  //   if (value >= 61 && value < 79) return "Platina";
  //   if (value >= 34 && value < 45) return "Nova";
  // }
  else {
    if (value >= 1 && value < 40) return "Normal";
    if (value >= 77 && value <= 99) return "Rare";
    if (value >= 40 && value < 58) return "Blue";
    if (value >= 60 && value < 72) return "Gold";
    if (value >= 72 && value < 77) return "Platina";
    if (value >= 58 && value < 60) return "Nova";
  }
};

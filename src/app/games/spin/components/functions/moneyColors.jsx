export const moneyColors = (money, xx = 1) => {
  return money <= 10 * xx * xx
    ? "text-black text-[36px] "
    : money < 10000 * xx
    ? "text-lime-700 text-[36px] font-bold"
    : money < 100000 * xx
    ? "text-pink-500 text-[46px] font-bold "
    : "text-red-600 text-[46px] font-bold";
};

export const cardLinesFunction = (filteredArray, cardsData) => {
  const cardLines = [];
  const calculateLineValue = (cardLine) => {
    let bonus = 1;
    let moneyPlus = 0;

    cardLine.forEach((line, index) => {
      if (line.count > 0) {
        moneyPlus += (index + 1) * 50000;
      }
    });

    if (cardLine[0].count > 0 ) {
      bonus = 2;
      if (cardLine[1].count > 0) {
        bonus = 3;
        if (cardLine[2].count > 0) {
          bonus = 4;
          if (cardLine[3].count > 0) {
            bonus = 100;
          }
        }
      }
    }
    const money = moneyPlus * bonus;

    return money;
  };
  for (let i = 0; i < filteredArray.length; i += 4) {
    const line = [];
    for (let j = 0; j < 4; j++) {
      const index = i + j;
      if (index < filteredArray.length) {
        line.push({
          count: cardsData[filteredArray[index].name],
          name: filteredArray[index].name,
        });
      }
    }
    line.push(calculateLineValue(line));
    cardLines.push(line);
  }
  return cardLines;
};

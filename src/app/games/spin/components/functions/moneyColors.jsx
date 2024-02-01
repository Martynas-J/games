export const moneyColors = (money, xx = 1) => {
  return money <= 10 * xx * xx
    ? "text-black text-[36px] "
    : money < 10000 * xx
    ? "text-lime-700 text-[36px] font-bold"
    : money < 100000 * xx
    ? "text-pink-500 text-[46px] font-bold "
    : "text-red-600 text-[46px] font-bold"
};

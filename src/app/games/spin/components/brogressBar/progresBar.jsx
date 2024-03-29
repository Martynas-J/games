import { formatLargeNumber } from "@/components/Functions/simpleFunctions";

const ProgressBar = ({ lvl, numberMin, numberMax, valueBefore, type }) => {
  let progress;
  let viewsElement;
  if (type === "percent") {
    progress = parseFloat(
      (
        (lvl === 0 ? numberMin * 100 : (numberMin - valueBefore) * 100) /
        (lvl === 0 ? numberMax : numberMax - valueBefore)
      ).toFixed(2)
    );
    viewsElement = <span className="absolute left-[50%] text-black z-50 translate-x-[-50%] ">{`${progress}%`}</span>
  } else if (type === "numbers") {
    let views = numberMin >= numberMax ? ` ${formatLargeNumber(numberMax)}/${formatLargeNumber(numberMax)}` : `${formatLargeNumber(numberMin)}/${formatLargeNumber(numberMax)}`
    progress = parseFloat(
      (
        (lvl === 0 ? numberMin * 100 : (numberMin - valueBefore) * 100) /
        (lvl === 0 ? numberMax : numberMax - valueBefore)
      ).toFixed(2)
    );
    viewsElement = <span className="absolute left-[50%] text-black z-50 translate-x-[-50%] ">{views}</span>
  }

  return (
    <div className="relative bg-slate-200 h-5 w-full mt-[0.81px] rounded-lg overflow-hidden myShadow">
      <div className="relative">
        <span
          className={` myShadow absolute left-0 rounded-2xl  ${numberMin >= numberMax ? "bg-pink-600" : "bg-gradient-to-r from-green-200 to-green-700"}  h-5 overflow-hidden`}
          style={{ width: `${progress}%` }}
        ></span>
        {viewsElement}
      </div>
    </div>
  );
};
export default ProgressBar;

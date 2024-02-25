import {
  FaAward,
  FaFantasyFlightGames,
  FaFlag,
  FaFlagCheckered,
  FaFlagUsa,
  FaFontAwesomeFlag,
  FaMedal,
  FaRegFlag,
  FaSpinner,
  FaTape,
} from "react-icons/fa";
import { formatLargeNumber } from "./Functions/simpleFunctions";
import Loading from "./Loading/Loading";
import { addMinutes, isToday, isWithinInterval, subMinutes } from "date-fns";
import Balls from "@/app/games/spin/components/balls/Balls";
import { ballsData } from "@/app/games/spin/config/config";

const Results = ({ data, game, name, limit }) => {
  if (!data) {
    return <Loading />;
  }

  game === "quiz" && data.sort((a, b) => b.playerScore - a.playerScore);
  game === "spin" && data.sort((a, b) => b.spinMoney - a.spinMoney);
  data = data.slice(0, limit);
  return (
    <div className="results-sidebar p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">
        {limit ? `TOP ${limit}` : "Visi Rezultatai:"}
      </h2>
      <ul className="space-y-2">
        {data.length > 0 ? (
          data.map((result, index) => {
            const allBalls = [
              result?.ballsNormal,
              result?.ballsRare,
              result?.ballsBlue,
              result?.ballsGold,
              result?.ballsPlatina,
              result?.ballsNova,
            ];

            const updatedAt = new Date(result.updatedAt);
            const now = new Date();
            const fiveMinutesAgo = subMinutes(now, 5);
            const oneMinuteAfter = addMinutes(now, 1);
            const tenMinutesAgo = subMinutes(now, 30);

            let intervalType;
            if (isToday(updatedAt)) {
              if (
                isWithinInterval(updatedAt, {
                  start: fiveMinutesAgo,
                  end: oneMinuteAfter,
                })
              ) {
                intervalType = "active";
              } else if (
                isWithinInterval(updatedAt, {
                  start: tenMinutesAgo,
                  end: oneMinuteAfter,
                })
              ) {
                intervalType = "passive";
              } else {
                intervalType = "out";
              }
            }

            let intervalColor;

            switch (intervalType) {
              case "active":
                intervalColor = "bg-green-500";
                break;
              case "passive":
                intervalColor = "bg-yellow-500";
                break;
              default:
                intervalColor = "bg-red-500";
                break;
            }
            return (
              <li
                key={index}
                className={`flex flex-col ${
                  index === 0
                    ? " shadow-yellow-500"
                    : index === 1
                    ? "shadow-gray-500"
                    : index === 2
                    ? " shadow-orange-700"
                    : " shadow-slate-700"
                } p-2 rounded-md shadow-md `}
              >
                {index === 0 ? (
                  <span className="text-yellow-500 flex justify-center gap-2 text-2xl">
                    <span className="text-gray-700 transform scale-x-[-1] -rotate-2">
                      <FaFlagCheckered />
                    </span>
                    <FaMedal />
                    <span className="text-gray-700 ">
                      <FaFlagCheckered />
                    </span>
                  </span>
                ) : index === 1 ? (
                  <span className="text-gray-600 flex justify-center text-2xl">
                    <FaMedal />
                  </span>
                ) : index === 2 ? (
                  <span className="text-orange-500 flex justify-center text-2xl">
                    <FaMedal />
                  </span>
                ) : (
                  <span className="flex justify-center text-2xl"></span>
                )}
                <div className="text-xl font-bold float-left ">{index + 1}</div>
                <div className="text-gray-700">
                  {new Date(result.updatedAt).toLocaleString("lt-LT")}{" "}
                  <span className=" relative font-semibold">
                    {
                      <span
                        className={`inline-block w-3 h-3 ${intervalColor} rounded-full mr-1`}
                      ></span>
                    }
                    {result.playerName}
                  </span>
                  {game === "quiz" && (
                    <>
                      <span className="text-blue-600">
                        Taškai: {result.playerScore}
                      </span>

                      <span className="font-semibold text-gray-600">
                        {" "}
                        Lvl: {result.level}
                      </span>
                    </>
                  )}
                  {game === "spin" && (
                    <>
                      <div>
                        Lvl:{" "}
                        <span className="text-green-700 font-bold">
                          {result.level}
                        </span>{" "}
                        Sukimai:{" "}
                        <span className="font-bold">
                          {formatLargeNumber(
                            result.spins,
                            result.spins > 1000 && 2
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-600">
                          Pinigai:{" "}
                          <span className="font-bold">
                            {formatLargeNumber(result.spinMoney, 2)}€
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between items-start ">
                        {ballsData.map((data, index) => (
                          <div key={index}>
                            <Balls {...data} text={false} size="w-7 h-7" />
                            <span className="text-[14px]">
                              {formatLargeNumber(allBalls[index] || 0)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div>
                        Iš viso laimėta:{" "}
                        <span className="font-bold">
                          {formatLargeNumber(
                            result.allTimeMoney,
                            result.allTimeMoney > 1000 && 2
                          )}
                          €
                        </span>
                      </div>
                      {name === "ServerTest" && (
                        <div>
                          {Object.entries(result?.cardsData).map(
                            ([name, count], index) =>
                              count > 0 && (
                                <div key={index}>
                                  <p className="text-red-500">
                                    {name}: {count}
                                  </p>
                                </div>
                              )
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <p>Rezultatų nėra</p>
        )}
      </ul>
    </div>
  );
};

export default Results;

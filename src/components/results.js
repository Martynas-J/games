import { FaMedal } from "react-icons/fa";
import { formatLargeNumber } from "./Functions/simpleFunctions";

const Results = ({ data, game }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-4 border-solid"></div>
        <div className="ml-4 text-blue-500 text-2xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  game === "quiz" && data.sort((a, b) => b.playerScore - a.playerScore);
  game === "spin" && data.sort((a, b) => b.spinMoney - a.spinMoney);

  return (
    <div className="results-sidebar p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Visi Rezultatai:</h2>
      <ul className="space-y-2">
        {data.length > 0 ? (
          data.map((result, index) => (
            <li
              key={index}
              className={`${
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
                <span className="text-yellow-500 mr-2">
                  <FaMedal />
                </span>
              ) : index === 1 ? (
                <span className="text-gray-600 mr-2">
                  <FaMedal />
                </span>
              ) : index === 2 ? (
                <span className="text-orange-500 mr-2">
                  <FaMedal />
                </span>
              ) : null}
              <p className="text-gray-700">
                {new Date(result.createdAt).toLocaleString("lt-LT")} -{" "}
                <span className="font-semibold">{result.playerName}</span> -{" "}
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
                    <span className="text-blue-600">
                      Pinigai: {formatLargeNumber(result.spinMoney, 2)}€
                    </span>
                    <div>
                      Sukimai: {formatLargeNumber(result.spins, result.spins > 1000 && 2)}
                    </div>
                  </>
                )}
              </p>
            </li>
          ))
        ) : (
          <p>Rezultatų nėra</p>
        )}
      </ul>
    </div>
  );
};

export default Results;

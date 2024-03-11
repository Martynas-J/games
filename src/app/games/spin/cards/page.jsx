"use client";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import CardElement from "../components/Cards/CardElement";
import { cards } from "../config/config";
import { cardLinesFunction } from "../components/functions/moneyColors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = () => {
  const session = useSession();

  const { result, isLoading, mutate } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!result?.spins) {
    return <div>Pasuk nors kartą ir sužinosi</div>;
  }
  const { spinMoney, cardsData, level } = result;

  const saveResult = async (data = 0) => {
    const updatedCardsData = { ...cardsData };
    if (data) {
      for (let i = 0; i < 4; i++) {
        if (data[i].count > 0) {
          updatedCardsData[data[i].name] = (cardsData[data[i].name] || 0) - 1;
        }
      }
    } else {
      const keys = Object.keys(updatedCardsData);
      for (let i = 0; i < keys.length - 1; i++) {
        updatedCardsData[keys[i]]--;
      }
    }

    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          spinMoney: result?.spinMoney + (data ? data[4] : 1000000000),
          ...(Object.keys(updatedCardsData).length && {
            cardsData: updatedCardsData,
          }),
        },
        "saveSpinResults"
      );
      if (response.ok) {
        toast.success(`Atsiėmėte: ${formatLargeNumber(data ? data[4] : 1000000000)}`);
        mutate();
      } else {
        console.error("Failed to save the result.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const filteredArray = [];
  for (let i = 0; i < 4; i++) {
    for (let j = i; j < cards.length; j += 4) {
      filteredArray.push(cards[j]);
    }
  }

  const allCardsDeck = Object.values(cardsData)
    .slice(0, -1)
    .every((value) => value > 0);
  const cardLines = cardLinesFunction(filteredArray, cardsData);

  return (
    <div className="pt-2 flex flex-col gap-2">
      <h1 className="font-bold text-2xl ">
        Jūs turite {result ? formatLargeNumber(spinMoney) : "0"}€
      </h1>
      <h1 className=" text-md ">
        Atsiimti galima tik nuo{" "}
        <span className="text-red-700 font-bold">8 lygio</span>
      </h1>
      <div className="flex ">
        <div className="flex flex-wrap gap-1">
          {filteredArray.map((value, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col ${
                  cardsData[value.name] === 0 ? " opacity-30" : ""
                } `}
              >
                {
                  <CardElement
                    {...filteredArray[index]}
                    miniSymbolSize="text-xs"
                    symbolSize="text-md"
                    titleSize="text-md"
                    typeSize="text-[8px]"
                    cardSize="w-[56px]"
                  />
                }
                <div>{cardsData[value.name]}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col  justify-around">
          {Array(4)
            .fill()
            .map((_, index) =>
              cardLines[index][4] > 0 ? (
                <button
                  onClick={() => saveResult(cardLines[index])}
                  disabled={level < 8}
                  key={index}
                  className={` ${
                    level > 7
                      ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
                      : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
                  } myShadow  px-1 py-1 rounded-full shadow-md min-w-[70px]`}
                >
                  {formatLargeNumber(cardLines[index][4])}
                </button>
              ) : (
                <button
                  key={index}
                  className="bg-gradient-to-r from-gray-400 to-blue-300  text-black cursor-not-allowed
                 myShadow  px-1 py-1 rounded-full shadow-md min-w-[70px] "
                >
                  Nėra
                </button>
              )
            )}
        </div>
      </div>
      <button
        onClick={() => saveResult()}
        disabled={level < 8 || !allCardsDeck}
        className={` ${
          level > 7 && allCardsDeck
            ? "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-800 text-white"
            : "bg-gradient-to-r from-blue-400 to-blue-600  text-black cursor-not-allowed"
        } myShadow  px-1 py-1 rounded-full shadow-md min-w-[70px]`}
      >
        Pasiimti už visą kaladę <span className=" font-bold">1B</span> .
      </button>
    </div>
  );
};
export default Cards;

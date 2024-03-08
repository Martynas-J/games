"use client";
import { API_URL } from "@/app/config/config";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CardElement from "../../components/Cards/CardElement";
import { cards } from "../../config/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateResultData } from "@/components/updateResultData";
import { useState } from "react";
import { saveResult } from "../../components/functions/saveBays";

const Sell = () => {
  const session = useSession();
  const { result, isLoading, mutate } = FromDb(
    `getSpinResults/${session.data?.user.name}`
  );
  const {
    result: sells,
    isLoading: loading,
    mutate: mutate2,
  } = FromDb(`getSells/${session.data?.user.name}`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [isProcessing3, setIsProcessing3] = useState(false);

  if (isLoading || loading || session.data === undefined) {
    return <Loading />;
  }
  const { playerName, spinMoney, cardsData } = result;

  const sellCardHandler = async (itemName, playerName, cardsData) => {
    if (isProcessing) {
      return;
    }
    const enteredPrice = prompt("Įveskite kainą:");
    if (!enteredPrice) {
      return;
    }
    const parsedPrice = parseInt(enteredPrice);
    if (isNaN(parsedPrice)) {
      toast.error("Įvestas kainos formatas neteisingas");
      return;
    }
    const isConfirmed = window.confirm(`Ar tikrai norite parduoti Kortą?`);
    if (!isConfirmed) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/saveSells`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: itemName,
          seller: playerName,
          price: parsedPrice,
        }),
      });

      const response2 = await updateResultData(
        {
          playerName: playerName,
          cardsData: {
            ...cardsData,
            [itemName]: cardsData[itemName] - 1,
          },
        },
        "saveSpinResults"
      );

      if (response.ok && response2.ok) {
        await mutate();
        await mutate2();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const sellReward = async (item) => {
    if (isProcessing2) {
      return;
    }
    setIsProcessing2(true);
    try {
      const response = await fetch(`${API_URL}/api/saveSells/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("reward"),
      });

      const response2 = await updateResultData(
        {
          playerName: playerName,
          spinMoney: spinMoney + item.price,
        },
        "saveSpinResults"
      );

      if (response.ok && response2.ok) {
        await mutate();
        await mutate2();
        toast.info(`Pervesta ${formatLargeNumber(item.price)}€`);
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing2(false);
    }
  };
  const dintSell = async (item) => {
    if (isProcessing3) {
      return;
    }
    setIsProcessing3(true);
    try {
      const response = await fetch(`${API_URL}/api/saveSells/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("reward"),
      });

      const response2 = await updateResultData(
        {
          playerName: playerName,
          cardsData: {
            ...cardsData,
            [item.item]: cardsData[item.item] + 1,
          },
        },
        "saveSpinResults"
      );

      if (response.ok && response2.ok) {
        await mutate();
        await mutate2();
        toast.error("Atsiėmėte korta");
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing3(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold py-2">Parduoti</h1>
        <div className="flex flex-wrap gap-2 justify-center">
          {cards.map((card, index) => {
            if (cardsData[card.name] <= 0) {
              return;
            }
            return (
              <div
                key={index}
                onClick={() =>
                  sellCardHandler(card.name, playerName, cardsData)
                }
                className=" relative hover:scale-110 transition-all duration-500 ease-in-out hover:cursor-pointer"
              >
                <CardElement
                  {...cards[index]}
                  miniSymbolSize="text-xs"
                  symbolSize="text-md"
                  titleSize="text-md"
                  typeSize="text-[8px]"
                  cardSize="w-[56px]"
                />
                <div className="border-[1px] border-y-0 border-x-gray-300 bg-white/90 absolute top-1/2 transform -translate-y-1/2  w-full ">
                {cardsData[card.name]}
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-2xl font-bold py-2">Tavo pardavimai</h1>

        {sells && sells.length > 0 ? (
          <div className="grid  grid-cols-4 justify-between">
            {sells.map((item, index) => {
              const indexIs = cards.findIndex(
                (card) => card.name === item.item
              );

              return (
                <div
                  onClick={
                    item.purchased
                      ? () => sellReward(item)
                      : () => dintSell(item)
                  }
                  className={` ${
                    item.purchased
                      ? "hover:cursor-pointer"
                      : "hover:cursor-grabbing"
                  } flex flex-col justify-center items-center hover:scale-110 transition-all duration-500 ease-in-out`}
                  key={index}
                >
                  {
                    <div className={`relative `}>
                      <CardElement
                        {...cards[indexIs]}
                        miniSymbolSize="text-xs"
                        symbolSize="text-md"
                        titleSize="text-md"
                        typeSize="text-[8px]"
                        cardSize="w-[56px]"
                      />
                      {item.purchased && (
                        <span className=" bg-orange-200/80 absolute top-8 left-0 text-xs text-red-800 font-bold">
                          Parduota.
                        </span>
                      )}
                      <div
                        className={`${
                          item.purchased ? "text-green-500" : "text-red-500"
                        } `}
                      >
                        {formatLargeNumber(item.price)}€
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4 text-lg font-semibold">
            Tu nieko neparduodi
          </div>
        )}

        <Link
          href="/games/spin/market"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Atgal
        </Link>
      </div>
    </>
  );
};
export default Sell;

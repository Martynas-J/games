"use client";
import {
  FromDb,
  formatLargeNumber,
} from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CardElement from "../../components/Cards/CardElement";
import { cards } from "../../config/config";
import { saveResult } from "../../components/functions/saveBays";
import { useState } from "react";

const Bay = () => {
  const session = useSession();
  const { result, isLoading, mutate } = FromDb(`getSells`);
  const {
    result: data,
    isLoading: loading,
    mutate: mutate2,
  } = FromDb(`getSpinResults/${session.data?.user.name}`);

  const [isProcessing, setIsProcessing] = useState(false);

  if (isLoading || loading || session.data === undefined) {
    return <Loading />;
  }

  const bayHandler = async (item) => {
    if (isProcessing) {
      return;
    }
    const isConfirmed = window.confirm(`Ar tikrai norite įsigyti Kortą?`);
    if (isConfirmed) {
      setIsProcessing(true);
      try {
        await saveResult(item, data);
        await mutate();
        await mutate2();
      } catch (error) {
        console.error("Failed to process:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  const isItemToBay = result[0].sellMarket.some(
    (card) => card.purchased === false
  );
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-extrabold text-center text-gray-900">
        Pirkti
      </h1>
      <h1 className="text-3xl font-extrabold text-center text-green-600 ">
        Pinigai: {formatLargeNumber(data?.spinMoney)}€
      </h1>

      {isItemToBay ? (
        <div className="grid  grid-cols-4 justify-between">
          {result[0].sellMarket.map((item, index) => {
            const indexIs = cards.findIndex((card) => card.name === item.item);
            const canBay = data?.spinMoney >= item.price;
            if (item.purchased) {
              return;
            }
            return (
              <div
                onClick={canBay ? () => bayHandler(item) : null}
                className={`flex flex-col justify-center items-center hover:scale-110 transition-all duration-500 ease-in-out ${
                  canBay ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
                } `}
                key={index}
              >
                {
                  <>
                    <CardElement
                      {...cards[indexIs]}
                      miniSymbolSize="text-xs"
                      symbolSize="text-md"
                      titleSize="text-md"
                      typeSize="text-[8px]"
                      cardSize="w-[56px]"
                    />
                    <div
                      className={`${
                        canBay ? "text-green-500" : "text-red-500"
                      } `}
                    >
                      {formatLargeNumber(item.price)}€
                    </div>
                  </>
                }
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4 text-lg font-semibold">
          Turgus tuščias
        </div>
      )}
      <Link
        href="/games/spin/market"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        Atgal
      </Link>
    </div>
  );
};

export default Bay;

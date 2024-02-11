import { useState } from "react";
import { cards } from "../../config/config";
import CardElement from "../Cards/CardElement";

const CardSelect = ({ sendId, randomNr }) => {
  const [isToggled, setToggled] = useState(true);
  const [isToggled2, setToggled2] = useState(false);
  const [cardId, setCardId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCard = () => {
    setTimeout(() => {
      setToggled2(true);
      setToggled(false);
      setCardId(Math.floor(Math.random() * 4)+randomNr);
      setIsOpen(false);
    }, 1000);
    setIsOpen(true);
  };

  const handleClosedCard = () => {
    setTimeout(() => {
      setToggled2(!isToggled2);
      sendId(cardId);
      setIsOpen(false);
    }, 500);
    setIsOpen(true);
  };

  return (
    <>
      {isToggled && (
        <div
          onClick={handleOpenCard}
          className={` myShadow p-2 absolute top-10 left-1/2 transform -translate-x-1/2  inline-block h-auto w-auto hover:cursor-pointer z-10 ${
            isOpen ? "flip-in" : "zoom-in"
          }`}
        >
          <div
            className={`relative w-40 h-60 border border-gray-300 p-1 rounded-xl shadow-md flex justify-center items-center text-[28px] font-bold `}
            style={{
              background:
                "linear-gradient(to top right, #f3f1f1, #1d1c1b, #a8a8a8, #1d1c1b, #dbd8d8)",
            }}
          >
            <span className="font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-200">
              Atverskite kortą
            </span>
          </div>
        </div>
      )}
      {isToggled2 && (
        <div
          onClick={handleClosedCard}
          className={` ${
            isOpen ? "zoom-out":"flip-out"
          }  myShadow p-2 absolute top-10 left-1/2 transform -translate-x-1/2 inline-block h-auto w-auto hover:cursor-pointer z-10 `}
        >
          <CardElement
            {...cards[cardId]}
            miniSymbolSize="text-2xl"
            symbolSize="text-5xl"
            titleSize="text-4xl"
            typeSize="text-[70px]"
            cardSize="w-40 h-60"
          />
        </div>
      )}
    </>
  );
};

export default CardSelect;

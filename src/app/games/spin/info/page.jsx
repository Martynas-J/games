import CardElement from "../components/Cards/CardElement";
import Balls from "../components/balls/Balls";
import { ballsData, cards, intervalColors } from "../config/config";

const Info = () => {
  const time = [1, 2, 3];

  return (
    <>
      <div className="border-b-2 pb-2">
        <div className="flex items-center">
          {time.map((_, index) => (
            <div
              key={index}
              className={`mt-2 myShadowOut  w-10 h-10 rounded-full mx-1`}
            ></div>
          ))}
          <span className="px-2">-</span>
          <span className="text-xs w-36 font-bold">
            {" "}
            Surink 3 vienodus Rutulius ir laimėk pinigų
          </span>
        </div>
        <div className="grid grid-cols-2 justify-between items-start mt-2 gap-y-1">
          {ballsData.map((data, index) => (
            <Balls key={index} {...data} texts={true} />
          ))}

        </div>
      </div>
      <div className="flex flex-wrap gap-y-1 border-b-2 pb-2">
        <div className="text-md my-4 w-full font-bold">
          Surink Card kamuoliukus ir laimėk kortą
        </div>
        <div className="flex items-center ">
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls title="?" texts={true} />
          <span className="text-xs w-36"> Surink 2 pirmus kamuoliukus </span>
        </div>
        <div className="flex items-center ">
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls title="?" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <span className="text-xs w-36"> Surink pirma ir paskutinį </span>
        </div>
        <div className="flex items-center ">
          <Balls title="?" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <span className="text-xs w-36"> Surink 2 paskutinius kamuoliukus </span>
        </div>
        <div className="flex items-center ">
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <Balls color={intervalColors.Card} title="Card" texts={true} />
          <span className="text-xs w-36"> Surink 3 kamuoliukus ir laimėk Tuzą </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-1 border-b-2 pb-2">
        <div className="text-md my-4 w-full font-bold">
          Galima pirkti ir parduoti kortas Turguje arba iškeisti jas į pinigus
        </div>
        <div className="text-md  w-full">
          Surink vienodas
        </div>
        <div className="flex justify-between items-center w-full">
          <CardElement
            {...cards[0]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <div>Už viena korta iš eilės <span className="text-green-700 font-bold">100k</span></div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-1">
          <CardElement
            {...cards[0]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[4]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          </div>
          <div>Už 2 iš eilės <span className="text-green-700 font-bold">1.5m</span></div>
        </div>
        <div className="flex justify-between items-center w-full">
          <CardElement
            {...cards[0]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[4]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[8]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <div>Už 3 iš eilės <span className="text-green-700 font-bold">15m</span></div>
        </div>
        <div className="flex justify-between items-center w-full">
          <CardElement
            {...cards[0]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[4]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[8]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <CardElement
            {...cards[12]}
            miniSymbolSize="text-xs"
            symbolSize="text-md"
            titleSize="text-md"
            typeSize="text-[8px]"
            cardSize="w-[56px]"
          />
          <div>Už visas <span className="text-green-700 font-bold">100m</span></div>
        </div>
      </div>
    </>
  );
};
export default Info;

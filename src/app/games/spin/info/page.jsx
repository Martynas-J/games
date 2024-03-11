import CardElement from "../components/Cards/CardElement";
import Balls from "../components/balls/Balls";
import { ballsData, cards, intervalColors } from "../config/config";

const Info = () => {
  const time = [1, 2, 3];
  const cardItem = (indexArr, text, money) => (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-start gap-1">
        {indexArr.map((indexNr, index) => {
          return (
            <div key={index}>
              <CardElement
                {...cards[indexNr]}
                miniSymbolSize="text-xs"
                symbolSize="text-md"
                titleSize="text-md"
                typeSize="text-[8px]"
                cardSize="w-[56px]"
              />
            </div>
          );
        })}
      </div>
      <div>
        {text}
        <span className="text-green-700 font-bold">{money}&euro;</span>
      </div>
    </div>
  );
  const b1 = <Balls color={intervalColors.Card} title="Card" texts={true} />;
  const b2 = <Balls title="?" texts={true} />;

  const cardBallItem = (balls, text) => (
    <div className="flex items-center ">
      {balls.map((ball, i) => (
        <div key={i}>{ball}</div>
      ))}
      <span className="text-xs w-36"> {text} </span>
    </div>
  );
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
          Dienos uždutys gaunate pinigų įveikę užduotį. Nuo 3 užduoties gaunate
          ir Kortą (<span className="text-red-600">nuo 6 lvl</span>)
        </div>
      </div>
      <div className="flex flex-wrap gap-y-1 border-b-2 pb-2">
        <div className="text-md my-4 w-full font-bold">
          Surink Card kamuoliukus ir laimėk kortą
        </div>
        {cardBallItem([b1, b1, b2], "Surink 2 pirmus kamuoliukus ")}
        {cardBallItem([b1, b2, b1], "Surink pirmą ir paskutinį ")}
        {cardBallItem([b2, b1, b1], "Surink 2 paskutinius kamuoliukus ")}
        {cardBallItem([b1, b1, b1], "Surink 3 kamuoliukus ir laimėk Tūzą ")}
      </div>
      <div className="flex flex-wrap gap-y-1 border-b-2 pb-2 justify-center">
        <div className="text-md my-4 w-full font-bold">
          Galima pirkti ir parduoti kortas Turguje arba iškeisti jas į pinigus
        </div>
        <div className="text-md  w-full">
          Surink vienos rūšies (
          <span className="text-red-600">atsiimti nuo 8 lvl</span>)
        </div>
        {cardItem([0], "Už vieną kortą iš eilės ", "100k")}
        {cardItem([0, 4], "Už 2 iš eilės ", "1.5m")}
        {cardItem([0, 4, 8], "Už 3 iš eilės ", "15m")}
        {cardItem([0, 4, 8, 12], "Už visą ", "100m")}
        <div className=" text-red-700 text-center font-semibold">Surink visą kaladę ir atsiimk 1B</div>
      </div>
    </>
  );
};
export default Info;

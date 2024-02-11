const CardElement = ({ symbol, title, type, color, miniSymbolSize, symbolSize, titleSize, typeSize, cardSize }) => {
  return (
    <div>
      <div className={` relative ${cardSize} bg-teal-50 border border-gray-300 p-1 rounded-xl shadow-md flex justify-between ${color}`}>
        <div className="flex flex-col justify-start items-center w-6">
        <div className={` ${titleSize}`}>{title}</div>
          <div className={` ${miniSymbolSize}`}>{symbol}</div>
        </div>
        <div className="flex flex-col justify-between   w-full  my-1 rounded-xl ">
          <div className="flex justify-start">
          <div className={` ${symbolSize}`}>{symbol}</div>
          </div>
          <div className={` ${color} ${typeSize}`}>{type}</div>
          <div className="flex justify-end">
          <div className={`transform scale-y-[-1] ${symbolSize}`}>{symbol}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col justify-end items-center w-6">
          <div className={` transform scale-y-[-1] ${miniSymbolSize}`}>{symbol}</div>
            <div className={` transform scale-x-[-1] scale-y-[-1] ${titleSize}`}>{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardElement;


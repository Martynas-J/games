const Balls = ({ color, title, text, texts }) => {
  return (
    <div className="flex items-center mt-2">
      <div
        className={`flex justify-center items-center  myShadowOut  w-10 h-10 rounded-full mx-1 ${color}`}
      >
        <span className="text-[10px]">{title} </span>
      </div>
      {texts && <span className=""> {text} </span>}
    </div>
  );
};
export default Balls;

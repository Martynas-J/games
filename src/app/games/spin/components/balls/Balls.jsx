const Balls = ({ color, title, text, texts, size  }) => {
  return (
    <div className="flex items-center mt-2">
      <div
        className={`flex justify-center items-center  myShadowOut  ${size ? size : "w-10 h-10"}   rounded-full mx-1 ${color}`}
      >
        <span className={`${size ? "text-[7px]" : "text-[10px]"} `}>{title} </span>
      </div>
      {texts && <span className=""> {text} </span>}
    </div>
  );
};
export default Balls;

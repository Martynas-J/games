const ClosedCard = ({title, titleColor, bgColor  }) => {
  return (
    <div
      className={` w-36 h-56 border border-gray-300 p-1 rounded-xl shadow-md flex justify-center items-center text-[28px] font-bold myShadow`}
      style={{
        background:
          `linear-gradient(to top right, #f3f1f1, ${bgColor}, #a8a8a8, ${bgColor}, #dbd8d8)`,
      }}
    >
      <span className={`font-serif bg-clip-text text-transparent ${titleColor} `}>
        {title}
      </span>
    </div>
  );
};
export default ClosedCard;

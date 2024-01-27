
import React, { useState, useEffect } from "react";

const CurrentDateTime = ({ date, time }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Atnaujinti kiekvieną sekundę

    // Užbaigti intervalą, kai komponentas yra išmontuojamas
    return () => clearInterval(intervalId);
  }, []); // [] reiškia, kad useEffect vyksta tik komponento pradžioje

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDateTime.toLocaleDateString('lt-LT', options);

  const currentHours = currentDateTime.getHours().toString().padStart(2, '0');
  const currentMinutes = currentDateTime.getMinutes().toString().padStart(2, '0');
  const currentSeconds = currentDateTime.getSeconds().toString().padStart(2, '0');

  return (
    <>
      {date && (
        <p>
          Dabartinė data: {formattedDate}
        </p>
      )}
      {time && (
        <div className="text-[18px] ">
          {" "}
          {currentHours}:{currentMinutes}:{currentSeconds}
        </div>
      )}
    </>
  );
};

export default CurrentDateTime;

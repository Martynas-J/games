import { useEffect } from "react";

const TimeCheckComponent = ({ setIsAllowed }) => {
  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    if (currentHour === 13 && currentMinutes <= 39) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTime();
    }, 60000);

    checkTime();

    return () => {
      clearInterval(interval);
    };
  }, [setIsAllowed]);

  return null; // arba galite grąžinti ką nors, kas nėra vaizduojama
};

export default TimeCheckComponent;



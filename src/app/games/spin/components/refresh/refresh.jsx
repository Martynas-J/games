import { useEffect } from "react";
import { toast } from "react-toastify";

const TimeCheckComponent = ({ setIsAllowed, isAllowed }) => {
  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const isEventHour = [16, 17, 18, 19, 20].includes(currentHour);

    if (isEventHour && currentMinutes < 12) {
      if (!isAllowed) {
        setIsAllowed(true);
        toast.info("Prasideda Eventas -20%")
      }
    } else {
      if (isAllowed) {
        setIsAllowed(false);
        toast.error("Eventas baigtas")
      }
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
  }, [setIsAllowed, isAllowed]);

  return null;
};

export default TimeCheckComponent;

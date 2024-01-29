import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TimeCheckComponent = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            if (currentHour === 12 && currentMinutes <= 50) {
                {toast.info("Eventas -10%")}
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
            }
        };

        const interval = setInterval(() => {
            checkTime();
        }, 60000);

        checkTime();

        return () => {
            clearInterval(interval);
        };
    }, []);

    return isAllowed ? <>{children}</> : null;
};

export default TimeCheckComponent;

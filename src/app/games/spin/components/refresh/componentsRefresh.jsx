// Refresher.jsx
"use client";
import React, { useEffect, useState } from "react";

const Refresher = ({ children, speed }) => {
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setRefresh(prev => prev + 1);

    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]); 

  return <>{React.cloneElement(children, { key: refresh})}</>;
};

export default Refresher;


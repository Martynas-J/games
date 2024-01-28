"use client";
import React, { useState } from "react";
import { FromDb } from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import Results from "@/components/results";

const DbSpinGame = () => {
  const { result, isLoading } = FromDb("getSpinResults");
  const [isTableVisible, setIsTableVisible] = useState(true);

  const handleToggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      onClick={handleToggleTableVisibility}
      className="cursor-pointer hover:placeholder-paslepti text-center"
    >
      {isTableVisible ? (
        <Results data={result} game={"spin"} />
      ) : (
        <div className="p-3 text-5xl">+</div>
      )}
    </div>
  );
};

export default DbSpinGame;

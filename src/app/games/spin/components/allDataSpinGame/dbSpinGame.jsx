"use client";
import React, { useState } from "react";
import { FromDb } from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import Results from "@/components/results";
import { useSession } from "next-auth/react";

const DbSpinGame = () => {
  const session = useSession();
  const name = session.data?.user.name
  const { result, isLoading } = FromDb("getSpinResults");
  const [isTableVisible, setIsTableVisible] = useState(true);

  const handleToggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  if (isLoading) {
    return <Loading />;
  }
  const classtoggle = "text-xl flex justify-end cursor-pointer  hover:text-red-600"

  return (
    <div className=" text-center" >
      {isTableVisible ? (
        <>
          <div onClick={handleToggleTableVisibility} className={`hover:after:content-['_Sumažinti-']  ${classtoggle}`}>-</div>
          <Results data={result} game={"spin"} name={name} limit={10} />
        </>
      ) : (
        <div onClick={handleToggleTableVisibility} className={`hover:after:content-['_Išskleisti+']  ${classtoggle}`}>+</div>
      )}
    </div>
  );
};

export default DbSpinGame;

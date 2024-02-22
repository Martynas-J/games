"use client";
import React, { useState } from "react";
import { FromDb } from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import Results from "@/components/results";
import { useSession } from "next-auth/react";

const Payers = () => {
  const session = useSession();
  const name = session.data?.user.name;
  const { result, isLoading } = FromDb("getSpinResults");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" text-center">
      <Results data={result} game={"spin"} name={name} />
    </div>
  );
};

export default Payers;

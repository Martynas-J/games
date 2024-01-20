"use client";
import { useSession } from "next-auth/react";
import Balls from "../components/balls/Balls";
import { ballsData } from "../config/config";
import Loading from "@/components/Loading/Loading";
import { FromDb, formatLargeNumber } from "@/components/Functions/simpleFunctions";

const Wins = () => {
  const session = useSession();
  const { result, isLoading} = FromDb(`getSpinResults/${session.data?.user.name}`)

  if (isLoading) {
    return <Loading />;
  }

  const allBalls = [
    result?.ballsNormal,
    result?.ballsRare,
    result?.ballsBlue,
    result?.ballsGold,
    result?.ballsPlatina,
    result?.ballsNova,
  ];
  return (
    <div className="flex justify-between items-start ">
      {ballsData.map((data, index) => (
        <div key={index}>
          <Balls {...data} text={false} />
          {formatLargeNumber(allBalls[index] || 0)}
        </div>
      ))}
    </div>
  );
};
export default Wins;

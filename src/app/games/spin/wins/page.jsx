"use client";
import { useSession } from "next-auth/react";
import Balls from "../components/balls/Balls";
import { ballsData } from "../config/config";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import { API_URL } from "@/app/config/config";
import { formatLargeNumber } from "@/components/Functions/simpleFunctions";

const Wins = () => {
  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: result, isLoading } = useSWR(
    `${API_URL}/api/getSpinResults/${session.data?.user.name}`,
    fetcher
  );
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

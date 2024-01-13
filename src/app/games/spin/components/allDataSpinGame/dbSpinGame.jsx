"use client"
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import Results from "@/components/results";
import { API_URL } from "@/app/config/config";

const DbSpinGame = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data: dbResults } = useSWR(`${API_URL}/api/getSpinResults`, fetcher);
    if (!dbResults) {
      return <Loading />;
    }
  return (
      <Results data={dbResults} game={"spin"} />
  )
}
export default DbSpinGame
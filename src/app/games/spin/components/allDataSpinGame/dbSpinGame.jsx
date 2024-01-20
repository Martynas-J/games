"use client"
import { FromDb } from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import Results from "@/components/results";

const DbSpinGame = () => {
    const { result, isLoading} = FromDb("getSpinResults")

    if (!result) {
      return <Loading />;
    }
  return (
      <Results data={result} game={"spin"} />
  )
}
export default DbSpinGame
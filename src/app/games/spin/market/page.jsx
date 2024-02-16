import Link from "next/link";
import CardElement from "../components/Cards/CardElement";
import { cards } from "../config/config";
import ClosedCard from "../components/Cards/closedCard";

const Market = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold py-2">Turgus</h1>
      <div className="flex justify-between">
        <Link
          className="bg-green-500 hover:bg-green-700 font-bold p-1  rounded-lg show-in"
          href="/games/spin/market/bay"
        >
        <ClosedCard title="Pirkti" titleColor="text-white" bgColor="#00310b" />
        </Link>
        <Link
          className="bg-red-500 hover:bg-red-700 font-bold p-1  rounded-lg show-in"
          href="/games/spin/market/sell"
        >
         <ClosedCard title="Parduoti" titleColor="text-white" bgColor="#350000"  />
        </Link>
      </div>
    </div>
  );
};
export default Market;

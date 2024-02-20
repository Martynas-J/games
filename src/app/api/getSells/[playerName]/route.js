import connect from "@/app/utils/db";
import marketModel from "@/models/Market";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req, { params }) => {
  const playerName = params.playerName;
  if (req.method === "GET") {
    try {
      await connect();
      const existingItem = await marketModel.findOne({ name: "Market" });
      if (!existingItem || !existingItem.sellMarket) {
        return new NextResponse("Market not found", { status: 404 });
      }

      const sellMarketItems = existingItem.sellMarket.filter(
        (item) => item.seller === playerName
      );

      return new NextResponse(JSON.stringify(sellMarketItems), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error :(", { status: 500 });
    }
  }
};

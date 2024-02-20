import connect from "@/app/utils/db";
import { NextResponse } from "next/server";
import marketModel from "@/models/Market";

export const PATCH = async (request, { params }) => {
  const data = await request.json();
  const marketId = params.id;
  try {
    await connect();

    const existingItem = await marketModel.findOne({ name: "Market" });

    if (!existingItem || !existingItem.sellMarket) {
      return new NextResponse("Market not found", { status: 404 });
    }

    const sellMarketItem = existingItem.sellMarket.find(
      (item) => item._id.toString() === marketId
    );

    if (!sellMarketItem) {
      return new NextResponse("Market item not found", { status: 404 });
    }

    if (sellMarketItem.purchased) {
      if (sellMarketItem.purchased && data === "reward") {
        const deleteResult = await marketModel.updateOne(
          { "sellMarket._id": marketId },
          { $pull: { sellMarket: { _id: marketId } } }
        );

        if (deleteResult.nModified === 0) {
          return new NextResponse("Item not found", { status: 404 });
        }

        return new NextResponse(`Item has been deleted`, { status: 200 });
      }

      return new NextResponse("Item is already purchased", { status: 400 }); // 400 Bad Request
    }
    if (data === "reward") {
      const deleteResult = await marketModel.updateOne(
        { "sellMarket._id": marketId },
        { $pull: { sellMarket: { _id: marketId } } }
      );

      if (deleteResult.nModified === 0) {
        return new NextResponse("Item not found", { status: 404 });
      }

      return new NextResponse(`Item has been deleted`, { status: 200 });
    }
    const updatedData = await marketModel.findOneAndUpdate(
      { "sellMarket._id": marketId },
      { $set: { "sellMarket.$.purchased": true } },
      { new: true }
    );

    if (!updatedData) {
      return new NextResponse("Market not found", { status: 404 });
    }

    return new NextResponse(`This has been updated`, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error :(", { status: 500 });
  }
};

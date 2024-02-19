import connect from "@/app/utils/db";
import { NextResponse } from "next/server";
import marketModel from "@/models/Market";

export const PATCH = async (request) => {
  const data = await request.json();

  try {
    await connect();
    let updatedData;

    const existingData = await marketModel.findOne({ name: "Market" });
    if (existingData) {
      existingData.sellMarket.push({
        item: data.itemName,
        seller: data.sellerName,
        price: parseInt(data.price), 
      });
  
      existingData.markModified('sellMarket');
      updatedData = existingData;
    } else {
      updatedData = new marketModel({
        name: objName,
        sellMarket: [
          {
            item: data.itemName,
            seller: data.sellerName,
            price: parseInt(data.price), 
          },
        ],
      });
      
    }

    await updatedData.save();

    return new NextResponse(`This has been updated`, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error :(", { status: 500 });
  }
};

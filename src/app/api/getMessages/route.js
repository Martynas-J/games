import connect from "@/app/utils/db";
import chatModel from "@/models/Chat";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const data = await chatModel.find({})
        .select({ "messages": { $slice: -10 } }) 
        .sort({ "messages.createdAt": -1 }); 

      return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
      return new NextResponse("Duomenų bazės klaida :(", { status: 500 });
    }
  }
};

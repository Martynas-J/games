import connect from "@/app/utils/db";
import playerModel from "@/models/Player";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const data = await playerModel.find({});
      // console.log(data)
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error :(", { status: 500 });
    }
  }
};

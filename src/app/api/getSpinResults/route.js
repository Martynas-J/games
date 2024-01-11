import connect from "@/app/utils/db";
import spinPlayerModel from "@/models/SpinPlayer";
import { NextResponse } from "next/server";

export const revalidate = 0

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const data = await spinPlayerModel.find({});
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error :(", { status: 500 });
    }
  }
};

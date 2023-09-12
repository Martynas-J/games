import connect from "@/app/utils/db";
import playerModel from "@/models/Player";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
  await connect();
  const body = await req.json();
    const newItem = new playerModel(body);
    await newItem.save();
    return new NextResponse(`This has been created`, {
      status: 201,
    });
  } catch (err) {
    return new NextResponse("Database Error :(", { status: 500 });
  }
};

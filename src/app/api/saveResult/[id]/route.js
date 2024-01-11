import connect from "@/app/utils/db";
import playerModel from "@/models/Player";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const id = params.id;
  const data = await request.json();
  try {
    await connect();
    const updatedData = await playerModel.findOneAndUpdate(
      { playerName: id },
      data,
      { new: true }
    );
    if (!updatedData) {
      const newItem = new playerModel(data);
      await newItem.save();
    }
    return new NextResponse(`This has been updated`, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error :(", { status: 500 });
  }
};

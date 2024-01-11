import connect from "@/app/utils/db";
import { NextResponse } from "next/server";

export const patchRoute = async (model, request, id) => {
  const data = await request.json();
  try {
    await connect();
    const updatedData = await model
      .findOneAndUpdate({ playerName: id }, data, { new: true })
      .lean();
    if (!updatedData) {
      const newItem = new model(data);
        await newItem.save();
      }
    return new NextResponse(`${model.modelName} has been updated`, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error :(", { status: 500 });
  }
};

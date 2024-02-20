import connect from "@/app/utils/db";
import chatModel from "@/models/Chat";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {

  const data = await request.json();
  try {
    await connect();

    let generalChat = await chatModel.findOne({
      _id: "65b5fd7cc261535759eefcdb",
    });

    if (generalChat) {
      generalChat.messages.push(data);
    } else {
      generalChat = new chatModel({
        messages: [data], 
      });
    }

    await generalChat.save();

    return new NextResponse(`Duomenys sėkmingai įtraukti į duomenų bazę.`, {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Duomenų bazės klaida :(", { status: 500 });
  }
};

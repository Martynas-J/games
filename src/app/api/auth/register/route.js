import connect from "@/app/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect();
  const existingUserByName = await User.findOne({ name });
  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByName) {
    return new NextResponse("Username already exists.", {
      status: 409,
    });
  }

  if (existingUserByEmail) {
    return new NextResponse("Email already exists.", {
      status: 409,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

import fs from "fs";
import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";
import path from "path";

export const GET = async (req) => {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     });
  if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "results.json");

      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        const results = JSON.parse(fileData);
        return new NextResponse(JSON.stringify(results), { status: 200 });
      } else {
        return new NextResponse(JSON.stringify({ message: "Failas nerastas." }), { status: 400 });
      }
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ message: "Įvyko klaida bandant gauti duomenis." }), { status: 500 });
    }
  } else {
    return new NextResponse("", { status: 405 });
  }
};

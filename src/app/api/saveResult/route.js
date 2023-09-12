import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req, res) => {
  console.log("veikia")
  if (req.method === "POST") {
    try {
      const { playerName, playerScore } = await req.json();

      const result = {
        playerName,
        playerScore,
        timestamp: new Date().toISOString(),
      };

      const filePath = path.join(process.cwd(), "results.json");

      let existingResults = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, "utf-8");
        existingResults = JSON.parse(fileData);
      }
      existingResults.push(result);

      fs.writeFileSync(filePath, JSON.stringify(existingResults));
      return new NextResponse(
        { success: true, message: "Rezultatas išsaugotas sėkmingai." },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return new NextResponse(
        {
          success: false,
          message: "Įvyko klaida bandant išsaugoti rezultatą.",
        },
        { status: 500 }
      );
    }
  } else {
    return new NextResponse("", { status: 405 });
  }
};

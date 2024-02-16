"use client";
import { updateResultData } from "@/components/updateResultData";
import { API_URL } from "@/app/config/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const saveResult = async (card, data) => {
  if (card.purchased) {
    toast.info("Korta jau nupirkta");
    return;
  }
  try {
    const response2 = await fetch(`${API_URL}/api/saveSells/${card._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purchased: true }),
    });
    if (!response2.ok) {
      toast.error("Ji jau parduota :(");
      return;
    }
    const response = await updateResultData(
      {
        playerName: data?.playerName,
        spinMoney: data?.spinMoney - card.price,
        cardsData: {
          ...data?.cardsData,
          [card.item]: data?.cardsData[card.item] + 1,
        },
      },
      "saveSpinResults"
    );
    if (response.ok && response2.ok) {
      toast.info("Nupirkote kortą :)");
    } else {
      console.error("Failed to save the result.");
    }
  } catch (error) {
    console.error(error);
  }
};

import { API_URL } from "@/app/config/config";

export const saveResultData = async (playerName, score) => {
  const response = await fetch(`${API_URL}/api/saveResult`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerName,
      playerScore: score,
    }),
  });
  return response;
};

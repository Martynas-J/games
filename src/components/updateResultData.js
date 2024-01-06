import { API_URL } from "@/app/config/config";

export const updateResultData = async (playerName, score, level, help) => {
  const response = await fetch(`${API_URL}/api/saveResult/${playerName}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playerName,
      playerScore: score,
      level,
      help,
    }),
  });
  return response;
};

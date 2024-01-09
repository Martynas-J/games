import { API_URL } from "@/app/config/config";

export const updateResultData = async (resultData, toRoute)  => {
  const { playerName} = resultData;

  const response = await fetch(`${API_URL}/api/${toRoute}/${playerName}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultData),
  });
  return response;
};

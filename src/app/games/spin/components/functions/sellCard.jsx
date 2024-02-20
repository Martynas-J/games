import { useState } from "react";

const SellCard = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  sellCardHandler = async (itemName, playerName, cardsData) => {
    if (isProcessing) {
      return;
    }
    const enteredPrice = prompt("Įveskite kainą:");
    if (!enteredPrice) {
      return;
    }
    const parsedPrice = parseInt(enteredPrice);
    if (isNaN(parsedPrice)) {
      toast.error("Įvestas kainos formatas neteisingas");
      return;
    }
    const isConfirmed = window.confirm(`Ar tikrai norite parduoti Kortą?`);
    if (!isConfirmed) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/api/saveSells`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: itemName,
          seller: playerName,
          price: parsedPrice,
        }),
      });

      const response2 = await updateResultData(
        {
          playerName: playerName,
          cardsData: {
            ...cardsData,
            [itemName]: cardsData[itemName] - 1,
          },
        },
        "saveSpinResults"
      );

      if (response.ok && response2.ok) {
        await mutate();
        await mutate2();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return <div>sellCard</div>;
};
export default SellCard;

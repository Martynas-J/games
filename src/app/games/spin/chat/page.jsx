"use client";
import { FromDb } from "@/components/Functions/simpleFunctions";
import Loading from "@/components/Loading/Loading";
import { updateResultData } from "@/components/updateResultData";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Refresher from "../components/refresh/componentsRefresh";

const Chat = () => {
  const session = useSession();

  const { result, isLoading, mutate } = FromDb(`getMessages`);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (result && result[0] && result[0].messages) {
      setMessages(result[0].messages);
    }
  }, [result, newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setNewMessage("");
      saveResult();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const saveResult = async () => {
    try {
      const response = await updateResultData(
        {
          playerName: session.data.user.name,
          message: newMessage,
        },
        "saveMessages",
        "POST"
      );
      if (response.ok) {
        mutate();
      } else {
        console.error("Failed to save the result.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      id="chatContainer"
      className="bg-gray-100 p-2 text-center max-w-[500px] mx-auto lg:mx-0"
    >
      <div className="flex flex-col gap-1">
          {messages.map((message, index) => (
            <div
              key={index}
              className={` ${index % 2 === 0 ? "bg-gray-200" : ""}`}
            >
              <div className="text-sm text-gray-500 mr-2">
                {new Date(message.createdAt).toLocaleString("lt-LT")}
              </div>
              <div className="text-base">
                <strong className="mr-2 text-black font-bold">
                  {message.playerName}:
                </strong>
                {message.message}
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Įveskite žinutę..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-12 px-4 rounded-2xl border my-3"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Siųsti
        </button>
      </div>
    </div>
  );
};

export default Chat;

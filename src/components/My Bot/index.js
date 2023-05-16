import React, { useState } from "react";
import "./bot.css";

const SkillGptComponent = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const apiKey = "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";
  const modelEndpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const generateResponse = async (message) => {
    try {
      const response = await fetch(modelEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: message,
          max_tokens: 500,
          temperature: 1.0,
          n: 1,
          stop: null,
        }),
      });

      const data = await response.json();
      if (response.ok && data.choices?.length > 0) {
        return data.choices[0].text.trim();
      }
      throw new Error("No valid response from the model");
    } catch (error) {
      console.error("Error accessing the OpenAI API:", error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = userMessage.trim();
    if (trimmedMessage === "") return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: true, message: trimmedMessage },
    ]);
    setUserMessage("");

    try {
      const response = await generateResponse(trimmedMessage);
      if (response !== null) {
        setTimeout(() => {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { user: false, message: response },
          ]);
        }, 500);
      }
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div className="chat-container">
      <h3>SkillSwap помощник пользователя</h3>
      <div className="chat-history">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`${entry.user ? "user-message" : "bot-message"} animated`}
          >
            <div className="message-bubble">{entry.message}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
};

export default SkillGptComponent;

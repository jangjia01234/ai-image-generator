import React from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    try {
      const res = await openai.createImage(
        {
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
          },
        }
      );

      setResult(res.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="app-main">
        <h1>Generate an image using Open AI API</h1>
        <input
          className="app-input"
          placeholder="Type something to generate an image.."
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={generateImage}>Generate an image</button>
        <img src={result} alt="generatedImg" />
      </div>
    </>
  );
};

export default App;

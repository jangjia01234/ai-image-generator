import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import dotenv from "dotenv";
dotenv.config();

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.VITE_OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setResult(res.data.data[0].url);
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

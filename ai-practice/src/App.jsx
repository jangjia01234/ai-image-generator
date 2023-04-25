import React from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2>Generate an Image using Open AI API</h2>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button onClick={generateImage}>Generate an Image</button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;

// import React from "react";
// import { useState } from "react";
// import { Configuration, OpenAIApi } from "openai";
// import "./App.css";

// const App = () => {
//   const [prompt, setPrompt] = useState("");
//   const [result, setResult] = useState("");

//   const configuration = new Configuration({
//     apiKey: import.meta.env.VITE_OPEN_AI_KEY,
//   });

//   const openai = new OpenAIApi(configuration);

//   const generateImage = async () => {
//     try {
//       const res = await openai.createImage(
//         {
//           prompt: prompt,
//           n: 1,
//           size: "1024x1024",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
//           },
//         }
//       );

//       setResult(res.data.data[0].url);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className="app-main">
//         <h1>Generate an image using Open AI API</h1>
//         <input
//           className="app-input"
//           placeholder="Type something to generate an image.."
//           onChange={(e) => {
//             setPrompt(e.target.value);
//           }}
//         />
//         <button onClick={generateImage}>Generate an image</button>
//         <img src={result} alt="generatedImg" />
//       </div>
//     </>
//   );
// };

// export default App;

import { useContext, useEffect, useState } from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";
import PreviewPane from "./components/PreviewPane";
import { themeContext } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useContext(themeContext)

  const getSavedContent = (key, defaultValue) => {
    const savedContent = localStorage.getItem(key);
    return savedContent ? savedContent : defaultValue;
  };

  const [html, setHtml] = useState(() => getSavedContent("html", ""));
  const [css, setCss] = useState(() => getSavedContent("css", ""));
  const [js, setJs] = useState(() => getSavedContent("js", ""));

  useEffect(() => {
    localStorage.setItem("html", html);
    localStorage.setItem("css", css);
    localStorage.setItem("js", js);
  }, [html, css, js]);

  const handleClearScreen = () => {
    localStorage.removeItem("html");
    localStorage.removeItem("css");
    localStorage.removeItem("js");
    setHtml("");
    setCss("");
    setJs("");
  };

  const handleDownloadFile = () => {
    const escapedHtml = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const escapedCss = css.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const escapedJs = js.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Exported Code</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              background: #f4f4f4;
              color: #333;
              padding: 20px;
            }
            h2 {
              margin-top: 40px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            pre {
              background: #272822;
              color: #f8f8f2;
              padding: 15px;
              overflow-x: auto;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <h1>Exported Code</h1>

          <h2>HTML</h2>
          <pre>${escapedHtml}</pre>

          <h2>CSS</h2>
          <pre>${escapedCss}</pre>

          <h2>JavaScript</h2>
          <pre>${escapedJs}</pre>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_code.html";
    link.click();
    link.remove();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 bg-gray-800 dark:bg-gray-700 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Online Code Editor</h1>
        <div className="space-x-4">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
            onClick={toggleTheme}
          >
            {theme === "dark" ? " 🌙 Dark Mode" : " ☀ Light Mode"}
          </button>
          <button
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            onClick={handleClearScreen}
          >
            Clear All
          </button>
          <button
            className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            onClick={handleDownloadFile}
          >
            Export as .html
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="w-1/2 p-2 grid grid-cols-1 gap-2 overflow-auto">
          <CodeEditor language="html" value={html} onChange={setHtml} />
          <CodeEditor language="css" value={css} onChange={setCss} />
          <CodeEditor language="javascript" value={js} onChange={setJs} />
        </div>

        <div className="w-1/2 p-2">
          <PreviewPane html={html} css={css} js={js} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";

const PreviewPane = ({ html, css, js }) => {
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullHtml = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <pre id="console-output" style="background:#000; color:#0f0; padding:10px; margin-top:20px;"></pre>
            <script>
              (function() {
                const originalLog = console.log;
                const outputEl = document.getElementById("console-output");
                console.log = function(...args) {
                  originalLog(...args);
                  args.forEach(arg => {
                    if (typeof arg === 'object') {
                      outputEl.innerText += JSON.stringify(arg, null, 2) + '\\n';
                    } else {
                      outputEl.innerText += arg + '\\n';
                    }
                  });
                };
                try {
                  ${js}
                } catch (e) {
                  console.log('Error:', e.message);
                }
              })();
            <\/script>
          </body>
        </html>
      `;
      setSrcDoc(fullHtml);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="h-full w-full border rounded-lg overflow-hidden shadow">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
        className="bg-white"
      />
    </div>
  );
};

export default PreviewPane;

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

const languageMap = {
  html: html(),
  css: css(),
  javascript: javascript(),
};

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <>
      <div className="border rounded-lg overflow-hidden shadow">
        <div className=" dark:bg-gray-700 px-4 py-1 font-semibold capitalize">{language}</div>
        <CodeMirror
          value={value}
          height="150px"
          extensions={[languageMap[language]]}
          theme="dark"
          onChange={(val) => onChange(val)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
          }}
        />
      </div>
    </>
  );
};

export default CodeEditor;

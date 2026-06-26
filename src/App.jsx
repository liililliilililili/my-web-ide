import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import "./App.css";

function App() {
  const defaultHtml = `<h1>Hello Web IDE</h1>
<p>HTML 코드를 작성하세요.</p>
<button onclick="sayHello()">클릭</button>`;

  const defaultCss = `body {
  font-family: Arial;
  background: #f5f5f5;
  padding: 30px;
}

h1 {
  color: royalblue;
}

button {
  padding: 10px 16px;
  cursor: pointer;
}`;

  const defaultJs = `function sayHello() {
  alert("JavaScript가 실행되었습니다!");
}`;

  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [jsCode, setJsCode] = useState(defaultJs);
  const [activeTab, setActiveTab] = useState("html");
  const [theme, setTheme] = useState("white");

  const makeResultCode = () => {
    return `
      ${htmlCode}
      <style>${cssCode}</style>
      <script>${jsCode}<\/script>
    `;
  };

  const [resultCode, setResultCode] = useState(makeResultCode());

  const runCode = () => {
    setResultCode(makeResultCode());
  };

  const resetCode = () => {
    setHtmlCode(defaultHtml);
    setCssCode(defaultCss);
    setJsCode(defaultJs);
    setResultCode(`
      ${defaultHtml}
      <style>${defaultCss}</style>
      <script>${defaultJs}<\/script>
    `);
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>My Web IDE</h1>

        <div className="button-group">
          <button onClick={runCode}>실행</button>
          <button onClick={resetCode}>초기화</button>
          <button onClick={() => setTheme("white")}>화이트</button>
          <button onClick={() => setTheme("gray")}>그레이</button>
          <button onClick={() => setTheme("dark")}>블랙</button>
        </div>
      </header>

      <main>
        <section className="editor">
          <h2>Code Editor</h2>

          <div className="tabs">
            <button
              className={activeTab === "html" ? "active" : ""}
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
            <button
              className={activeTab === "css" ? "active" : ""}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button
              className={activeTab === "js" ? "active" : ""}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </button>
          </div>

          {activeTab === "html" && (
            <CodeMirror
              value={htmlCode}
              height="500px"
              extensions={[html()]}
              onChange={(value) => setHtmlCode(value)}
            />
          )}

          {activeTab === "css" && (
            <CodeMirror
              value={cssCode}
              height="500px"
              extensions={[css()]}
              onChange={(value) => setCssCode(value)}
            />
          )}

          {activeTab === "js" && (
            <CodeMirror
              value={jsCode}
              height="500px"
              extensions={[javascript()]}
              onChange={(value) => setJsCode(value)}
            />
          )}
        </section>

        <section className="preview">
          <h2>Preview</h2>
          <iframe title="preview" srcDoc={resultCode}></iframe>
        </section>
      </main>
    </div>
  );
}

export default App;

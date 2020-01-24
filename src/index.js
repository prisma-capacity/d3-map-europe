import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";

import "./styles.css";

import EuropeanMap from "./EuropeanMap";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <EuropeanMap setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);

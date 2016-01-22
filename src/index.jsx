import React from "react";
import { render as renderIntoRootDOM } from "react-dom";

import App from "./components/App/App";
import "./theme/style.scss";

(() => {
  const throttle = (type, name) => {
    let running = false;
    const func = () => {
      if (running) { return; }
      running = true;
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    window.addEventListener(type, func);
  };
  throttle("resize", "optimizedResize");
})();

renderIntoRootDOM(<App />, document.getElementById("root"));

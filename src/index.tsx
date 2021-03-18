import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// To enable hot reloading with Parcel
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { App } from "./app";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

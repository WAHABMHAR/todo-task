import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import { notification } from "antd";
import { Provider } from "react-redux";
import store from "./store/store.js";

notification.config({
    placement: "topRight",
    duration: 3,
    top: 60,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import FirebaseProvider from "./Firebase/firebase.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <FirebaseProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose="4000" />
        <App />
      </BrowserRouter>
    </FirebaseProvider>
  </Provider>
);

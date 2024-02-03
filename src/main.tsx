import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import  AuthContextProvider  from "./context/AuthContext";
import {QueryProvider} from "../src/lib/react-query/QueryProvider";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
   
import React from "react";
import { createRoot } from "react-dom/client";


import App from './App';
import CryptoContext from "./CryptoContext";

const el = document.getElementById('root');

const root = createRoot(el);

root.render(
  <CryptoContext>
     <App />
  </CryptoContext>   
   
);
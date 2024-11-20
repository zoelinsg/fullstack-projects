import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // 不需要指定 .jsx，因為它會自動解析
import { ChakraProvider } from "@chakra-ui/react";

// 使用 createRoot 方法來渲染應用
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

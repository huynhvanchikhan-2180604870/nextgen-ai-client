import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Giảm retry attempts
      retryDelay: 1000, // Fixed delay
      staleTime: 10 * 60 * 1000, // 10 minutes - tăng cache time
      cacheTime: 30 * 60 * 1000, // 30 minutes - tăng cache time
      refetchOnWindowFocus: false, // Tắt refetch on focus
      refetchOnReconnect: false, // Tắt refetch on reconnect
      refetchOnMount: false, // Tắt refetch on mount
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Suppress runtime.lastError warnings from browser extensions
window.addEventListener("error", (event) => {
  if (event.message && event.message.includes("runtime.lastError")) {
    event.preventDefault();
    return false;
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

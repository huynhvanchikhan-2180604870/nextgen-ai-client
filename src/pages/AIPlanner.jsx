import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import HologramAI from "../components/3d/HologramAI.jsx";
import { useAuth } from "../hooks/useAuth.js";
import websocketService from "../services/websocketService.js";

const AIPlanner = () => {
  const { isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isAuthenticated) {
      // Connect to WebSocket
      const token = localStorage.getItem("accessToken");
      websocketService.connect(token);

      // Set up event listeners
      websocketService.on("ai_message", (data) => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "ai",
            content: data.message,
            timestamp: data.timestamp,
          },
        ]);
        setIsTyping(false);
      });

      websocketService.on("ai_typing", (data) => {
        setIsTyping(data.isTyping);
      });

      websocketService.on("ai_plan_ready", (data) => {
        setCurrentAnalysis(data.plan);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "analysis",
            content: "Kế hoạch dự án đã sẵn sàng!",
            timestamp: new Date().toISOString(),
          },
        ]);
      });

      return () => {
        websocketService.disconnect();
      };
    }
  }, [isAuthenticated]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Send message via WebSocket
    if (sessionId) {
      websocketService.sendAIMessage(sessionId, currentMessage);
    } else {
      // Create new session
      const newSessionId = `session_${Date.now()}`;
      setSessionId(newSessionId);
      websocketService.joinAISession(newSessionId);
      websocketService.sendAIMessage(newSessionId, currentMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "Tạo kế hoạch cho ứng dụng React",
    "Phân tích độ phức tạp dự án Node.js",
    "Gợi ý kiến trúc cho ứng dụng AI",
    "Lập timeline cho dự án mobile",
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-12 max-w-md mx-auto"
        >
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Cần đăng nhập</h2>
          <p className="text-gray-400 mb-6">
            Bạn cần đăng nhập để sử dụng AI Planner
          </p>
          <a
            href="/auth/login"
            className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold hover:shadow-neon transition-all duration-300"
          >
            Đăng nhập ngay
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tech-universe-bg pt-16">
      {/* Header */}
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display neon-text mb-6">
              🤖 AI Planner Hub
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Phòng AI hologram - Nơi trí tuệ nhân tạo giúp bạn lập kế hoạch dự
              án
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* 3D Hologram Scene */}
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <HologramAI
              messages={messages}
              currentAnalysis={currentAnalysis}
              isTyping={isTyping}
            />
          </Canvas>
        </div>

        {/* Chat Interface */}
        <div className="w-96 glass-card border-l border-white/10 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-semibold">💬 AI Chat</h3>
            <p className="text-gray-400 text-sm">Trò chuyện với AI Planner</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">🤖</div>
                <p>Chào mừng đến với AI Planner!</p>
                <p className="text-sm mt-2">
                  Hãy mô tả dự án của bạn để bắt đầu.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white"
                      : message.type === "ai"
                      ? "glass text-white"
                      : "bg-gradient-to-r from-neon-green to-neon-blue text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 0 && (
            <div className="p-4 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-3">💡 Gợi ý nhanh:</p>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMessage(prompt)}
                    className="w-full text-left px-3 py-2 text-sm glass rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Mô tả dự án của bạn..."
                className="flex-1 px-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Panel */}
      {currentAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-20 glass-card border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                📋 Kế hoạch dự án
              </h3>
              <button
                onClick={() => setCurrentAnalysis(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      🎯 Mục tiêu dự án
                    </h4>
                    <p className="text-gray-300">
                      {currentAnalysis.goals || "Đang phân tích..."}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      🏗️ Kiến trúc đề xuất
                    </h4>
                    <p className="text-gray-300">
                      {currentAnalysis.architecture || "Đang phân tích..."}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      ⏱️ Timeline
                    </h4>
                    <p className="text-gray-300">
                      {currentAnalysis.timeline || "Đang phân tích..."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green mb-2">
                    {currentAnalysis.complexity || "Medium"}
                  </div>
                  <p className="text-gray-400 text-sm">Độ phức tạp</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold hover:shadow-neon transition-all duration-300">
                    📄 Xuất PDF
                  </button>
                  <button className="w-full px-6 py-3 glass text-white rounded-xl font-semibold hover:shadow-neon transition-all duration-300">
                    💾 Lưu kế hoạch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIPlanner;

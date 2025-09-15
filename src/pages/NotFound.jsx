import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen tech-universe-bg flex items-center justify-center px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-neon-green/20 rounded-full blur-2xl animate-float"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <div className="glass-card p-12">
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🚀
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold font-display neon-text mb-6"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Trang không tồn tại
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-gray-400 mb-8 leading-relaxed"
          >
            Có vẻ như bạn đã lạc vào một vùng không gian chưa được khám phá. Hãy
            quay lại hành tinh chính và tiếp tục cuộc hành trình khám phá code!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold text-lg hover:shadow-neon transition-all duration-300 transform hover:scale-105"
            >
              🏠 Về trang chủ
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 glass text-white rounded-xl font-semibold text-lg hover:shadow-neon transition-all duration-300 transform hover:scale-105"
            >
              🪐 Khám phá Galaxy
            </Link>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              💡 Fun Facts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>404 là mã lỗi HTTP có nghĩa là "Not Found"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🌌</span>
                <span>
                  Trong vũ trụ, 404 có thể là tọa độ của một hành tinh xa xôi
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤖</span>
                <span>AI của chúng tôi cũng chưa khám phá được vùng này</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💻</span>
                <span>Có thể đây là một bug trong ma trận code</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

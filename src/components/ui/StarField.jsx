import { motion } from "framer-motion";
import React from "react";

const StarField = () => {
  // Tạo array ngôi sao với vị trí và kích thước ngẫu nhiên
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 8 + 8,
    opacity: Math.random() * 0.6 + 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" />

      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [star.opacity, star.opacity * 1.2, star.opacity],
            rotate: [0, 180],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Large rotating stars */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + i * 8}%`,
            width: `${3 + i}px`,
            height: `${3 + i}px`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default StarField;

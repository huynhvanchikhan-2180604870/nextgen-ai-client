import { motion } from "framer-motion";
import React, { useState } from "react";

const SpaceProjectCard = ({ project, index, isHovered: externalHovered }) => {
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered =
    externalHovered !== undefined ? externalHovered : internalHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        rotateY: 3,
        rotateX: 2,
        transition: { duration: 0.2, type: "spring", stiffness: 150 },
      }}
      onHoverStart={() => setInternalHovered(true)}
      onHoverEnd={() => setInternalHovered(false)}
      className="relative group perspective-1000 w-full h-full cursor-pointer max-w-sm mx-auto md:max-w-none"
    >
      {/* 3D Container */}
      <div className="relative transform-gpu preserve-3d w-full h-full">
        {/* Multiple Glow Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 rounded-3xl blur-2xl scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-3xl blur-xl scale-102 opacity-0 group-hover:opacity-100 transition-all duration-600" />

        {/* Main Liquid Glass Card - Rectangle with beautiful border radius */}
        <div className="relative bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-3xl border border-neon-blue/60 rounded-3xl transform-gpu preserve-3d group-hover:border-neon-blue/100 transition-all duration-800 shadow-2xl shadow-neon-blue/30 w-full h-full overflow-hidden">
          {/* Liquid Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Animated Rainbow Border */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background:
                "linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.3), transparent, rgba(191, 0, 255, 0.3), transparent, rgba(0, 255, 65, 0.3), transparent, rgba(255, 0, 128, 0.3), transparent)",
              backgroundSize: "300% 300%",
              animation: isHovered ? "gradientShift 3s ease infinite" : "none",
              padding: "2px",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 rounded-3xl backdrop-blur-3xl" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Holographic Image Section - Full Card */}
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/40 to-neon-purple/40 rounded-t-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-gray-800/95 to-gray-700/95 backdrop-blur-2xl border border-neon-blue/50 rounded-t-3xl h-full">
                {/* 3D Image Container - Full Width */}
                <div className="relative overflow-hidden rounded-t-3xl h-full">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-800 group-hover:scale-115 group-hover:rotate-2"
                    whileHover={{ rotateY: 12, rotateX: 3 }}
                  />

                  {/* Liquid Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                  {/* Favorite Button - Heart */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-red-500/80 to-pink-500/80 backdrop-blur-xl border border-red-400/60 rounded-full p-2 shadow-lg hover:from-red-500 hover:to-pink-500 transition-all duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>

                  {/* Holographic Badge */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      type: "tween",
                    }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-neon-blue/40 to-neon-purple/40 backdrop-blur-xl border border-neon-blue/60 rounded-2xl px-4 py-2 shadow-lg"
                  >
                    <span className="text-neon-blue text-sm font-bold tracking-wider drop-shadow-lg">
                      HOLOGRAM
                    </span>
                  </motion.div>

                  {/* Enhanced Energy Particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-lg"
                        style={{
                          left: `${10 + i * 8}%`,
                          top: `${20 + (i % 4) * 20}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          y: [0, -20, 0],
                          rotate: [0, 180, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                          type: "tween",
                        }}
                      />
                    ))}
                  </div>

                  {/* Liquid Glass Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1200" />
                </div>
              </div>
            </div>

            {/* Project Info Section */}
            <div className="p-6 space-y-4">
              {/* Title with Enhanced Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/40 to-neon-purple/40 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h3 className="relative text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple group-hover:bg-clip-text transition-all duration-700 drop-shadow-lg">
                  {project.title}
                </h3>
              </div>

              {/* Rating with Liquid Glass Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-xl rounded-2xl border border-neon-blue/30" />
                <div className="relative flex items-center gap-3 p-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-yellow-400 text-xl drop-shadow-lg"
                        animate={
                          isHovered
                            ? {
                                scale: [1, 1.2],
                                rotate: [0, 10],
                                y: [0, -4],
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.3,
                          delay: i * 0.05,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-gray-200 text-xl font-bold">
                    {typeof project.rating === "object"
                      ? project.rating?.average || 4.8
                      : project.rating || 4.8}
                  </span>
                </div>
              </div>

              {/* Price Section - Above Buttons */}
              <div className="mb-4">
                <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {project.price
                        ? `${(project.price * 24000).toLocaleString(
                            "vi-VN"
                          )} VND`
                        : "Liên hệ"}
                    </span>
                    {project.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {(project.originalPrice * 24000).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        VND
                      </span>
                    )}
                    {project.discountPercentage > 0 && (
                      <motion.span
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-xl text-sm font-bold shadow-lg"
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 8px rgba(239, 68, 68, 0.2)",
                            "0 0 15px rgba(239, 68, 68, 0.4)",
                            "0 0 8px rgba(239, 68, 68, 0.2)",
                          ],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          type: "tween",
                          ease: "easeInOut",
                        }}
                      >
                        -{project.discountPercentage}%
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons - View and Buy */}
              <div className="flex items-center gap-3">
                {/* View Button */}
                <motion.button
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex-1 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-bold text-sm shadow-xl shadow-neon-blue/30 hover:shadow-neon-blue/60 transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                      className="text-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⚡
                    </motion.span>
                    <span>View</span>
                  </span>
                </motion.button>

                {/* Buy Button */}
                <motion.button
                  whileHover={{ scale: 1.02, rotateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex-1 px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-white rounded-xl font-bold text-sm shadow-xl shadow-neon-green/30 hover:shadow-neon-green/60 transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                      className="text-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      🛒
                    </motion.span>
                    <span>Mua</span>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceProjectCard;

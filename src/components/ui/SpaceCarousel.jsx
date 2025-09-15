import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SpaceProjectCard from "./SpaceProjectCard.jsx";

const SpaceCarousel = ({ projects, title = "Related Projects Galaxy" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !projects?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects?.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects?.length) return null;

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-3xl blur-2xl" />
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-purple/30 rounded-3xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-neon-purple text-3xl sm:text-4xl"
                >
                  🌌
                </motion.span>
                <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
                  {title}
                </span>
              </h3>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Khám phá các dự án liên quan trong vũ trụ công nghệ
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-neon-blue shadow-lg shadow-neon-blue/50"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-xl border border-neon-blue/30 rounded-xl text-neon-blue hover:border-neon-blue/60 transition-all duration-300"
                >
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-xl border border-neon-blue/30 rounded-xl text-neon-blue hover:border-neon-blue/60 transition-all duration-300"
                >
                  <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="relative h-80 sm:h-96 md:h-[28rem] lg:h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300, rotateY: 45 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -300, rotateY: -45 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="absolute inset-0"
            >
              <SpaceProjectCard
                project={projects[currentIndex]}
                index={currentIndex}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side Preview Cards */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-32 h-24 opacity-60">
          <motion.div
            animate={{ x: [-10, 0, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full h-full bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-xl border border-neon-blue/20 rounded-2xl overflow-hidden"
          >
            <img
              src={
                projects[(currentIndex - 1 + projects.length) % projects.length]
                  ?.thumbnail
              }
              alt="Previous"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-32 h-24 opacity-60">
          <motion.div
            animate={{ x: [10, 0, 10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full h-full bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-xl border border-neon-blue/20 rounded-2xl overflow-hidden"
          >
            <img
              src={projects[(currentIndex + 1) % projects.length]?.thumbnail}
              alt="Next"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCarousel;

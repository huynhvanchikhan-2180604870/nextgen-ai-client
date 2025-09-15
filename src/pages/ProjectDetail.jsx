import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import SuggestedProductsGrid from "../components/ui/SuggestedProductsGrid.jsx";
import { useProject } from "../hooks/useProjects.js";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isPurchased, setIsPurchased] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: projectData, isLoading, error } = useProject(id);
  console.log("🔍 ProjectDetail - projectData:", projectData);
  const project = projectData?.project;

  if (isLoading) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen tech-universe-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Không tìm thấy dự án
          </h2>
          <p className="text-gray-400 mb-6">
            Dự án này có thể đã bị xóa hoặc không tồn tại
          </p>
          <Link
            to="/explore"
            className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold hover:shadow-neon transition-all duration-300"
          >
            🛒 Khám phá dự án khác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen tech-universe-bg pt-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-neon-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-neon-green/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/explore"
              className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-all duration-300 hover:shadow-neon px-4 py-2 rounded-xl border border-neon-blue/30 hover:border-neon-blue/60"
            >
              <span className="text-xl">←</span>
              <span>Quay lại Galaxy</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300 font-semibold">{project.title}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Holographic Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Main Holographic Display */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-blue/30 rounded-3xl p-4 group-hover:border-neon-blue/60 transition-all duration-500">
                <img
                  src={
                    project.images?.[selectedImageIndex] || project.thumbnail
                  }
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-2xl border border-gray-700/50 group-hover:border-neon-blue/50 transition-all duration-300"
                />
                <div className="absolute inset-4 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Holographic Overlay */}
                <div className="absolute top-4 right-4 bg-neon-blue/20 backdrop-blur-sm border border-neon-blue/40 rounded-xl px-3 py-1">
                  <span className="text-neon-blue text-sm font-semibold">
                    HOLOGRAM
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {(project.images || [project.thumbnail]).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative group cursor-pointer ${
                    selectedImageIndex === index ? "ring-2 ring-neon-blue" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="relative w-full h-20 object-cover rounded-xl border border-gray-700/50 group-hover:border-neon-blue/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Space Command Center */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Project Title with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-blue/30 rounded-2xl p-6">
                <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="drop-shadow-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-white font-semibold text-lg">
                      {typeof project.rating === "object"
                        ? project.rating?.average || 4.8
                        : project.rating || 4.8}
                    </span>
                    <span className="text-gray-400">
                      (
                      {Array.isArray(project.reviews)
                        ? project.reviews.length
                        : 0}{" "}
                      đánh giá)
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Energy Core (Price Section) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-green/30 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-white">
                        ${project.price}
                      </span>
                      {project.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ${project.originalPrice}
                        </span>
                      )}
                      {project.discountPercentage > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-xl text-sm font-semibold shadow-lg">
                          -{project.discountPercentage}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      ⚡ Energy Core - Không bao gồm thuế vũ trụ
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPurchased(!isPurchased)}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isPurchased
                        ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-500/25"
                        : "bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon text-white shadow-lg shadow-neon-blue/25"
                    }`}
                  >
                    {isPurchased
                      ? "✓ Đã kích hoạt"
                      : "⚡ Kích hoạt Energy Core"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 border border-neon-purple/50 text-neon-purple rounded-xl font-semibold hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                  >
                    ❤️ Thêm vào Favorites
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Project Data Panel */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-purple/30 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-neon-purple">📡</span>
                  Project Data Panel
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">👨‍💻 Tác giả:</span>
                    <span className="text-white font-semibold">
                      {project.author?.fullName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">🚀 Loại:</span>
                    <span className="text-white font-semibold">
                      {project.productType}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">📜 Giấy phép:</span>
                    <span className="text-white font-semibold">
                      {project.license?.type || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">💾 Kích thước:</span>
                    <span className="text-white font-semibold">
                      {project.size || "2.5 MB"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">🔄 Cập nhật:</span>
                    <span className="text-white font-semibold">
                      {new Date(project.updatedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Holographic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex space-x-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl p-2 rounded-2xl border border-neon-blue/30 mb-8">
            {[
              { id: "overview", label: "📊 Tổng quan", icon: "📊" },
              { id: "features", label: "⚡ Tính năng", icon: "⚡" },
              { id: "tech", label: "🔧 Công nghệ", icon: "🔧" },
              { id: "reviews", label: "⭐ Đánh giá", icon: "⭐" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/25"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Holographic Tab Content */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-neon-blue/30 rounded-3xl p-8">
              {activeTab === "overview" && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-neon-blue">📊</span>
                    Mô tả chi tiết
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-neon-green">⚡</span>
                    Tính năng chính
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features?.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tech" && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-neon-purple">🔧</span>
                    Công nghệ sử dụng
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack?.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-xl font-semibold shadow-lg shadow-neon-blue/25"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-yellow-400">⭐</span>
                    Đánh giá từ người dùng
                  </h3>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">⭐</div>
                    <p className="text-gray-400 text-lg">
                      Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Related Projects Galaxy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <SuggestedProductsGrid
            projects={project.relatedProjects || []}
            title="Suggested Products"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

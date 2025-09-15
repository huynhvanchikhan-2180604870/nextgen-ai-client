import { motion } from "framer-motion";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    website: user?.website || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save profile
    console.log("Save profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      website: user?.website || "",
      github: user?.github || "",
      linkedin: user?.linkedin || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen tech-universe-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display neon-text mb-6">
            👤 My Profile
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="tech-card p-6 sticky top-8">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-4xl">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dự án đã mua</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Dự án yêu thích</span>
                  <span className="text-white font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Thành viên từ</span>
                  <span className="text-white font-semibold">Jan 2024</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <h4 className="text-white font-semibold mb-3">
                  Liên kết xã hội
                </h4>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="text-lg">🐙</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="text-lg">💼</span>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <span className="text-lg">🌐</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              {[
                { id: "profile", name: "Thông tin", icon: "👤" },
                { id: "security", name: "Bảo mật", icon: "🔒" },
                { id: "notifications", name: "Thông báo", icon: "🔔" },
                { id: "preferences", name: "Tùy chọn", icon: "⚙️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg"
                      : "glass text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === "profile" && (
                <div className="tech-card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Thông tin cá nhân
                    </h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
                      >
                        ✏️ Chỉnh sửa
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-gradient-to-r from-neon-green to-neon-blue text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
                        >
                          💾 Lưu
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 glass text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
                        >
                          ❌ Hủy
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="tech-label">Họ và tên</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="tech-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="tech-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="tech-input"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="tech-label">Giới thiệu</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="tech-input h-24 resize-none"
                        placeholder="Giới thiệu về bản thân..."
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="tech-label">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="tech-input"
                        placeholder="https://yourwebsite.com"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="tech-label">GitHub</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="tech-input"
                        placeholder="https://github.com/username"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="tech-label">LinkedIn</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="tech-input"
                        placeholder="https://linkedin.com/in/username"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="tech-card p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Bảo mật tài khoản
                  </h3>

                  <div className="space-y-6">
                    <div className="p-4 glass rounded-lg">
                      <h4 className="text-white font-semibold mb-2">
                        Đổi mật khẩu
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Cập nhật mật khẩu để bảo vệ tài khoản của bạn
                      </p>
                      <button className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300">
                        🔐 Đổi mật khẩu
                      </button>
                    </div>

                    <div className="p-4 glass rounded-lg">
                      <h4 className="text-white font-semibold mb-2">
                        Xác thực 2 yếu tố
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Thêm lớp bảo mật bổ sung cho tài khoản
                      </p>
                      <button className="px-4 py-2 glass text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300">
                        🔒 Bật 2FA
                      </button>
                    </div>

                    <div className="p-4 glass rounded-lg">
                      <h4 className="text-white font-semibold mb-2">
                        Phiên đăng nhập
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Quản lý các thiết bị đã đăng nhập
                      </p>
                      <button className="px-4 py-2 glass text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300">
                        📱 Xem phiên
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="tech-card p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Cài đặt thông báo
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        title: "Email thông báo",
                        description: "Nhận thông báo qua email",
                      },
                      {
                        title: "Thông báo dự án mới",
                        description: "Thông báo khi có dự án mới phù hợp",
                      },
                      {
                        title: "Thông báo thanh toán",
                        description: "Thông báo về trạng thái thanh toán",
                      },
                      {
                        title: "Thông báo AI Planner",
                        description: "Thông báo khi AI Planner hoàn thành",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 glass rounded-lg"
                      >
                        <div>
                          <h4 className="text-white font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="tech-card p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Tùy chọn
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="tech-label">Ngôn ngữ</label>
                      <select className="tech-input">
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="tech-label">Múi giờ</label>
                      <select className="tech-input">
                        <option value="Asia/Ho_Chi_Minh">
                          Asia/Ho_Chi_Minh (GMT+7)
                        </option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="tech-label">Chủ đề</label>
                      <select className="tech-input">
                        <option value="dark">Dark Mode</option>
                        <option value="light">Light Mode</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 glass rounded-lg">
                      <div>
                        <h4 className="text-white font-semibold">
                          Hiệu ứng 3D
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Bật/tắt hiệu ứng 3D và animation
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neon-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Script để xóa dữ liệu auth cũ
// Chạy trong browser console hoặc thêm vào trang

console.log("🧹 Đang xóa dữ liệu auth cũ...");

// Xóa localStorage
localStorage.removeItem("auth-storage");
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");

// Xóa sessionStorage
sessionStorage.removeItem("auth-storage");
sessionStorage.removeItem("accessToken");
sessionStorage.removeItem("refreshToken");

// Xóa tất cả keys liên quan đến auth
Object.keys(localStorage).forEach((key) => {
  if (key.includes("auth") || key.includes("token") || key.includes("user")) {
    localStorage.removeItem(key);
    console.log(`✅ Đã xóa: ${key}`);
  }
});

Object.keys(sessionStorage).forEach((key) => {
  if (key.includes("auth") || key.includes("token") || key.includes("user")) {
    sessionStorage.removeItem(key);
    console.log(`✅ Đã xóa: ${key}`);
  }
});

console.log("🎉 Hoàn thành! Vui lòng refresh trang và thử đăng nhập lại.");

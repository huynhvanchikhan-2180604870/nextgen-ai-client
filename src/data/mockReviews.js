export const mockReviews = [
  {
    _id: "review-1",
    projectId: "mock-1",
    userId: "user-1",
    userName: "Nguyễn Văn A",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Dự án rất tuyệt vời! Code sạch, documentation đầy đủ và dễ hiểu. Tôi đã học được rất nhiều từ project này.",
    createdAt: "2024-01-20T10:30:00Z",
    helpful: 12,
    verified: true
  },
  {
    _id: "review-2",
    projectId: "mock-1",
    userId: "user-2",
    userName: "Trần Thị B",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    review: "Chatbot hoạt động tốt, nhưng cần cải thiện thêm về xử lý ngôn ngữ tiếng Việt. Overall là một project chất lượng.",
    createdAt: "2024-01-18T14:20:00Z",
    helpful: 8,
    verified: true
  },
  {
    _id: "review-3",
    projectId: "mock-2",
    userId: "user-3",
    userName: "Lê Văn C",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Dashboard rất professional và dễ sử dụng. Tôi đã deploy thành công và đang sử dụng cho shop online của mình.",
    createdAt: "2024-01-15T09:15:00Z",
    helpful: 15,
    verified: true
  },
  {
    _id: "review-4",
    projectId: "mock-3",
    userId: "user-4",
    userName: "Phạm Thị D",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    review: "Template mobile app rất tốt, có đầy đủ các tính năng cần thiết. Chỉ cần customize một chút là có thể sử dụng ngay.",
    createdAt: "2024-01-12T16:45:00Z",
    helpful: 6,
    verified: true
  },
  {
    _id: "review-5",
    projectId: "mock-4",
    userId: "user-5",
    userName: "Hoàng Văn E",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    review: "Blockchain wallet rất an toàn và dễ sử dụng. Tích hợp tốt với các sàn giao dịch lớn. Highly recommended!",
    createdAt: "2024-01-10T11:30:00Z",
    helpful: 20,
    verified: true
  },
  {
    _id: "review-6",
    projectId: "mock-5",
    userId: "user-6",
    userName: "Vũ Thị F",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    review: "Công cụ analytics rất hữu ích cho việc theo dõi social media. Báo cáo chi tiết và dễ hiểu.",
    createdAt: "2024-01-08T13:20:00Z",
    helpful: 9,
    verified: true
  },
  {
    _id: "review-7",
    projectId: "mock-6",
    userId: "user-7",
    userName: "Đặng Văn G",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    review: "IoT dashboard hoạt động ổn định, real-time monitoring rất tốt. Phù hợp cho các dự án IoT quy mô vừa và nhỏ.",
    createdAt: "2024-01-05T08:00:00Z",
    helpful: 7,
    verified: true
  }
];

// Helper functions for reviews
export const getReviewsByProjectId = (projectId) => {
  return mockReviews.filter(review => review.projectId === projectId);
};

export const getAverageRating = (projectId) => {
  const projectReviews = getReviewsByProjectId(projectId);
  if (projectReviews.length === 0) return 0;
  
  const totalRating = projectReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / projectReviews.length) * 10) / 10;
};

export const getReviewCount = (projectId) => {
  return getReviewsByProjectId(projectId).length;
};

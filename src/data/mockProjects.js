export const mockProjects = [
  {
    _id: "mock-1",
    title: "AI Chatbot Platform",
    description: "Nền tảng chatbot AI thông minh với khả năng xử lý ngôn ngữ tự nhiên và tích hợp đa kênh. Hỗ trợ 50+ ngôn ngữ và có thể tùy chỉnh theo nhu cầu doanh nghiệp.",
    shortDescription: "Chatbot AI thông minh với xử lý ngôn ngữ tự nhiên",
    price: 299,
    originalPrice: 499,
    category: "AI & Machine Learning",
    techStack: ["React", "Node.js", "OpenAI", "MongoDB", "Socket.io"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1682686581362-796145f0e123?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-ai-chatbot.com",
    githubUrl: "https://github.com/example/ai-chatbot",
    features: [
      "Xử lý ngôn ngữ tự nhiên",
      "Tích hợp đa kênh",
      "Hỗ trợ 50+ ngôn ngữ",
      "Tùy chỉnh theo nhu cầu",
      "Analytics và báo cáo"
    ],
    requirements: [
      "Node.js 18+",
      "MongoDB 6+",
      "Redis 7+",
      "OpenAI API key"
    ],
    rating: 4.8,
    reviewCount: 156,
    downloads: 2340,
    author: {
      _id: "author-1",
      name: "Tech Solutions Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["AI", "Chatbot", "NLP", "Business", "Automation"],
    status: "published",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    isFeatured: true,
    isTrending: true
  },
  {
    _id: "mock-2",
    title: "E-commerce Dashboard",
    description: "Dashboard quản lý thương mại điện tử toàn diện với analytics, quản lý đơn hàng, khách hàng và báo cáo doanh thu. Giao diện hiện đại và responsive.",
    shortDescription: "Dashboard quản lý thương mại điện tử toàn diện",
    price: 199,
    originalPrice: 349,
    category: "Web Development",
    techStack: ["Vue.js", "Express", "PostgreSQL", "Chart.js", "Tailwind CSS"],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-ecommerce-dashboard.com",
    githubUrl: "https://github.com/example/ecommerce-dashboard",
    features: [
      "Analytics và báo cáo",
      "Quản lý đơn hàng",
      "Quản lý khách hàng",
      "Dashboard responsive",
      "Export dữ liệu"
    ],
    requirements: [
      "Node.js 16+",
      "PostgreSQL 14+",
      "Redis 6+",
      "NPM 8+"
    ],
    rating: 4.6,
    reviewCount: 89,
    downloads: 1876,
    author: {
      _id: "author-2",
      name: "WebDev Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["E-commerce", "Dashboard", "Analytics", "Business", "Management"],
    status: "published",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
    isFeatured: true,
    isTrending: false
  },
  {
    _id: "mock-3",
    title: "Mobile App Template",
    description: "Template ứng dụng di động đa nền tảng với React Native. Bao gồm authentication, navigation, state management và UI components hiện đại.",
    shortDescription: "Template ứng dụng di động đa nền tảng",
    price: 149,
    originalPrice: 249,
    category: "Mobile Development",
    techStack: ["React Native", "Redux", "Firebase", "Expo", "TypeScript"],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-mobile-app.com",
    githubUrl: "https://github.com/example/mobile-app-template",
    features: [
      "Đa nền tảng iOS/Android",
      "Authentication system",
      "Navigation stack",
      "State management",
      "UI components library"
    ],
    requirements: [
      "React Native 0.72+",
      "Expo SDK 49+",
      "Node.js 18+",
      "Xcode 14+ (iOS)"
    ],
    rating: 4.7,
    reviewCount: 124,
    downloads: 2156,
    author: {
      _id: "author-3",
      name: "Mobile Dev Studio",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["Mobile", "React Native", "Cross-platform", "Template", "UI/UX"],
    status: "published",
    createdAt: "2024-01-08T14:20:00Z",
    updatedAt: "2024-01-16T11:30:00Z",
    isFeatured: false,
    isTrending: true
  },
  {
    _id: "mock-4",
    title: "Blockchain Wallet",
    description: "Ví tiền điện tử blockchain với hỗ trợ đa coin, giao dịch an toàn và giao diện người dùng thân thiện. Tích hợp với các sàn giao dịch lớn.",
    shortDescription: "Ví tiền điện tử blockchain đa coin",
    price: 399,
    originalPrice: 599,
    category: "Blockchain",
    techStack: ["Web3.js", "Ethereum", "Solidity", "React", "MetaMask"],
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1642790103337-347b4b5b8b8b?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-blockchain-wallet.com",
    githubUrl: "https://github.com/example/blockchain-wallet",
    features: [
      "Hỗ trợ đa coin",
      "Giao dịch an toàn",
      "Tích hợp sàn giao dịch",
      "Backup và restore",
      "Security audit"
    ],
    requirements: [
      "Node.js 18+",
      "Web3.js 4+",
      "MetaMask",
      "Ethereum network"
    ],
    rating: 4.9,
    reviewCount: 67,
    downloads: 892,
    author: {
      _id: "author-4",
      name: "Crypto Solutions",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["Blockchain", "Crypto", "Wallet", "Web3", "Security"],
    status: "published",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-12T13:15:00Z",
    isFeatured: true,
    isTrending: false
  },
  {
    _id: "mock-5",
    title: "Social Media Analytics",
    description: "Công cụ phân tích mạng xã hội với khả năng theo dõi engagement, sentiment analysis và báo cáo chi tiết. Hỗ trợ Facebook, Instagram, Twitter.",
    shortDescription: "Công cụ phân tích mạng xã hội",
    price: 249,
    originalPrice: 399,
    category: "Analytics",
    techStack: ["Python", "Django", "PostgreSQL", "Redis", "Celery"],
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-social-analytics.com",
    githubUrl: "https://github.com/example/social-analytics",
    features: [
      "Theo dõi engagement",
      "Sentiment analysis",
      "Báo cáo chi tiết",
      "Hỗ trợ đa platform",
      "Real-time monitoring"
    ],
    requirements: [
      "Python 3.9+",
      "Django 4.2+",
      "PostgreSQL 14+",
      "Redis 7+"
    ],
    rating: 4.5,
    reviewCount: 98,
    downloads: 1456,
    author: {
      _id: "author-5",
      name: "Data Analytics Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["Analytics", "Social Media", "Data", "Python", "Business"],
    status: "published",
    createdAt: "2024-01-03T11:30:00Z",
    updatedAt: "2024-01-14T09:45:00Z",
    isFeatured: false,
    isTrending: true
  },
  {
    _id: "mock-6",
    title: "IoT Dashboard",
    description: "Dashboard quản lý thiết bị IoT với real-time monitoring, alerts và data visualization. Hỗ trợ MQTT, WebSocket và REST API.",
    shortDescription: "Dashboard quản lý thiết bị IoT",
    price: 179,
    originalPrice: 299,
    category: "IoT",
    techStack: ["Angular", "Node.js", "MQTT", "WebSocket", "D3.js"],
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ],
    demoUrl: "https://demo-iot-dashboard.com",
    githubUrl: "https://github.com/example/iot-dashboard",
    features: [
      "Real-time monitoring",
      "Alerts và notifications",
      "Data visualization",
      "MQTT support",
      "Device management"
    ],
    requirements: [
      "Node.js 18+",
      "Angular 16+",
      "MQTT broker",
      "WebSocket support"
    ],
    rating: 4.4,
    reviewCount: 76,
    downloads: 1234,
    author: {
      _id: "author-6",
      name: "IoT Solutions",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    tags: ["IoT", "Dashboard", "Real-time", "Monitoring", "Hardware"],
    status: "published",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-10T15:30:00Z",
    isFeatured: false,
    isTrending: false
  }
];

export const mockCategories = [
  "AI & Machine Learning",
  "Web Development", 
  "Mobile Development",
  "Blockchain",
  "Analytics",
  "IoT",
  "DevOps",
  "Game Development",
  "UI/UX Design",
  "Data Science"
];

export const mockTechStacks = [
  "React", "Vue.js", "Angular", "Node.js", "Express", "Python", "Django",
  "MongoDB", "PostgreSQL", "Redis", "Firebase", "AWS", "Docker",
  "TypeScript", "JavaScript", "Java", "C#", "Go", "Rust",
  "React Native", "Flutter", "Swift", "Kotlin", "Web3.js", "Solidity"
];

// Helper functions for mock data
export const getTrendingProjects = () => {
  return mockProjects.filter(project => project.isTrending);
};

export const getFeaturedProjects = () => {
  return mockProjects.filter(project => project.isFeatured);
};

export const getProjectsByCategory = (category) => {
  return mockProjects.filter(project => project.category === category);
};

export const getProjectsByTechStack = (techStack) => {
  return mockProjects.filter(project => project.techStack.includes(techStack));
};

export const searchProjects = (query) => {
  const searchTerm = query.toLowerCase();
  return mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    project.techStack.some(tech => tech.toLowerCase().includes(searchTerm))
  );
};

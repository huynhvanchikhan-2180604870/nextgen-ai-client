import { API_CONFIG, API_ENDPOINTS } from "../config/api.js";
import { api } from "./apiClient.js";
import { 
  mockProjects, 
  mockCategories, 
  mockTechStacks,
  getTrendingProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectsByTechStack,
  searchProjects
} from "../data/mockProjects.js";
import { 
  mockReviews, 
  getReviewsByProjectId, 
  getAverageRating, 
  getReviewCount 
} from "../data/mockReviews.js";

// Project Service
export const projectService = {
  // Get all projects with filters
  async getProjects(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add filter parameters
      if (params.search) queryParams.append("search", params.search);
      if (params.category) queryParams.append("category", params.category);
      if (params.techStack) queryParams.append("techStack", params.techStack);
      if (params.productType)
        queryParams.append("productType", params.productType);
      if (params.license) queryParams.append("license", params.license);
      if (params.minPrice !== undefined)
        queryParams.append("minPrice", params.minPrice);
      if (params.maxPrice !== undefined)
        queryParams.append("maxPrice", params.maxPrice);
      if (params.minRating !== undefined)
        queryParams.append("minRating", params.minRating);
      if (params.sortBy) queryParams.append("sortBy", params.sortBy);
      if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      const url = `${API_ENDPOINTS.PROJECTS.LIST}?${queryParams.toString()}`;
      console.log("Fetching projects from:", API_CONFIG.BASE_URL + url);
      const response = await api.get(url);
      console.log("Projects response:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch projects:", error.message);
      console.log("🔄 Using mock data for projects");
      
      // Apply filters to mock data
      let filteredProjects = [...mockProjects];
      
      // Search filter
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Category filter
      if (params.category) {
        filteredProjects = filteredProjects.filter(project => 
          project.category === params.category
        );
      }
      
      // Tech stack filter
      if (params.techStack) {
        filteredProjects = filteredProjects.filter(project => 
          project.techStack.includes(params.techStack)
        );
      }
      
      // Price filters
      if (params.minPrice !== undefined) {
        filteredProjects = filteredProjects.filter(project => 
          project.price >= params.minPrice
        );
      }
      if (params.maxPrice !== undefined) {
        filteredProjects = filteredProjects.filter(project => 
          project.price <= params.maxPrice
        );
      }
      
      // Rating filter
      if (params.minRating !== undefined) {
        filteredProjects = filteredProjects.filter(project => 
          project.rating >= params.minRating
        );
      }
      
      // Sort
      if (params.sortBy) {
        filteredProjects.sort((a, b) => {
          switch (params.sortBy) {
            case 'price':
              return params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            case 'rating':
              return params.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            case 'downloads':
              return params.sortOrder === 'asc' ? a.downloads - b.downloads : b.downloads - a.downloads;
            case 'createdAt':
              return params.sortOrder === 'asc' ? 
                new Date(a.createdAt) - new Date(b.createdAt) : 
                new Date(b.createdAt) - new Date(a.createdAt);
            default:
              return 0;
          }
        });
      }
      
      return {
        success: true,
        data: filteredProjects,
        message: "Projects loaded from mock data"
      };
    }
  },

  // Get project by ID
  async getProjectById(id) {
    try {
      const url = API_ENDPOINTS.PROJECTS.DETAIL.replace(":id", id);
      const response = await api.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch project by ID:", error.message);
      console.log("🔄 Using mock data for project:", id);
      
      // Find project in mock data
      const project = mockProjects.find(p => p._id === id);
      if (project) {
        return {
          success: true,
          data: project,
          message: "Project loaded from mock data"
        };
      } else {
        throw new Error("Dự án không tồn tại");
      }
    }
  },

  // Get featured projects
  async getFeaturedProjects() {
    try {
      console.log(
        "Fetching featured projects from:",
        API_CONFIG.BASE_URL + API_ENDPOINTS.PROJECTS.FEATURED
      );
      const response = await api.get(API_ENDPOINTS.PROJECTS.FEATURED);
      console.log("Featured projects response:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch featured projects:", error.message);
      console.log("🔄 Using mock data for featured projects");
      
      // Return mock featured projects
      const featuredProjects = getFeaturedProjects();
      return {
        success: true,
        data: featuredProjects,
        message: "Featured projects loaded from mock data"
      };
    }
  },

  // Get trending projects
  async getTrendingProjects() {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.TRENDING || '/projects/trending');
      return response;
    } catch (error) {
      console.error("Failed to fetch trending projects:", error.message);
      console.log("🔄 Using mock data for trending projects");
      
      // Return mock trending projects
      const trendingProjects = getTrendingProjects();
      return {
        success: true,
        data: trendingProjects,
        message: "Trending projects loaded from mock data"
      };
    }
  },

  // Get project categories
  async getCategories() {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.CATEGORIES);
      return response;
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
      console.log("🔄 Using mock data for categories");
      
      return {
        success: true,
        data: mockCategories,
        message: "Categories loaded from mock data"
      };
    }
  },

  // Search projects
  async searchProjects(query, filters = {}) {
    try {
      const searchParams = {
        q: query,
        ...filters,
      };

      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value);
        }
      });

      const url = `${API_ENDPOINTS.PROJECTS.SEARCH}?${queryParams.toString()}`;
      const response = await api.get(url);
      return response;
    } catch (error) {
      console.error("Failed to search projects:", error.message);
      console.log("🔄 Using mock data for search:", query);
      
      // Search in mock data
      let results = [...mockProjects];
      
      if (query) {
        const searchTerm = query.toLowerCase();
        results = results.filter(project => 
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          project.techStack.some(tech => tech.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply additional filters
      if (filters.category) {
        results = results.filter(project => project.category === filters.category);
      }
      if (filters.techStack) {
        results = results.filter(project => project.techStack.includes(filters.techStack));
      }
      if (filters.minPrice !== undefined) {
        results = results.filter(project => project.price >= filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        results = results.filter(project => project.price <= filters.maxPrice);
      }
      if (filters.minRating !== undefined) {
        results = results.filter(project => project.rating >= filters.minRating);
      }
      
      return {
        success: true,
        data: results,
        message: "Search results loaded from mock data"
      };
    }
  },

  // Create new project (for authors)
  async createProject(projectData) {
    try {
      const response = await api.post(
        API_ENDPOINTS.PROJECTS.CREATE,
        projectData
      );
      return response;
    } catch (error) {
      throw new Error(error.message || "Tạo dự án thất bại");
    }
  },

  // Update project (for authors)
  async updateProject(id, projectData) {
    try {
      const url = API_ENDPOINTS.PROJECTS.UPDATE.replace(":id", id);
      const response = await api.put(url, projectData);
      return response;
    } catch (error) {
      throw new Error(error.message || "Cập nhật dự án thất bại");
    }
  },

  // Delete project (for authors)
  async deleteProject(id) {
    try {
      const url = API_ENDPOINTS.PROJECTS.DELETE.replace(":id", id);
      const response = await api.delete(url);
      return response;
    } catch (error) {
      throw new Error(error.message || "Xóa dự án thất bại");
    }
  },

  // Purchase project
  async purchaseProject(projectId, paymentMethod) {
    try {
      const response = await api.post(`/projects/${projectId}/purchase`, {
        paymentMethod,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Mua dự án thất bại");
    }
  },

  // Add project to favorites
  async addToFavorites(projectId) {
    try {
      const response = await api.post(`/projects/${projectId}/favorite`);
      return response;
    } catch (error) {
      throw new Error(error.message || "Thêm vào yêu thích thất bại");
    }
  },

  // Remove project from favorites
  async removeFromFavorites(projectId) {
    try {
      const response = await api.delete(`/projects/${projectId}/favorite`);
      return response;
    } catch (error) {
      throw new Error(error.message || "Xóa khỏi yêu thích thất bại");
    }
  },

  // Rate project
  async rateProject(projectId, rating, review) {
    try {
      const response = await api.post(`/projects/${projectId}/rate`, {
        rating,
        review,
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Đánh giá dự án thất bại");
    }
  },

  // Get project reviews
  async getProjectReviews(projectId, page = 1, limit = 10) {
    try {
      const response = await api.get(
        `/projects/${projectId}/reviews?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch project reviews:", error.message);
      console.log("🔄 Using mock data for project reviews:", projectId);
      
      // Get mock reviews for the project
      const allReviews = getReviewsByProjectId(projectId);
      
      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedReviews = allReviews.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          reviews: paginatedReviews,
          pagination: {
            page,
            limit,
            total: allReviews.length,
            totalPages: Math.ceil(allReviews.length / limit)
          }
        },
        message: "Project reviews loaded from mock data"
      };
    }
  },

  // Download project (for purchased projects)
  async downloadProject(projectId) {
    try {
      const response = await api.get(`/projects/${projectId}/download`, {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      throw new Error(error.message || "Tải xuống dự án thất bại");
    }
  },
};

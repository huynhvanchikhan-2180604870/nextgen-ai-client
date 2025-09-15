import { API_CONFIG, API_ENDPOINTS } from "../config/api.js";
import { api } from "./apiClient.js";

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
      throw new Error(error.message || "Lấy danh sách dự án thất bại");
    }
  },

  // Get project by ID
  async getProjectById(id) {
    try {
      const url = API_ENDPOINTS.PROJECTS.DETAIL.replace(":id", id);
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw new Error(error.message || "Lấy thông tin dự án thất bại");
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
      throw error; // Re-throw error instead of returning mock data
    }
  },

  // Get project categories
  async getCategories() {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.CATEGORIES);
      return response;
    } catch (error) {
      throw new Error(error.message || "Lấy danh mục dự án thất bại");
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
      throw new Error(error.message || "Tìm kiếm dự án thất bại");
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
      throw new Error(error.message || "Lấy đánh giá dự án thất bại");
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

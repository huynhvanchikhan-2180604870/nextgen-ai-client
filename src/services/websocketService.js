import { io } from "socket.io-client";
import { API_CONFIG } from "../config/api.js";

// WebSocket Service for AI Planner real-time chat
class WebSocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  // Connect to WebSocket server
  connect(token = null) {
    if (this.socket && this.isConnected) {
      console.log("WebSocket already connected");
      return;
    }

    try {
      const options = {
        transports: ["websocket", "polling"],
        timeout: 10000,
        forceNew: true,
      };

      // Add auth token if provided
      if (token) {
        options.auth = {
          token: token,
        };
      }

      this.socket = io(API_CONFIG.WS_URL, options);

      this.setupEventListeners();

      console.log("🔌 Connecting to WebSocket server...");
    } catch (error) {
      console.error("WebSocket connection error:", error);
      this.handleConnectionError(error);
    }
  }

  // Setup event listeners
  setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", () => {
      console.log("✅ WebSocket connected");
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit("connection", { status: "connected" });
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ WebSocket disconnected:", reason);
      this.isConnected = false;
      this.emit("connection", { status: "disconnected", reason });

      // Attempt to reconnect if not manually disconnected
      if (reason !== "io client disconnect") {
        this.attemptReconnect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      this.handleConnectionError(error);
    });

    // AI Planner events
    this.socket.on("ai_message", (data) => {
      console.log("🤖 AI Message received:", data);
      this.emit("ai_message", data);
    });

    this.socket.on("ai_typing", (data) => {
      console.log("🤖 AI Typing:", data);
      this.emit("ai_typing", data);
    });

    this.socket.on("ai_plan_ready", (data) => {
      console.log("📋 AI Plan ready:", data);
      this.emit("ai_plan_ready", data);
    });

    this.socket.on("session_updated", (data) => {
      console.log("🔄 Session updated:", data);
      this.emit("session_updated", data);
    });

    // Notification events
    this.socket.on("notification", (data) => {
      console.log("🔔 Notification received:", data);
      this.emit("notification", data);
    });

    // Error events
    this.socket.on("error", (error) => {
      console.error("WebSocket error:", error);
      this.emit("error", error);
    });
  }

  // Attempt to reconnect
  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      this.emit("connection", { status: "failed" });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`
    );

    setTimeout(() => {
      if (!this.isConnected) {
        this.connect();
      }
    }, delay);
  }

  // Handle connection error
  handleConnectionError(error) {
    this.isConnected = false;
    this.emit("connection", { status: "error", error });
  }

  // Join AI session
  joinAISession(sessionId) {
    if (!this.socket || !this.isConnected) {
      console.error("WebSocket not connected");
      return false;
    }

    this.socket.emit("join_ai_session", { sessionId });
    console.log(`🔗 Joined AI session: ${sessionId}`);
    return true;
  }

  // Leave AI session
  leaveAISession(sessionId) {
    if (!this.socket || !this.isConnected) {
      return false;
    }

    this.socket.emit("leave_ai_session", { sessionId });
    console.log(`🔌 Left AI session: ${sessionId}`);
    return true;
  }

  // Send chat message to AI
  sendAIMessage(sessionId, message) {
    if (!this.socket || !this.isConnected) {
      console.error("WebSocket not connected");
      return false;
    }

    this.socket.emit("ai_chat_message", {
      sessionId,
      message,
      timestamp: new Date().toISOString(),
    });

    console.log(`💬 Sent AI message: ${message}`);
    return true;
  }

  // Request AI plan generation
  requestAIPlan(sessionId, projectDetails) {
    if (!this.socket || !this.isConnected) {
      console.error("WebSocket not connected");
      return false;
    }

    this.socket.emit("request_ai_plan", {
      sessionId,
      projectDetails,
      timestamp: new Date().toISOString(),
    });

    console.log(`📋 Requested AI plan for session: ${sessionId}`);
    return true;
  }

  // Subscribe to notifications
  subscribeToNotifications() {
    if (!this.socket || !this.isConnected) {
      return false;
    }

    this.socket.emit("subscribe_notifications");
    console.log("🔔 Subscribed to notifications");
    return true;
  }

  // Unsubscribe from notifications
  unsubscribeFromNotifications() {
    if (!this.socket || !this.isConnected) {
      return false;
    }

    this.socket.emit("unsubscribe_notifications");
    console.log("🔕 Unsubscribed from notifications");
    return true;
  }

  // Add event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (!this.listeners.has(event)) return;

    const callbacks = this.listeners.get(event);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  // Emit event to listeners
  emit(event, data) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  // Get connection status
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      socketId: this.socket?.id || null,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
      console.log("🔌 WebSocket disconnected");
    }
  }

  // Reconnect with new token
  reconnectWithToken(token) {
    this.disconnect();
    setTimeout(() => {
      this.connect(token);
    }, 1000);
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService;

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen tech-universe-bg flex items-center justify-center">
          <div className="text-center glass-card p-8 max-w-md">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Đã xảy ra lỗi
            </h2>
            <p className="text-gray-300 mb-6">
              Ứng dụng gặp sự cố không mong muốn. Vui lòng tải lại trang.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-blue text-black font-bold rounded-lg hover:bg-neon-blue/80 transition-colors"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

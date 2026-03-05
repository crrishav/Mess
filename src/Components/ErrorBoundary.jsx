import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Animation/Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Something went wrong</h2>
            <p className="text-white/60 mb-8">
              We encountered an unexpected error while rendering the animations. 
              Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-black font-bold uppercase tracking-tighter hover:bg-[#FCE7CC] transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

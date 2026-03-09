// 14 — Error Boundaries | Examples
import React, { useState, useCallback } from "react";

// ErrorBoundary class
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error.message);
    console.error("Component stack:", info.componentStack);
    // Sentry.captureException(error);
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback;
      return Fallback
        ? <Fallback error={this.state.error} reset={this.handleReset} />
        : (
          <div style={{ padding: 16, background: "#fef2f2", borderRadius: 8 }}>
            <h3>Xatolik yuz berdi</h3>
            <p style={{ color: "#ef4444" }}>{this.state.error?.message}</p>
            <button onClick={this.handleReset}>Qayta urinish</button>
          </div>
        );
    }
    return this.props.children;
  }
}

// withErrorBoundary HOC
function withErrorBoundary(Component, FallbackComponent) {
  const WrappedComponent = (props) => (
    <ErrorBoundary fallback={FallbackComponent}>
      <Component {...props} />
    </ErrorBoundary>
  );
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// useErrorHandler — async xatolarni boundary'ga uzatish
function useErrorHandler() {
  const [, setState] = useState();
  return useCallback((error) => {
    setState(() => { throw error; }); // React'ga throw qiladi → boundary tutadi
  }, []);
}

// Test component (xato chiqaradi)
function BuggyComponent({ shouldError }) {
  if (shouldError) throw new Error("Test xatolik!");
  return <div>Hammasi yaxshi ✅</div>;
}

// Usage demo
function Demo() {
  const [hasError, setHasError] = useState(false);
  return (
    <ErrorBoundary>
      <button onClick={() => setHasError(v => !v)}>Toggle Error</button>
      <BuggyComponent shouldError={hasError} />
    </ErrorBoundary>
  );
}

export { ErrorBoundary, withErrorBoundary, useErrorHandler };

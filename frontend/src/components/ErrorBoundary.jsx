import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#300', color: '#fdd', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '30px', color: '#f66' }}>React Crash Detected</h1>
          <p style={{ fontSize: '20px', marginTop: '20px' }}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ marginTop: '20px', padding: '20px', background: '#100', overflow: 'auto' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <p style={{ marginTop: '40px' }}>Please copy this EXACT text and send it to the AI.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

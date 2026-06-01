import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", color: "#f87171", background: "#080c14", minHeight: "100vh", fontFamily: "monospace", textAlign: "left" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>⚠️ Error de Renderizado en React</h2>
          <p style={{ color: "#a1a1aa", marginBottom: "20px" }}>Detalle del error técnico:</p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#0d121f", padding: "20px", borderRadius: "12px", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171", overflowX: "auto" }}>
            {this.state.error?.toString()}
            {"\n\nStack Trace:\n"}
            {this.state.error?.stack}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            style={{ marginTop: "20px", padding: "12px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
          >
            Limpiar LocalStorage y Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ErrorBoundary>
  </StrictMode>,
)

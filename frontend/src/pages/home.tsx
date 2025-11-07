import { useState, useEffect, useCallback } from "react";
import "../App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

interface HealthStatus {
  status: string;
  message: string;
  timestamp: string;
  error?: string;
}

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkBackendHealth = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setHealthStatus({
        status: data.status,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      setHealthStatus({
        status: "ERROR",
        message: "Failed to connect to backend",
        timestamp: new Date().toISOString(),
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
    const id = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(id);
  }, [checkBackendHealth]);

  return (
    <main className="app-home">
      <div className="health-check">
        <h2>System Status</h2>
        {loading ? (
          <div className="status-loading">Checking backend connection...</div>
        ) : (
          <div className={`status-card ${healthStatus?.status?.toLowerCase()}`}>
            <div className="status-indicator">
              <span
                className={`status-dot ${healthStatus?.status?.toLowerCase()}`}
              />
              <strong>{healthStatus?.status || "UNKNOWN"}</strong>
            </div>
            <p>{healthStatus?.message}</p>
            {healthStatus?.timestamp && (
              <small>Last checked: {new Date(healthStatus.timestamp).toLocaleString()}</small>
            )}
            {healthStatus?.error && (
              <div className="error-details">
                <strong>Error:</strong> {healthStatus.error}
              </div>
            )}
          </div>
        )}

        <button onClick={checkBackendHealth} className="refresh-btn">
          🔄 Refresh Status
        </button>
      </div>

      <div className="getting-started">
        <h2>Getting Started</h2>
        <p>This is your starting template for the NECX Messaging App.</p>
        <ul>
          <li>✅ Frontend React app is running</li>
          <li>{healthStatus?.status === "OK" ? "✅" : "❌"} Backend Express server connection</li>
          <li>🚀 Ready to start building your messaging features!</li>
        </ul>
      </div>
    </main>
  );
}

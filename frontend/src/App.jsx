import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import SplashScreen from "./components/common/SplashScreen";

// Protected Route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth();
  
  // If still loading session from localStorage, render the splash screen loader
  if (isInitializing) {
    return <SplashScreen />;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Redirect Route for root /
function RootRedirect() {
  const { isAuthenticated, isInitializing } = useAuth();
  
  if (isInitializing) {
    return <SplashScreen />;
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          {["/dashboard", "/courses", "/backlogs", "/advisor", "/analytics", "/settings"].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          ))}
          
          {/* Dedicated Results Route */}
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          
          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Fallback Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Toast notifications handler */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1E293B",
            color: "#F8FAFC",
            border: "1px border-white/10",
            borderRadius: "16px",
          },
          success: {
            iconTheme: {
              primary: "#22C55E",
              secondary: "#1E293B",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#1E293B",
            },
          },
        }}
      />
    </AuthProvider>
  );
}
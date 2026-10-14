import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./Features/auth/hooks/useAuth.js";

import Welcome from "./Features/auth/pages/Welcome.jsx";
import Login from "./Features/auth/pages/Login.jsx";
import Register from "./Features/auth/pages/Register.jsx";
import ExpressionPage from "./Features/expression/pages/ExpressionPage.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/expression"
        element={
          <ProtectedRoute>
            <ExpressionPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

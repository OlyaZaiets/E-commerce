import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const { isLoggedInUser } = useAuth();

  if(!isLoggedInUser) {
    return <Navigate to="/login" replace />
  }

  return children;

}
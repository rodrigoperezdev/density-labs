import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  return !logged ? children : <Navigate to="/" />;
};

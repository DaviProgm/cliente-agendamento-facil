import { Navigate } from "react-router-dom";

function isTokenValid(token: string | null) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000; // tempo atual em segundos
    return payload.exp > now;
  } catch {
    return false;
  }
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

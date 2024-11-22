import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/onAuthStatus";
import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    // Optionally display a loading spinner
    return <Spinner loading />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;

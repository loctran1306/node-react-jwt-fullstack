import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { component } = props;

  const { user } = useContext(UserContext);

  return user && user.isAuthenticated ? component : <Navigate to="/login" />;
};
export default PrivateRoutes;

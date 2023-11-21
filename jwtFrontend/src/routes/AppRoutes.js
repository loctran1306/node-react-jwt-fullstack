import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} default />
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/project"
          element={<PrivateRoutes component={<div>Project</div>} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<PrivateRoutes component={<Users />} />} />
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};
export default AppRoutes;

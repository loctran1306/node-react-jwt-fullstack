import "./App.scss";

import "font-awesome/css/font-awesome.min.css";
import { useContext } from "react";
import { Triangle } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import NavHeader from "./components/Navigation/NavHeader";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.isLoading ? (
        <div className="loading-container">
          <Triangle
            height="80"
            width="80"
            color="#1877f2"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {" "}
          <div className="app-header">
            <NavHeader />
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

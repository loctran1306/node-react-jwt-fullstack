import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  // Context
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  //
  const defaultObjvalidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjvalidInput);

  //handle Login
  const handleOnclickLogin = async () => {
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjvalidInput, isValidValueLogin: false });
      toast.error("Please Enter your email address or phone number");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjvalidInput, isValidPassword: false });
      toast.error("Please Enter your password");
      return;
    }
    const response = await loginUser(valueLogin, password);
    const serverData = response.data;

    if (response && +serverData.EC === 0) {
      let { groupWithRoles, email, username, access_token } = serverData.DT;
      let data = {
        isAuthenticated: true,
        token: access_token,
        account: { groupWithRoles, email, username },
      };

      // sessionStorage.setItem("account", JSON.stringify(data));
      localStorage.setItem("jwt", access_token);
      loginContext(data);

      navigate("/user");
      toast.success(serverData.EM);
    } else {
      if (+serverData.EF === 1) {
        setObjValidInput({ isValidValueLogin: false, isValidPassword: false });
      }
      toast.error(serverData.EM);
    }
  };

  //press Enter
  const handlePressEnter = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      handleOnclickLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="row">
          <div className="content-left col-sm-7 col-12 ">
            <div className="brand d-flex justify-content-center justify-content-sm-start ">
              Manager
            </div>
            <div className="detail d-none d-sm-block">
              Manager user and developer
            </div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column  gap-3 py-3 mt-sm-4">
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email adress or phone number"
              value={valueLogin}
              onChange={(e) => {
                setValueLogin(e.target.value);
                setObjValidInput({
                  ...defaultObjvalidInput,
                  isValidValueLogin: true,
                });
              }}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setObjValidInput({
                  ...defaultObjvalidInput,
                  isValidValueLogin: true,
                });
              }}
              onKeyUp={(e) => handlePressEnter(e)}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleOnclickLogin()}
            >
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="/login">
                Forgot password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => navigate("/register")}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

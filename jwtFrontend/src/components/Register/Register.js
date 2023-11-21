import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//services
import { registerNewUser } from "../../services/userService";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(true);
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput);

  //Validate
  const checkTypeEmail = (value) => {
    var regx = /\S+@\S+\.\S+/;
    return regx.test(value);
  };
  const isValidInput = () => {
    setObjectCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Email is required!");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!checkTypeEmail(email)) {
      toast.error("Please enter a valid email address");
      setObjectCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required!");
      setObjectCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!password) {
      setObjectCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required!");
      return false;
    }
    if (password !== confirmPassword) {
      setObjectCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };
  //Register
  const handleClickRegister = async () => {
    const check = isValidInput();
    if (check) {
      const response = await registerNewUser(email, phone, username, password);
      const serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        if (+serverData.EF === 1) {
          setValidEmail(false);
        }
        if (+serverData.EF === 2) {
          setValidPhone(false);
        }

        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div className="register-container">
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
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidEmail
                    ? email.length > 0
                      ? validEmail
                        ? "form-control is-valid"
                        : "form-control is-invalid"
                      : "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email adress"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidEmail(() => checkTypeEmail(e.target.value));
                }}
              />
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className={
                  objectCheckInput.isValidPhone
                    ? phone.length > 0
                      ? validPhone
                        ? "form-control"
                        : "form-control is-invalid"
                      : "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setValidPhone(true);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className={
                  objectCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              onClick={() => handleClickRegister()}
              className="btn btn-primary"
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => navigate("/login")}
              >
                Already've an account. Login!!!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

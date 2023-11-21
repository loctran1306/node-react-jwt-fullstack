import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext({ name: "", auth: true });
const UserProvider = ({ children }) => {
  const defaultDataUser = {
    isLoading: true,
    isAuthenticated: false,
    token: "fake token",
    account: {},
  };
  const [user, setUser] = useState(defaultDataUser);

  // Login updates the user data with a name parameter
  const loginContext = (dataUser) => {
    setUser({ ...dataUser, isLoading: false });
  };

  const fecthUser = async () => {
    let response = await getUserAccount();
    const data = response && response.data;
    if (data && +data.EC === 0) {
      let { groupWithRoles, email, username, access_token } = data.DT;
      let temp = {
        isAuthenticated: true,
        token: access_token,
        account: { groupWithRoles, email, username },
        isLoading: false,
      };
      setUser(temp);
    } else {
      setUser({ ...defaultDataUser, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fecthUser();
    } else {
      setUser((user) => ({ ...user, isLoading: false }));
    }
  }, []);

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...defaultDataUser, isLoading: false });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };

import axiosInstance from "../components/axios/axios";

const registerNewUser = (email, phone, username, password) => {
  return axiosInstance.post("api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axiosInstance.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const getAllUser = (currentPage, currentLimit) => {
  return axiosInstance.get(
    `/api/v1/user/show?page=${currentPage}&limit=${currentLimit}`
  );
};
const getUserAccount = () => {
  return axiosInstance.get(`/api/v1/account`);
};
const getAllGroup = () => {
  return axiosInstance.get(`/api/v1/group/show`);
};
const deleteUser = (idUser) => {
  return axiosInstance.delete(`/api/v1/user/delete`, {
    data: { id: idUser },
  });
};

const createNewUser = (dataUser) => {
  return axiosInstance.post("/api/v1/user/create", {
    ...dataUser,
  });
};
const updateUser = (idUser, dataUser) => {
  return axiosInstance.put("/api/v1/user/update", {
    id: idUser,
    body: dataUser,
  });
};

const logoutUser = () => {
  return axiosInstance.post("/api/v1/logout");
};

export {
  registerNewUser,
  loginUser,
  getAllUser,
  deleteUser,
  getAllGroup,
  createNewUser,
  updateUser,
  getUserAccount,
  logoutUser,
};

import expess from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTActions";
const router = expess.Router();

// const checkUserLogin = (req, res, next) => {
//   const nonSecurePaths = ["/register", "/login"];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user
//   if (user) {
//     next();
//   } else {
//   }
//   next();
// };

const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  router.get("/account", userController.getUserAccount);

  router.get("/user/show", userController.showUser);
  router.post("/user/create", userController.createUser);
  router.put("/user/update", userController.updateUser);
  router.delete("/user/delete", userController.deleteUser);

  router.get("/group/show", groupController.showGroup);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;

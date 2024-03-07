import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import User from "../controllers/user/userController.js"
import Auth from "../middlewares/userAuthMiddleware.js"
const router = express.Router()


router.route("/register").post(FormData.uploadSettingImages,User.userRegister)
router.route("/login").post(FormData.uploadSettingImages,User.userLogin)
router.route("/programs").get(Auth.authenticateUserAPIToken,User.userProgram)


export default router
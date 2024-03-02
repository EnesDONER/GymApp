import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import User from "../controllers/user/userController.js"

const router = express.Router()


router.route("/register").post(FormData.uploadSettingImages,User.userRegister)
router.route("/login").post(FormData.uploadSettingImages,User.userLogin)


export default router
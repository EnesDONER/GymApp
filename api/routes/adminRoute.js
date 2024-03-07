import express  from "express"
import AdminController from "../controllers/user/adminController.js"
import FormData from "../middlewares/blogPhotoMiddleware.js"
const router = express.Router()

router.route("/login").post(FormData.uploadSettingImages,AdminController.loginAdmin)
router.route("/register").post(FormData.uploadSettingImages,AdminController.registerAdmin)

router.route("/user-list").get(AdminController.getUserList)

router.route("/statusChange/:id").get(AdminController.userUpdateStatus)

export default router

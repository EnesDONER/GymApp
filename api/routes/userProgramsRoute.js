import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import UserPrograms from "../controllers/userProgramsController.js"

const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,UserPrograms.create)
router.route("/").get(UserPrograms.getList)
router.route("/:id").put(FormData.uploadSettingImages,UserPrograms.update)
router.route("/:id").delete(UserPrograms.remove)


export default router
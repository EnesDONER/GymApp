import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import Programs from "../controllers/programsController.js"

const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,Programs.programsCreate)
router.route("/").get(Programs.programsGetList)
router.route("/get/:id").get(Programs.programsGetById)
router.route("/:id").put(FormData.uploadSettingImages,Programs.programsUpdate)
router.route("/:id").delete(Programs.programsDelete)


export default router